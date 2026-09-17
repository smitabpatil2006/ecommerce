import Image from "next/image";
import Link from "next/link";
import { asc, desc } from "drizzle-orm";

import { AUDIENCE_META } from "@/components/audience-catalog";
import { ProductGrid } from "@/components/product-grid";
import { db } from "@/db";
import { AUDIENCES, products } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await db
    .select()
    .from(products)
    .orderBy(desc(products.rating), asc(products.name))
    .limit(8);

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
            Icons, everyday essentials and performance gear — for men, women and
            kids.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          Shop by collection
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((audience) => {
            const meta = AUDIENCE_META[audience];
            return (
              <Link
                key={audience}
                href={`/${audience}`}
                className="group relative isolate flex h-72 items-end overflow-hidden rounded-3xl bg-neutral-900"
              >
                <Image
                  src={meta.image}
                  alt={`${meta.label}'s collection`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative w-full bg-gradient-to-t from-neutral-950/90 to-transparent p-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    {meta.label}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-200">
                    {meta.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Top rated</h2>
          <Link
            href="/men"
            className="text-sm font-semibold underline-offset-4 hover:underline"
          >
            Shop all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </main>
  );
}
