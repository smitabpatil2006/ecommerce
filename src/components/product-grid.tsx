import { ProductCard } from "@/components/product-card";
import type { Product } from "@/db/schema";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-neutral-500 dark:text-neutral-400">
        Nothing here yet. Run <code>npm run db:seed</code>.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
