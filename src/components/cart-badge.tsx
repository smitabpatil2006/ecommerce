"use client";

import { useEffect, useState } from "react";

import { selectItemCount, useCartStore } from "@/store/cart";

export function CartBadge() {
  const count = useCartStore(selectItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <span className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white dark:bg-white dark:text-black">
      Cart {mounted ? count : 0}
    </span>
  );
}
