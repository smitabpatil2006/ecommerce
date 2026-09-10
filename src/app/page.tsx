import { asc } from "drizzle-orm";

import { CartBadge } from "@/components/cart-badge";
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
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nike Store</h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            {allProducts.length} products from Neon Postgres via Drizzle
          </p>
        </div>
        <CartBadge />
      </header>

      {allProducts.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">
          No products yet. Run <code>npm run db:seed</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
