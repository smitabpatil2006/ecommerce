export const FREE_SHIPPING_THRESHOLD_CENTS = 15000;
export const FLAT_SHIPPING_CENTS = 500;

export function shippingCents(subtotalCents: number) {
  if (subtotalCents === 0) return 0;
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
    ? 0
    : FLAT_SHIPPING_CENTS;
}
