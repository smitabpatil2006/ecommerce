import type { Order, OrderStage } from "@/db/schema";

export const STAGE_LABELS: Record<OrderStage, string> = {
  packing: "Packing",
  shipped: "Shipped",
  delivered: "Delivered",
};

const PACKING_MS = 2 * 60 * 1000;
const SHIPPING_LEAD_DAYS = 4;

export const estimatedDeliveryFrom = (placedAt: Date) =>
  new Date(placedAt.getTime() + SHIPPING_LEAD_DAYS * 24 * 60 * 60 * 1000);

/**
 * Demo fulfilment clock: an order packs for two minutes, ships until its
 * estimated delivery date, then counts as delivered.
 */
export function currentStage(
  order: Pick<Order, "createdAt" | "estimatedDelivery" | "stage">,
  now = new Date(),
): OrderStage {
  if (order.stage === "delivered") return "delivered";
  if (now >= order.estimatedDelivery) return "delivered";
  if (now.getTime() - order.createdAt.getTime() < PACKING_MS) return "packing";
  return "shipped";
}
