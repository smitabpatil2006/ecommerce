import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { desc, eq, inArray } from "drizzle-orm";

import { OrderTracker } from "@/components/order-tracker";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { auth } from "@/lib/auth";
import { formatDate, formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders | Nike Store",
};

export default async function OrdersPage({ searchParams }: PageProps<"/orders">) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?next=/orders");

  const { placed } = await searchParams;

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt));

  const items = userOrders.length
    ? await db
        .select()
        .from(orderItems)
        .where(
          inArray(
            orderItems.orderId,
            userOrders.map((order) => order.id),
          ),
        )
    : [];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight">
        Your orders
      </h1>

      {typeof placed === "string" && (
        <p
          role="status"
          className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
        >
          Order placed — we&apos;ll start packing it right away.
        </p>
      )}

      {userOrders.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-neutral-200 p-10 text-center dark:border-neutral-800">
          <p className="text-neutral-600 dark:text-neutral-300">
            No orders yet.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {userOrders.map((order) => {
            const lines = items.filter((item) => item.orderId === order.id);
            return (
              <li
                key={order.id}
                data-testid="order-card"
                className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Order #{order.id.slice(0, 8)} ·{" "}
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      {order.fullName}, {order.address}, {order.city}{" "}
                      {order.postalCode} · {order.phone}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      Paid via{" "}
                      {order.paymentMethod === "upi"
                        ? `UPI (${order.upiId})`
                        : "Cash on Delivery"}
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    {formatPrice(order.totalCents)}
                  </p>
                </div>

                <OrderTracker
                  stage={order.stage}
                  createdAt={order.createdAt}
                  estimatedDelivery={order.estimatedDelivery}
                />

                <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                  {lines.map((line) => (
                    <li key={line.id} className="flex items-center gap-3">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                        {line.imageUrl && (
                          <Image
                            src={line.imageUrl}
                            alt={line.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {line.name}
                        </span>
                        <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                          Size {line.size ?? "—"} · Qty {line.quantity}
                        </span>
                      </span>
                      <span className="text-sm font-semibold">
                        {formatPrice(line.priceCents * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
