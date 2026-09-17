import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";

import { ProductGrid } from "@/components/product-grid";
import { listProducts } from "@/lib/catalog";
import { products, type Audience } from "@/db/schema";

export const AUDIENCE_META: Record<
  Audience,
  { label: string; tagline: string; image: string }
> = {
  men: {
    label: "Men",
    tagline: "Icons, trainers and everyday essentials built to go the distance.",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1600&q=80&auto=format&fit=crop",
  },
  women: {
    label: "Women",
    tagline: "Studio-to-street styles engineered for movement and comfort.",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1600&q=80&auto=format&fit=crop",
  },
  kids: {
    label: "Kids",
    tagline: "Playground-proof sneakers and soft layers, sized for little legs.",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=80&auto=format&fit=crop",
  },
};

export async function AudienceCatalog({
  audience,
  category,
}: {
  audience: Audience;
  category?: string;
}) {
  const meta = AUDIENCE_META[audience];

  const all = await listProducts(eq(products.audience, audience));

  const categories = [...new Set(all.map((product) => product.category))];
  const activeCategory =
    category && categories.includes(category) ? category : undefined;

  const visible = activeCategory
    ? all.filter((product) => product.category === activeCategory)
    : all;

  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-neutral-950">
        <Image
          src={meta.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            {meta.label}&apos;s collection
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
            {meta.label}
          </h1>
          <p className="mt-4 max-w-xl text-base text-neutral-200">
            {meta.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Link
            href={`/${audience}`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory
                ? "border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
                : "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
            }`}
          >
            All ({all.length})
          </Link>
          {categories.map((name) => (
            <Link
              key={name}
              href={`/${audience}?category=${encodeURIComponent(name)}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === name
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                  : "border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        <ProductGrid products={visible} />
      </section>
    </main>
  );
}
