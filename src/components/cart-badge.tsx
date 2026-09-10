"use client";

import { useSyncExternalStore } from "react";

import { selectItemCount, useCartStore } from "@/store/cart";

export function CartBadge() {
  const count = useSyncExternalStore(
    useCartStore.subscribe,
    () => selectItemCount(useCartStore.getState()),
    () => 0,
  );

  return (
    <span className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white dark:bg-white dark:text-black">
      Cart {count}
    </span>
  );
}
