"use client";

import { useSyncExternalStore } from "react";

import {
  selectItemCount,
  selectSubtotalCents,
  useCartStore,
  type CartItem,
} from "./cart";

const EMPTY_ITEMS: CartItem[] = [];

export function useCartItems() {
  return useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().items,
    () => EMPTY_ITEMS,
  );
}

export function useCartCount() {
  return useSyncExternalStore(
    useCartStore.subscribe,
    () => selectItemCount(useCartStore.getState()),
    () => 0,
  );
}

export function useCartSubtotal() {
  return useSyncExternalStore(
    useCartStore.subscribe,
    () => selectSubtotalCents(useCartStore.getState()),
    () => 0,
  );
}
