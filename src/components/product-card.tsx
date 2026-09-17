"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [size, setSize] = useState(product.sizes[0] ?? null);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-black/40">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800"
      >
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
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
          {product.category}
        </p>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {product.color}
        </p>

        {product.sizes.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={`min-w-9 rounded-full border px-2 py-1 text-xs font-medium transition-colors ${
                  size === option
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

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
