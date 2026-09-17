import { db } from "./index";
import { products, type NewProduct } from "./schema";

const SHOE_SIZES = ["7", "8", "9", "10", "11", "12"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const KIDS_SHOE_SIZES = ["1Y", "2Y", "3Y", "4Y", "5Y", "6Y"];
const KIDS_APPAREL_SIZES = ["XS", "S", "M", "L"];
const ONE_SIZE = ["One size"];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1000&q=80&auto=format&fit=crop`;

const nikeProducts: NewProduct[] = [
  {
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the b-ball original that puts a fresh spin on what you know best.",
    category: "Lifestyle",
    audience: "men",
    sizes: SHOE_SIZES,
    color: "Pastel Multi",
    priceCents: 11000,
    rating: "4.8",
    imageUrl: img("photo-1595950653106-6c9ebd614d3a"),
  },
  {
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description:
      "Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots.",
    category: "Lifestyle",
    audience: "men",
    sizes: SHOE_SIZES,
    color: "Infrared",
    priceCents: 13000,
    rating: "4.7",
    imageUrl: img("photo-1600185365483-26d7a4cc7519"),
  },
  {
    name: "Nike Dunk Low Retro",
    slug: "nike-dunk-low-retro",
    description:
      "Created for the hardwood but taken to the streets, the Dunk Low returns with crisp overlays and original team colors.",
    category: "Lifestyle",
    audience: "men",
    sizes: SHOE_SIZES,
    color: "Black/Starfish",
    priceCents: 11500,
    rating: "4.6",
    imageUrl: img("photo-1556906781-9a412961c28c"),
  },
  {
    name: "Nike Pegasus 41",
    slug: "nike-pegasus-41",
    description:
      "A springy ride for every run, the Pegasus 41 pairs ReactX foam with dual Air Zoom units for responsive cushioning.",
    category: "Running",
    audience: "men",
    sizes: SHOE_SIZES,
    color: "Crimson/White",
    priceCents: 14000,
    rating: "4.5",
    imageUrl: img("photo-1542291026-7eec264c27ff"),
  },
  {
    name: "Nike Metcon 9",
    slug: "nike-metcon-9",
    description:
      "Built for heavy lifts and high-intensity intervals with a wide, stable heel and a grippy rubber outsole.",
    category: "Training",
    audience: "men",
    sizes: SHOE_SIZES,
    color: "Volt",
    priceCents: 15000,
    rating: "4.4",
    imageUrl: img("photo-1606107557195-0e29a4b5b4aa"),
  },
  {
    name: "Nike Tech Fleece Hoodie",
    slug: "nike-tech-fleece-hoodie",
    description:
      "Lightweight Tech Fleece fabric delivers warmth without the bulk, finished with a smooth zip and roomy pockets.",
    category: "Apparel",
    audience: "men",
    sizes: APPAREL_SIZES,
    color: "Clay",
    priceCents: 13500,
    rating: "4.7",
    imageUrl: img("photo-1578768079052-aa76e52ff62e"),
  },
  {
    name: "Nike Sportswear Club Tee",
    slug: "nike-sportswear-club-tee",
    description:
      "Soft cotton jersey and a classic fit make this everyday tee an easy layer with a vintage Swoosh graphic.",
    category: "Apparel",
    audience: "men",
    sizes: APPAREL_SIZES,
    color: "White",
    priceCents: 3000,
    rating: "4.3",
    imageUrl: img("photo-1521572163474-6864f9cf17ab"),
  },
  {
    name: "Nike Elite Basketball Backpack",
    slug: "nike-elite-basketball-backpack",
    description:
      "Carry your gear in a padded, water-resistant pack with a dedicated ball compartment and laptop sleeve.",
    category: "Accessories",
    audience: "men",
    sizes: ONE_SIZE,
    color: "Black",
    priceCents: 10000,
    rating: "4.2",
    inStock: false,
    imageUrl: img("photo-1553062407-98eeb64c6a62"),
  },

  {
    name: "Nike Dunk High Pastel",
    slug: "nike-dunk-high-pastel",
    description:
      "A high-top Dunk in soft pastel leather, built with padded collars and a cushioned midsole for all-day wear.",
    category: "Lifestyle",
    audience: "women",
    sizes: SHOE_SIZES,
    color: "Pink Foam/Lilac",
    priceCents: 12500,
    rating: "4.8",
    imageUrl: img("photo-1584735175315-9d5df23860e6"),
  },
  {
    name: "Nike Zoom Fly 6",
    slug: "nike-zoom-fly-6",
    description:
      "Tempo-day trainer with a carbon-infused plate and ZoomX foam that rolls you forward on long, fast miles.",
    category: "Running",
    audience: "women",
    sizes: SHOE_SIZES,
    color: "Black/Volt",
    priceCents: 16500,
    rating: "4.6",
    imageUrl: img("photo-1491553895911-0055eca6402d"),
  },
  {
    name: "Nike One High-Waisted Leggings",
    slug: "nike-one-high-waisted-leggings",
    description:
      "Dri-FIT knit with a smoothing high waistband that stays put through squats, sprints and everything after.",
    category: "Apparel",
    audience: "women",
    sizes: APPAREL_SIZES,
    color: "Team Red",
    priceCents: 6500,
    rating: "4.7",
    imageUrl: img("photo-1571019613454-1cb2f99b2d8b"),
  },
  {
    name: "Nike Pro Training Set",
    slug: "nike-pro-training-set",
    description:
      "A matched bra-and-short set in sweat-wicking Dri-FIT fabric with light support for studio and gym sessions.",
    category: "Training",
    audience: "women",
    sizes: APPAREL_SIZES,
    color: "Sail",
    priceCents: 8900,
    rating: "4.5",
    imageUrl: img("photo-1518611012118-696072aa579a"),
  },
  {
    name: "Nike Sportswear Essential Hoodie",
    slug: "nike-sportswear-essential-hoodie",
    description:
      "Brushed-back fleece in a relaxed cut, with a roomy hood and kangaroo pocket for cool-down comfort.",
    category: "Apparel",
    audience: "women",
    sizes: APPAREL_SIZES,
    color: "Heather Grey",
    priceCents: 9500,
    rating: "4.4",
    imageUrl: img("photo-1556821840-3a63f95609a7"),
  },
  {
    name: "Nike Sportswear Everyday Tee",
    slug: "nike-sportswear-everyday-tee",
    description:
      "A breathable cotton tee cut for an easy drape, finished with a tonal Swoosh at the chest.",
    category: "Apparel",
    audience: "women",
    sizes: APPAREL_SIZES,
    color: "White",
    priceCents: 3200,
    rating: "4.2",
    imageUrl: img("photo-1620799139507-2a76f79a2f4d"),
  },

  {
    name: "Nike Air Max 90 Little Kids",
    slug: "nike-air-max-90-little-kids",
    description:
      "The icon, kid-sized. Visible Air cushioning and durable overlays that keep up with the playground.",
    category: "Lifestyle",
    audience: "kids",
    sizes: KIDS_SHOE_SIZES,
    color: "White/Infrared",
    priceCents: 8000,
    rating: "4.7",
    imageUrl: img("photo-1514989940723-e8e51635b782"),
  },
  {
    name: "Nike Revolution 7 Kids",
    slug: "nike-revolution-7-kids",
    description:
      "Lightweight everyday sneakers with soft foam cushioning and a colour-blocked upper kids love.",
    category: "Running",
    audience: "kids",
    sizes: KIDS_SHOE_SIZES,
    color: "Multi",
    priceCents: 5500,
    rating: "4.5",
    imageUrl: img("photo-1560769629-975ec94e6a86"),
  },
  {
    name: "Nike Kids Club Fleece Hoodie",
    slug: "nike-kids-club-fleece-hoodie",
    description:
      "Cosy brushed fleece with a lined hood, built to survive playtime and the washing machine.",
    category: "Apparel",
    audience: "kids",
    sizes: KIDS_APPAREL_SIZES,
    color: "Sand",
    priceCents: 4800,
    rating: "4.6",
    imageUrl: img("photo-1522771930-78848d9293e8"),
  },
  {
    name: "Nike Kids Futura Tee 2-Pack",
    slug: "nike-kids-futura-tee-2-pack",
    description:
      "Two soft cotton tees with bold Futura graphics — an easy win for school days and weekends.",
    category: "Apparel",
    audience: "kids",
    sizes: KIDS_APPAREL_SIZES,
    color: "Assorted",
    priceCents: 3500,
    rating: "4.4",
    imageUrl: img("photo-1503944583220-79d8926ad5e2"),
  },
  {
    name: "Nike Kids Brasilia Backpack",
    slug: "nike-kids-brasilia-backpack",
    description:
      "A right-sized pack with padded straps, a roomy main compartment and a bottle pocket for school runs.",
    category: "Accessories",
    audience: "kids",
    sizes: ONE_SIZE,
    color: "Rust",
    priceCents: 3900,
    rating: "4.3",
    imageUrl: img("photo-1622560480605-d83c853bc5c3"),
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
