"use server";

import { headers } from "next/headers";
import { inArray } from "drizzle-orm";

import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { auth } from "@/lib/auth";
import { estimatedDeliveryFrom } from "@/lib/orders";
import { shippingCents } from "@/lib/shipping";

export type CheckoutInput = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  paymentMethod: "upi" | "cod";
  upiId?: string;
  items: { productId: string; size: string | null; quantity: number }[];
};

export type CheckoutResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function placeOrder(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, error: "Sign in to place your order." };

  if (input.items.length === 0) return { ok: false, error: "Your bag is empty." };

  const required = [
    ["full name", input.fullName],
    ["address", input.address],
    ["city", input.city],
    ["postal code", input.postalCode],
    ["phone number", input.phone],
  ] as const;
  const missing = required.find(([, value]) => value.trim().length === 0);
  if (missing) return { ok: false, error: `Enter your ${missing[0]}.` };

  if (!/^[0-9+][0-9\s-]{6,}$/.test(input.phone.trim())) {
    return { ok: false, error: "Enter a valid phone number." };
  }

  if (input.paymentMethod === "upi" && !/^[\w.-]+@[\w.-]+$/.test(input.upiId ?? "")) {
    return { ok: false, error: "Enter a valid UPI ID, e.g. name@bank." };
  }

  const catalog = await db
    .select()
    .from(products)
    .where(inArray(products.id, [...new Set(input.items.map((i) => i.productId))]));

  const lines = input.items.map((item) => {
    const product = catalog.find((entry) => entry.id === item.productId);
    if (!product) throw new Error("Product no longer available");
    return {
      product,
      size: item.size,
      quantity: Math.max(1, Math.min(20, Math.trunc(item.quantity))),
    };
  });

  const soldOut = lines.find((line) => !line.product.inStock);
  if (soldOut) {
    return { ok: false, error: `${soldOut.product.name} is sold out.` };
  }

  const subtotal = lines.reduce(
    (total, line) => total + line.product.priceCents * line.quantity,
    0,
  );
  const placedAt = new Date();

  const [order] = await db
    .insert(orders)
    .values({
      userId: session.user.id,
      fullName: input.fullName.trim(),
      address: input.address.trim(),
      city: input.city.trim(),
      postalCode: input.postalCode.trim(),
      phone: input.phone.trim(),
      paymentMethod: input.paymentMethod,
      upiId: input.paymentMethod === "upi" ? input.upiId?.trim() : null,
      totalCents: subtotal + shippingCents(subtotal),
      estimatedDelivery: estimatedDeliveryFrom(placedAt),
    })
    .returning();

  await db.insert(orderItems).values(
    lines.map((line) => ({
      orderId: order.id,
      productId: line.product.id,
      name: line.product.name,
      size: line.size,
      quantity: line.quantity,
      priceCents: line.product.priceCents,
      imageUrl: line.product.imageUrl,
    })),
  );

  return { ok: true, orderId: order.id };
}
