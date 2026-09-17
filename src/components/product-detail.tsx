"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Stars } from "@/components/stars";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function ProductDetail({
  product,
  averageRating,
  reviewCount,
}: {
  product: Product;
  averageRating: number;
  reviewCount: number;
}) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const setOpen = useCartStore((state) => state.setOpen);
  const [size, setSize] = useState(product.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function add() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        size,
        priceCents: product.priceCents,
        imageUrl: product.imageUrl,
      },
      quantity,
    );
  }

  function handleAdd() {
    add();
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    add();
    router.push("/checkout");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            product.inStock
              ? "bg-white/90 text-neutral-900"
              : "bg-neutral-900/90 text-white"
          }`}
        >
          {product.inStock ? "In stock" : "Sold out"}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          {product.audience} · {product.category}
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {product.color}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <Stars rating={averageRating} />
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            ({reviewCount} review{reviewCount === 1 ? "" : "s"})
          </span>
        </div>

        <p className="mt-6 text-3xl font-bold">
          {formatPrice(product.priceCents)}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {product.description}
        </p>

        {product.sizes.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Select size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                  className={`min-w-14 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    size === option
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "border-neutral-300 hover:border-neutral-900 dark:border-neutral-700 dark:hover:border-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-neutral-300 dark:border-neutral-700">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-11 w-11 rounded-full text-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="h-11 w-11 rounded-full text-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            className="flex-1 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:scale-100 dark:bg-white dark:text-neutral-900 dark:disabled:bg-neutral-800"
          >
            {product.inStock ? (added ? "Added to bag ✓" : "Add to bag") : "Sold out"}
          </button>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleBuyNow}
            className="flex-1 rounded-full border border-neutral-900 px-8 py-4 text-sm font-semibold transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400 dark:border-white dark:hover:bg-white dark:hover:text-neutral-900"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
