"use client";

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

  return (
    <article className="flex flex-col rounded-xl border border-black/10 p-5 transition-shadow hover:shadow-lg dark:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            {product.category} · {product.color}
          </p>
        </div>
        <span className="text-lg font-semibold">
          {formatPrice(product.priceCents)}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm text-black/70 dark:text-white/70">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-black/60 dark:text-white/60">
          ★ {product.rating}
          {!product.inStock && " · Out of stock"}
        </span>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              priceCents: product.priceCents,
            })
          }
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
