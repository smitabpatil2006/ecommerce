import { asc } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";

import { CartBadge } from "@/components/cart-badge";
import { ProductCard } from "@/components/product-card";
import { SignOutButton } from "@/components/sign-out-button";
import { db } from "@/db";
import { products } from "@/db/schema";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allProducts, session] = await Promise.all([
    db.select().from(products).orderBy(asc(products.name)),
    auth.api.getSession({ headers: await headers() }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nike Store</h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            {allProducts.length} products from Neon Postgres via Drizzle
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CartBadge />
          {session ? (
            <>
              <span className="text-sm text-black/60 dark:text-white/60">
                {session.user.name || session.user.email}
              </span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm underline underline-offset-4"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full border border-black/15 px-4 py-1.5 text-sm font-medium dark:border-white/20"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
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
