/**
 * Roastery Catalog
 *
 * Source of truth for all products. Replace with Firebase fetch later.
 * Categories: drinks, food, beans, merch.
 *
 * - Drinks have sizes (Small/Medium/Large with price modifiers).
 *   Drinks also support customization: strength, flavors, optional notes.
 *   Milk-based drinks additionally support milk choice.
 * - Food and beans have a single price.
 * - Merch with isApparel=true uses sizing (S/M/L/XL).
 */

export type ProductCategory = 'drinks' | 'food' | 'beans' | 'merch';

export type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: ProductCategory;
  section: string;
  hasSizes: boolean;
  isMilkBased?: boolean; // only set for drinks; if true, shows milk options
  isApparel?: boolean; // only set for merch; if true, shows S/M/L/XL sizes
  beanPrices?: { '250g': number; '500g': number; '1kg': number }; // only set for beans
};

// Cup sizes for drinks
export const SIZES = [
  { label: 'Small', priceModifier: 0 },
  { label: 'Medium', priceModifier: 0.25 },
  { label: 'Large', priceModifier: 0.5 },
];

// Strength: regular and decaf are free. Extra shot adds 0.500 KD. Up to 2 extra shots.
export type StrengthBase = 'Regular' | 'Decaf';

export const STRENGTH_BASE_OPTIONS: StrengthBase[] = ['Regular', 'Decaf'];

export const EXTRA_SHOT_PRICE = 0.5;
export const MAX_EXTRA_SHOTS = 2;

// Milk options for milk-based drinks. All free.
export type Milk = 'Regular' | 'Almond' | 'Lactose-free';

export const MILK_OPTIONS: Milk[] = ['Regular', 'Almond', 'Lactose-free'];

// Flavors: 0.300 KD each, multi-select.
export type Flavor = 'Vanilla' | 'Caramel' | 'Hazelnut';

export const FLAVOR_OPTIONS: Flavor[] = ['Vanilla', 'Caramel', 'Hazelnut'];

export const FLAVOR_PRICE = 0.3;

// Apparel sizes (T-shirts, hoodies). All same price.
export type ApparelSize = 'S' | 'M' | 'L' | 'XL';

export const APPAREL_SIZES: ApparelSize[] = ['S', 'M', 'L', 'XL'];

// Bag sizes for whole-bean coffee. Per-product pricing (set in catalog).
export type BeanSize = '250g' | '500g' | '1kg';

export const BEAN_SIZES: BeanSize[] = ['250g', '500g', '1kg'];

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'drinks', label: 'Beverages' },
  { id: 'food', label: 'Food' },
  { id: 'beans', label: 'Beans' },
  { id: 'merch', label: 'Merch' },
];

// Local logo asset used for FLAT-branded merch (apparel + cap)
export const FLAT_LOGO_IMAGE = require('../assets/images/flat-logo-card.png');
export const MERCH_IMAGES: Record<string, number> = {
  'LOCAL_TEE': require('../assets/images/tee.png'),
  'LOCAL_HOODIE': require('../assets/images/hoodie.png'),
  'LOCAL_CAP': require('../assets/images/cap.png'),
};

export const CATALOG: Product[] = [
  // DRINKS — Espresso Based
  {
    id: '1',
    name: 'Iced Latte',
    description:
      'A smooth blend of double-shot espresso poured over cold milk and ice. Refreshing, balanced, and perfect for warm Kuwait afternoons.',
    basePrice: 1.5,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
    isMilkBased: true,
  },
  {
    id: '2',
    name: 'Flat White',
    description:
      'Double-shot espresso topped with silky steamed milk and a thin layer of microfoam. Bold yet velvety.',
    basePrice: 1.5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
    isMilkBased: true,
  },
  {
    id: '3',
    name: 'Cortado',
    description:
      'Equal parts espresso and warm milk. A perfectly balanced cup for the purist.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
    isMilkBased: true,
  },
  {
    id: '4',
    name: 'Espresso',
    description:
      'A concentrated shot pulled to order from our house blend. Rich crema, clean finish.',
    basePrice: 1.0,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
    isMilkBased: false,
  },

  // DRINKS — Filter / Pour Over
  {
    id: '13',
    name: 'V60 Pour Over',
    description:
      'A hand-poured filter coffee that highlights the origin notes of our single-origin selection. Bright and clean.',
    basePrice: 2.0,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&q=80',
    category: 'drinks',
    section: 'Filter & Pour Over',
    hasSizes: false,
    isMilkBased: false,
  },
  {
    id: '14',
    name: 'Chemex',
    description:
      'A full carafe of slow-extracted filter coffee. Bright, clean, and ideal for sharing.',
    basePrice: 2.5,
    image: 'https://images.unsplash.com/photo-1494314671902-399b18174975?w=900&q=80',
    category: 'drinks',
    section: 'Filter & Pour Over',
    hasSizes: false,
    isMilkBased: false,
  },

  // DRINKS — Cold
  {
    id: '15',
    name: 'Cold Brew',
    description:
      'Steeped slowly for 18 hours for a naturally sweet, low-acidity cup. Served over ice.',
    basePrice: 1.75,
    image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=900&q=80',
    category: 'drinks',
    section: 'Cold',
    hasSizes: true,
    isMilkBased: false,
  },
  {
    id: '16',
    name: 'Iced Americano',
    description:
      'Two espresso shots poured over chilled water and ice. Crisp and refreshing.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=80',
    category: 'drinks',
    section: 'Cold',
    hasSizes: true,
    isMilkBased: false,
  },

  // FOOD
  {
    id: '20',
    name: 'Almond Protein Crunch',
    description:
      'House-baked granola bar with roasted almonds and 12g of plant protein. The perfect coffee companion.',
    basePrice: 1.5,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80',
    category: 'food',
    section: 'Pastries & Snacks',
    hasSizes: false,
  },
  {
    id: '21',
    name: 'Butter Croissant',
    description:
      'Flaky, golden, and laminated with French butter. Baked fresh each morning.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=900&q=80',
    category: 'food',
    section: 'Pastries & Snacks',
    hasSizes: false,
  },
  {
    id: '22',
    name: 'Pain au Chocolat',
    description:
      'A buttery croissant pastry wrapped around two batons of premium dark chocolate.',
    basePrice: 1.5,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80',
    category: 'food',
    section: 'Pastries & Snacks',
    hasSizes: false,
  },
  {
    id: '24',
    name: 'Avocado Toast',
    description:
      'Sourdough, smashed avocado, lemon, chili flakes, and Kuwaiti olive oil.',
    basePrice: 3.5,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=900&q=80',
    category: 'food',
    section: 'Bowls & Toasts',
    hasSizes: false,
  },

  // BEANS
  {
    id: '30',
    name: 'Ethiopia Yirgacheffe',
    description:
      'A bright, floral single-origin with notes of jasmine, bergamot, and lemon zest. Light roast.',
    basePrice: 6.5,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80',
    category: 'beans',
    section: 'Single Origin',
    hasSizes: false,
    beanPrices: { '250g': 6.5, '500g': 12, '1kg': 22 },
  },
  {
    id: '31',
    name: 'Colombia La Esperanza',
    description:
      'A rich, balanced cup with notes of milk chocolate, brown sugar, and red apple. Medium roast.',
    basePrice: 5.5,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=900&q=80',
    category: 'beans',
    section: 'Single Origin',
    hasSizes: false,
    beanPrices: { '250g': 5.5, '500g': 10, '1kg': 18.5 },
  },
  {
    id: '32',
    name: 'House Blend',
    description:
      'Our signature blend: balanced, full-bodied, and forgiving across brew methods. Notes of cocoa, hazelnut, and dried fruit.',
    basePrice: 4.5,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=900&q=80',
    category: 'beans',
    section: 'Blends',
    hasSizes: false,
    beanPrices: { '250g': 4.5, '500g': 8, '1kg': 15 },
  },

  // MERCH
  {
    id: '40',
    name: 'Roastery Tote Bag',
    description:
      'Heavyweight canvas tote with our logo. Perfect for groceries, books, or a thermos.',
    basePrice: 4.0,
    image: 'https://images.unsplash.com/photo-1591375275624-c4a76e3ccd75?w=900&q=80',
    category: 'merch',
    section: 'Accessories',
    hasSizes: false,
    isApparel: false,
  },
  {
    id: '41',
    name: 'Ceramic Cup — 250ml',
    description:
      'A handmade matte ceramic cup, designed to fit the perfect flat white.',
    basePrice: 6.0,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80',
    category: 'merch',
    section: 'Brewing',
    hasSizes: false,
    isApparel: false,
  },
  {
    id: '42',
    name: 'V60 Dripper',
    description:
      'A classic Hario V60 ceramic dripper. Includes 40 filter papers and a brew guide.',
    basePrice: 8.5,
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&q=80',
    category: 'merch',
    section: 'Brewing',
    hasSizes: false,
    isApparel: false,
  },
  {
    id: '43',
    name: 'Roastery Cap',
    description:
      'A six-panel cap in espresso brown, embroidered with our wordmark. One size, adjustable strap.',
    basePrice: 7.5,
    image: 'LOCAL_CAP',
    category: 'merch',
    section: 'Apparel',
    hasSizes: false,
    isApparel: false,
  },
  {
    id: '44',
    name: 'FLAT Tee',
    description:
      'Heavyweight cotton tee in cream, screen-printed with our logo. Made to last.',
    basePrice: 8.0,
    image: 'LOCAL_TEE',
    category: 'merch',
    section: 'Apparel',
    hasSizes: false,
    isApparel: true,
  },
  {
    id: '45',
    name: 'FLAT Hoodie',
    description:
      'A heavyweight cotton hoodie in espresso brown, screen-printed with our logo. For cold mornings.',
    basePrice: 20.0,
    image: 'LOCAL_HOODIE',
    category: 'merch',
    section: 'Apparel',
    hasSizes: false,
    isApparel: true,
  },
];

// Helper: Get a single product by id
export function getProduct(id: string | undefined): Product | undefined {
  if (!id) return undefined;
  return CATALOG.find((p) => p.id === id);
}

// Helper: Get all products in a category, grouped by section
export function getProductsByCategory(
  category: ProductCategory
): { section: string; products: Product[] }[] {
  const filtered = CATALOG.filter((p) => p.category === category);
  const sectionMap = new Map<string, Product[]>();

  filtered.forEach((p) => {
    if (!sectionMap.has(p.section)) {
      sectionMap.set(p.section, []);
    }
    sectionMap.get(p.section)!.push(p);
  });

  return Array.from(sectionMap.entries()).map(([section, products]) => ({
    section,
    products,
  }));
}

// Helper: resolve an image URI for use with <Image source={...}>.
// Remote URLs return as { uri: string }; local-logo placeholder returns the require'd asset.
export function resolveImage(image: string): { uri: string } | number {
  if (image === 'LOCAL_FLAT_LOGO') {
    return FLAT_LOGO_IMAGE;
  }
  if (MERCH_IMAGES[image]) {
    return MERCH_IMAGES[image];
  }
  return { uri: image };
}
