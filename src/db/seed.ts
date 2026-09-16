import { db } from "./index";
import { products, type NewProduct } from "./schema";

const nikeProducts: NewProduct[] = [
  {
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the b-ball original that puts a fresh spin on what you know best.",
    category: "Lifestyle",
    color: "Pastel Multi",
    priceCents: 11000,
    rating: "4.8",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description:
      "Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots.",
    category: "Lifestyle",
    color: "Infrared",
    priceCents: 13000,
    rating: "4.7",
    imageUrl:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Dunk Low Retro",
    slug: "nike-dunk-low-retro",
    description:
      "Created for the hardwood but taken to the streets, the Dunk Low returns with crisp overlays and original team colors.",
    category: "Lifestyle",
    color: "Black/Starfish",
    priceCents: 11500,
    rating: "4.6",
    imageUrl:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Pegasus 41",
    slug: "nike-pegasus-41",
    description:
      "A springy ride for every run, the Pegasus 41 pairs ReactX foam with dual Air Zoom units for responsive cushioning.",
    category: "Running",
    color: "Crimson/White",
    priceCents: 14000,
    rating: "4.5",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Metcon 9",
    slug: "nike-metcon-9",
    description:
      "Built for heavy lifts and high-intensity intervals with a wide, stable heel and a grippy rubber outsole.",
    category: "Training",
    color: "Volt",
    priceCents: 15000,
    rating: "4.4",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Tech Fleece Hoodie",
    slug: "nike-tech-fleece-hoodie",
    description:
      "Lightweight Tech Fleece fabric delivers warmth without the bulk, finished with a smooth zip and roomy pockets.",
    category: "Apparel",
    color: "Clay",
    priceCents: 13500,
    rating: "4.7",
    imageUrl:
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Sportswear Club Tee",
    slug: "nike-sportswear-club-tee",
    description:
      "Soft cotton jersey and a classic fit make this everyday tee an easy layer with a vintage Swoosh graphic.",
    category: "Apparel",
    color: "White",
    priceCents: 3000,
    rating: "4.3",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80&auto=format&fit=crop",
  },
  {
    name: "Nike Elite Basketball Backpack",
    slug: "nike-elite-basketball-backpack",
    description:
      "Carry your gear in a padded, water-resistant pack with a dedicated ball compartment and laptop sleeve.",
    category: "Accessories",
    color: "Black",
    priceCents: 10000,
    rating: "4.2",
    inStock: false,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80&auto=format&fit=crop",
  },
];

async function seed() {
  await db.delete(products);
  const inserted = await db.insert(products).values(nikeProducts).returning();
  console.log(`Seeded ${inserted.length} products`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
