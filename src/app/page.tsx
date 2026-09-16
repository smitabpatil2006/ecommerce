import { asc } from "drizzle-orm";

import { ProductCard } from "@/components/product-card";
import { db } from "@/db";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(asc(products.name));

  return (
    <main className="flex-1">
      <section className="border-b border-neutral-200 bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Just Do It
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-7xl">
            Move with
            <br />
            purpose
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-neutral-300">
            Icons, everyday essentials and performance gear — the full lineup,
            ready to ship.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured products
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {allProducts.length} items
          </p>
        </div>

        {allProducts.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">
            No products yet. Run <code>npm run db:seed</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
