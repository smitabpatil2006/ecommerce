"use client";

import { useSyncExternalStore } from "react";

import { selectItemCount, useCartStore } from "@/store/cart";

export function CartButton() {
  const count = useSyncExternalStore(
    useCartStore.subscribe,
    () => selectItemCount(useCartStore.getState()),
    () => 0,
  );

  return (
    <button
      type="button"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="group relative rounded-full p-2.5 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:hover:bg-neutral-800 dark:focus-visible:outline-white"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5 transition-transform group-hover:scale-110"
      >
        <path d="M3 5h2l1.6 10.2a2 2 0 0 0 2 1.8h7.9a2 2 0 0 0 2-1.6L20 8H6.2" />
        <circle cx="9.5" cy="20" r="1.3" />
        <circle cx="17" cy="20" r="1.3" />
      </svg>
      <span
        data-testid="cart-count"
        className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[11px] font-bold leading-none text-white tabular-nums shadow-sm"
      >
        {count}
      </span>
    </button>
  );
}
