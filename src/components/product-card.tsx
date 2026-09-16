"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/db/schema";
import { useCartStore } from "@/store/cart";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceCents / 100);
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-black/40">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
            product.inStock
              ? "bg-white/90 text-neutral-900"
              : "bg-neutral-900/90 text-white"
          }`}
        >
          {product.inStock ? "In stock" : "Sold out"}
        </span>

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-neutral-900">
          ★ {product.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
          {product.category}
        </p>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
          {product.name}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {product.color}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-neutral-900 dark:text-white">
            {formatPrice(product.priceCents)}
          </span>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.04] hover:bg-neutral-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:scale-100 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500"
          >
            {product.inStock ? (added ? "Added ✓" : "Add to cart") : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
}
