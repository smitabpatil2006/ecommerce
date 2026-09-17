"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { placeOrder } from "@/app/checkout/actions";
import { formatPrice } from "@/lib/format";
import { shippingCents } from "@/lib/shipping";
import { useCartStore } from "@/store/cart";
import { useCartItems, useCartSubtotal } from "@/store/use-cart";

const fieldClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-white";

function PaymentOption({
  active,
  title,
  description,
  icon,
  onSelect,
}: {
  active: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
        active
          ? "border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-900"
          : "border-neutral-200 hover:border-neutral-400 dark:border-neutral-800"
      }`}
    >
      {icon}
      <span className="flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
      </span>
      <span
        className={`h-4 w-4 rounded-full border-4 ${
          active
            ? "border-neutral-900 bg-white dark:border-white dark:bg-neutral-900"
            : "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950"
        }`}
      />
    </button>
  );
}

export function CheckoutForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const clear = useCartStore((state) => state.clear);

  const [fullName, setFullName] = useState(defaultName);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const shipping = shippingCents(subtotal);
  const total = subtotal + shipping;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await placeOrder({
        fullName,
        address,
        city,
        postalCode,
        phone,
        paymentMethod,
        upiId,
        items: items.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
      });

      if (result.ok) {
        clear();
        router.push(`/orders?placed=${result.orderId}`);
      } else {
        setError(result.error);
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-neutral-200 p-10 text-center dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-300">
          Your bag is empty, so there is nothing to check out.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-tight">
            Shipping details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2 block text-sm font-medium">
              Full name
              <input
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Alex Morgan"
                className={`mt-1.5 ${fieldClass}`}
              />
            </label>
            <label className="sm:col-span-2 block text-sm font-medium">
              Address
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="12 MG Road, Apt 4B"
                className={`mt-1.5 ${fieldClass}`}
              />
            </label>
            <label className="block text-sm font-medium">
              City
              <input
                required
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Pune"
                className={`mt-1.5 ${fieldClass}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Postal code
              <input
                required
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="411001"
                className={`mt-1.5 ${fieldClass}`}
              />
            </label>
            <label className="sm:col-span-2 block text-sm font-medium">
              Phone number
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+91 98765 43210"
                className={`mt-1.5 ${fieldClass}`}
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-tight">Payment</h2>
          <div className="mt-5 space-y-3">
            <PaymentOption
              active={paymentMethod === "upi"}
              onSelect={() => setPaymentMethod("upi")}
              title="UPI"
              description="Pay instantly with any UPI app"
              icon={
                <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-green-600 text-xs font-black text-white">
                  UPI
                </span>
              }
            />
            {paymentMethod === "upi" && (
              <label className="block pl-1 text-sm font-medium">
                UPI ID
                <input
                  value={upiId}
                  onChange={(event) => setUpiId(event.target.value)}
                  placeholder="yourname@bank"
                  className={`mt-1.5 ${fieldClass}`}
                />
              </label>
            )}
            <PaymentOption
              active={paymentMethod === "cod"}
              onSelect={() => setPaymentMethod("cod")}
              title="Cash on Delivery"
              description="Pay the courier when your order arrives"
              icon={
                <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-neutral-900 text-lg text-white dark:bg-white dark:text-neutral-900">
                  ₹
                </span>
              }
            />
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-lg font-bold uppercase tracking-tight">
          Order summary
        </h2>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.key} className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {item.name}
                </span>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                  Size {item.size ?? "—"} · Qty {item.quantity}
                </span>
              </span>
              <span className="text-sm font-semibold">
                {formatPrice(item.priceCents * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm dark:border-neutral-800">
          <div className="flex justify-between">
            <dt className="text-neutral-500 dark:text-neutral-400">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500 dark:text-neutral-400">Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold dark:border-neutral-800">
            <dt>Total</dt>
            <dd data-testid="checkout-total">{formatPrice(total)}</dd>
          </div>
        </dl>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 dark:bg-white dark:text-neutral-900"
        >
          {pending
            ? "Placing order…"
            : paymentMethod === "upi"
              ? `Pay ${formatPrice(total)} with UPI`
              : `Place COD order · ${formatPrice(total)}`}
        </button>
      </aside>
    </form>
  );
}
