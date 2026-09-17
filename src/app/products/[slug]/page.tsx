import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";

import { ProductDetail } from "@/components/product-detail";
import { ReviewForm } from "@/components/review-form";
import { Stars } from "@/components/stars";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) notFound();

  const [productReviews, session] = await Promise.all([
    db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, product.id))
      .orderBy(desc(reviews.createdAt)),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const averageRating = productReviews.length
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
      productReviews.length
    : Number(product.rating);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
      <nav className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href={`/${product.audience}`} className="capitalize hover:underline">
          {product.audience}
        </Link>
        <span className="px-2">/</span>
        <span className="text-neutral-900 dark:text-white">{product.name}</span>
      </nav>

      <ProductDetail
        product={product}
        averageRating={averageRating}
        reviewCount={productReviews.length}
      />

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Reviews ({productReviews.length})
          </h2>
          {productReviews.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              No reviews yet — be the first.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
              {productReviews.map((review) => (
                <li key={review.id} className="py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">
                      {review.authorName}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <Stars rating={review.rating} className="mt-1 text-sm" />
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ReviewForm
          productId={product.id}
          slug={product.slug}
          signedIn={Boolean(session)}
        />
      </section>
    </main>
  );
}
