"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { formatPrice } from "@/lib/format";
import { shippingCents } from "@/lib/shipping";
import { useCartStore } from "@/store/cart";
import { useCartCount, useCartItems, useCartSubtotal } from "@/store/use-cart";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const setOpen = useCartStore((state) => state.setOpen);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartItems();
  const count = useCartCount();
  const subtotal = useCartSubtotal();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  const shipping = shippingCents(subtotal);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-neutral-950/50 backdrop-blur-[2px]"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-neutral-950">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
          <h2 className="text-lg font-bold uppercase tracking-tight">
            Your bag{" "}
            <span className="text-neutral-400">({count})</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-label="Close cart"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              Your bag is empty.
            </p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-neutral-200 overflow-y-auto px-6 dark:divide-neutral-800">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${item.slug}`}
                        className="truncate text-sm font-semibold hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="whitespace-nowrap text-sm font-bold">
                        {formatPrice(item.priceCents * item.quantity)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Size {item.size ?? "—"} · {formatPrice(item.priceCents)}{" "}
                      each
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-neutral-300 dark:border-neutral-700">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.key, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          −
                        </button>
                        <span
                          data-testid="cart-item-qty"
                          className="w-6 text-center text-sm font-semibold tabular-nums"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.key, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-neutral-200 px-6 py-5 dark:border-neutral-800">
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-bold dark:border-neutral-800">
                <span>Total</span>
                <span data-testid="cart-total">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-neutral-900"
              >
                Checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
