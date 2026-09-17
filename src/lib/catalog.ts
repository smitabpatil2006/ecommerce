import { avg, count, eq, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { products, reviews, type Product } from "@/db/schema";

export type CatalogProduct = Product & { reviewCount: number };

export function displayRating(
  seededRating: string,
  averageRating: number | null,
) {
  return averageRating === null ? seededRating : averageRating.toFixed(1);
}

/**
 * Products with their rating overridden by the average of submitted reviews,
 * falling back to the seeded rating while a product has none.
 */
export async function listProducts(where?: SQL): Promise<CatalogProduct[]> {
  const rows = await db
    .select({
      product: products,
      averageRating: avg(reviews.rating),
      reviewCount: count(reviews.id),
    })
    .from(products)
    .leftJoin(reviews, eq(reviews.productId, products.id))
    .where(where)
    .groupBy(products.id);

  return rows
    .map(({ product, averageRating, reviewCount }) => ({
      ...product,
      rating: displayRating(
        product.rating,
        averageRating === null ? null : Number(averageRating),
      ),
      reviewCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
