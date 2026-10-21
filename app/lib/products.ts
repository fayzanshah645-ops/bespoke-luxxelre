// ---------------------------------------------------------------------------
// Product data model & mock catalogue — Bespoke Luxurrele
// ---------------------------------------------------------------------------

export type ProductVariant = {
  size: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: "bridal" | "pherans" | "festive" | "anarkalis" | "new-arrivals";
  badge?: "New" | "Bestseller" | "Made to Order" | "Limited Edition";
  description: string;
  details: {
    includes: string[];
    fabric: string;
    color: string;
    care: string;
    deliveryTime: string;
  };
  variants: ProductVariant[];
  featured: boolean;
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export type Category = {
  slug: string;
  title: string;
  description: string;
};

const categories: Category[] = [
  {
    slug: "bridal",
    title: "Bridal Couture",
    description:
      "Heirloom bridal ensembles adorned with centuries-old Tilla and Sozni embroidery, crafted for the most cherished day of your life.",
  },
  {
    slug: "pherans",
    title: "Pherans",
    description:
      "The quintessential Kashmiri garment reimagined — luxurious pherans featuring intricate Aari and Sozni work on the finest fabrics.",
  },
  {
    slug: "festive",
    title: "Festive Wear",
    description:
      "Celebrate in splendour with richly embroidered ensembles designed for Eid, weddings, and every occasion worth remembering.",
  },
  {
    slug: "anarkalis",
    title: "Anarkalis",
    description:
      "Flowing silhouettes meet Kashmiri artistry — our Anarkali collection blends regal grace with hand-crafted embroidery.",
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    description:
      "The latest additions to our atelier — freshly crafted pieces that honour tradition while embracing contemporary elegance.",
  },
];

// ---------------------------------------------------------------------------
// Mock product catalogue (8 products)
// ---------------------------------------------------------------------------

const products: Product[] = [
  {
    id: "prod-001",
    slug: "sozni-tilla-bridal-ensemble",
    title: "Sozni Tilla Bridal Ensemble",
    price: 24999,
    images: ["/pheran1.jpg", "/pheran2.jpg"],
    category: "bridal",
    badge: "Made to Order",
    description:
      "A breathtaking bridal ensemble woven from pure silk organza, lavished with hand-embroidered Sozni and Tilla work passed down through generations of Kashmiri artisans. Every motif — from the chinar leaf to the almond blossom — is rendered in gold zari and silk thread, requiring over 800 hours of meticulous needlework.",
    details: {
      includes: ["Pheran", "Palazzo", "Organza Dupatta", "Satin Lining"],
      fabric: "Pure Silk Organza with Satin Inner",
      color: "Ivory & Antique Gold",
      care: "Dry clean only. Store in muslin garment bag.",
      deliveryTime: "6–8 weeks (Made to Order)",
    },
    variants: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
    featured: true,
  },
  {
    id: "prod-002",
    slug: "aari-embroidered-velvet-pheran",
    title: "Aari Embroidered Velvet Pheran",
    price: 12999,
    comparePrice: 15999,
    images: ["/pheran2.jpg", "/pheran3.jpg"],
    category: "pherans",
    badge: "Bestseller",
    description:
      "Our signature velvet pheran, adorned with traditional Aari chain-stitch embroidery in a cascading paisley motif. The rich velvet drapes beautifully over layered winter silhouettes, while the intricate needlework across the yoke and sleeves speaks to the artisan's mastery.",
    details: {
      includes: ["Pheran", "Cotton Lining"],
      fabric: "Premium Velvet with Cotton Inner",
      color: "Deep Maroon with Gold Embroidery",
      care: "Dry clean only. Avoid direct sunlight to preserve velvet.",
      deliveryTime: "3–4 weeks (Made to Order)",
    },
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: false },
    ],
    featured: true,
  },
  {
    id: "prod-003",
    slug: "papier-mache-festive-suit",
    title: "Papier Mâché Festive Suit",
    price: 8499,
    images: ["/pheran3.jpg", "/pheran4.jpg"],
    category: "festive",
    badge: "New",
    description:
      "A celebration of Kashmir's famed Papier Mâché artistry translated into wearable couture. This festive suit features hand-painted motifs inspired by the Mughal garden, executed in rich jewel tones on soft georgette. Perfect for mehendi nights and intimate dawats.",
    details: {
      includes: ["Kurta", "Churidar", "Chiffon Dupatta"],
      fabric: "Pure Georgette with Santoon Lining",
      color: "Teal Green with Multi-colour Embroidery",
      care: "Dry clean recommended. Iron on low heat, reverse side only.",
      deliveryTime: "2–3 weeks",
    },
    variants: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
    featured: true,
  },
  {
    id: "prod-004",
    slug: "chinar-sozni-anarkali",
    title: "Chinar Sozni Anarkali",
    price: 18500,
    images: ["/pheran4.jpg", "/pheran1.jpg"],
    category: "anarkalis",
    badge: "Limited Edition",
    description:
      "An ethereal floor-length Anarkali featuring the iconic Chinar leaf motif rendered in painstaking Sozni embroidery. The flowing panels are cut from handwoven chanderi silk, allowing graceful movement with every step. Limited to 25 pieces per season.",
    details: {
      includes: ["Anarkali", "Palazzo Pants", "Woven Dupatta"],
      fabric: "Handwoven Chanderi Silk",
      color: "Dusty Rose with Ivory Sozni Work",
      care: "Dry clean only. Store flat or on padded hanger.",
      deliveryTime: "4–5 weeks (Limited Edition)",
    },
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: false },
      { size: "XL", inStock: false },
    ],
    featured: true,
  },
  {
    id: "prod-005",
    slug: "pashmina-jamawar-pheran",
    title: "Pashmina Jamawar Pheran",
    price: 21000,
    images: ["/pheran1.jpg", "/pheran4.jpg"],
    category: "pherans",
    badge: "Made to Order",
    description:
      "A collector's piece — this Jamawar-patterned pheran is crafted from the finest hand-spun Pashmina, woven on a traditional loom in Srinagar. The Jamawar weave creates an all-over tapestry of florals and arabesques that seems to shimmer in changing light.",
    details: {
      includes: ["Pheran", "Silk Lining", "Muslin Storage Bag"],
      fabric: "100% Hand-spun Pashmina (GI Certified)",
      color: "Natural Ivory with Jamawar Weave in Burgundy & Gold",
      care: "Specialist dry clean only. Store with cedar sachets.",
      deliveryTime: "8–10 weeks (Made to Order)",
    },
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
    featured: false,
  },
  {
    id: "prod-006",
    slug: "tilla-dozi-eid-ensemble",
    title: "Tilla Dozi Eid Ensemble",
    price: 9999,
    images: ["/pheran3.jpg", "/pheran2.jpg"],
    category: "festive",
    description:
      "Mark the crescent moon in resplendent style. This Eid ensemble is enriched with Tilla Dozi — the royal Kashmiri art of gold thread couching — across the bodice, sleeves, and dupatta border. A garment that honours festive traditions with quiet opulence.",
    details: {
      includes: ["Kurta", "Sharara", "Net Dupatta with Tilla Border"],
      fabric: "Art Silk with Viscose Blend",
      color: "Midnight Blue with Gold Tilla Work",
      care: "Dry clean only. Avoid folding on embroidered areas.",
      deliveryTime: "2–3 weeks",
    },
    variants: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: false },
    ],
    featured: false,
  },
  {
    id: "prod-007",
    slug: "kani-weave-anarkali-set",
    title: "Kani Weave Anarkali Set",
    price: 15999,
    comparePrice: 18999,
    images: ["/pheran2.jpg", "/pheran4.jpg"],
    category: "anarkalis",
    badge: "Bestseller",
    description:
      "Inspired by the legendary Kani shawl looms of Kanihama village, this Anarkali translates the distinctive twill-tapestry weave into a flowing silhouette. Each panel features hand-woven Kani motifs that take weeks to complete on the traditional wooden loom.",
    details: {
      includes: ["Anarkali Kurta", "Lycra Churidar", "Kani-border Stole"],
      fabric: "Modal Silk with Kani Weave Panels",
      color: "Saffron & Sage with Multi-colour Kani Motifs",
      care: "Gentle dry clean. Do not wring or twist.",
      deliveryTime: "3–4 weeks",
    },
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
    featured: true,
  },
  {
    id: "prod-008",
    slug: "cotton-aari-summer-pheran",
    title: "Cotton Aari Summer Pheran",
    price: 4999,
    images: ["/pheran4.jpg", "/pheran3.jpg"],
    category: "new-arrivals",
    badge: "New",
    description:
      "A lighter take on the beloved pheran, perfect for Srinagar's gentle summers and air-conditioned evenings elsewhere. Fine cotton khadi forms the canvas for delicate Aari chain-stitch florals along the neckline and hem — effortless elegance for everyday wear.",
    details: {
      includes: ["Pheran"],
      fabric: "Handloom Cotton Khadi",
      color: "Sage Green with White Aari Embroidery",
      care: "Hand wash in cold water. Air dry in shade.",
      deliveryTime: "1–2 weeks",
    },
    variants: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
    featured: true,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Returns every product in the catalogue. */
export function getProducts(): Product[] {
  return products;
}

/** Finds a single product by its URL-safe slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Returns products belonging to the given category slug. */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/** Returns only the products marked as featured. */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** Returns the full list of product categories. */
export function getCategories(): Category[] {
  return categories;
}
