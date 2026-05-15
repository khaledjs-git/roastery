/**
 * Roastery Catalog
 *
 * Source of truth for all products. Replace with Firebase fetch later.
 * Categories: drinks, food, beans, merch.
 * Drinks have sizes (Small/Medium/Large with price modifiers).
 * Food, beans, and merch have a single price.
 */

export type ProductCategory = 'drinks' | 'food' | 'beans' | 'merch';

export type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: ProductCategory;
  section: string; // e.g., "Espresso Based", "Cold Brew", "Pastries"
  hasSizes: boolean;
};

export const SIZES = [
  { label: 'Small', priceModifier: 0 },
  { label: 'Medium', priceModifier: 0.25 },
  { label: 'Large', priceModifier: 0.5 },
];

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'drinks', label: 'Drinks' },
  { id: 'food', label: 'Food' },
  { id: 'beans', label: 'Beans' },
  { id: 'merch', label: 'Merch' },
];

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
  },
  {
    id: '2',
    name: 'Flat White',
    description:
      'Velvety microfoam over a double ristretto. Less foam, more coffee — for the purist.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
  },
  {
    id: '3',
    name: 'Cortado',
    description:
      'Equal parts espresso and warm milk. Bold, balanced, Spanish-style.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: true,
  },
  {
    id: '13',
    name: 'Espresso',
    description: 'A single shot of our house blend. Bold and aromatic.',
    basePrice: 1.0,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&q=80',
    category: 'drinks',
    section: 'Espresso Based',
    hasSizes: false,
  },

  // DRINKS — Filter
  {
    id: '4',
    name: 'V60 Pour Over',
    description:
      'Hand-poured filter coffee using a Hario V60. Bright, clean, and crafted for the moment.',
    basePrice: 2.0,
    image: 'https://images.unsplash.com/photo-1542318850-95184e9c6c9b?w=900&q=80',
    category: 'drinks',
    section: 'Filter',
    hasSizes: false,
  },
  {
    id: '14',
    name: 'Chemex',
    description:
      'Slow-extracted filter coffee with a clean, tea-like body. Brewed by the cup.',
    basePrice: 2.25,
    image: 'https://images.unsplash.com/photo-1494314671902-399b18174975?w=900&q=80',
    category: 'drinks',
    section: 'Filter',
    hasSizes: false,
  },

  // DRINKS — Cold Brew
  {
    id: '15',
    name: 'Cold Brew',
    description:
      'Steeped for 14 hours, low acidity, naturally sweet. Served over ice.',
    basePrice: 1.75,
    image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=900&q=80',
    category: 'drinks',
    section: 'Cold Brew',
    hasSizes: true,
  },
  {
    id: '16',
    name: 'Iced Americano',
    description: 'Espresso over chilled water and ice. Clean, strong, simple.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1530373239216-42518e6b3b8b?w=900&q=80',
    category: 'drinks',
    section: 'Cold Brew',
    hasSizes: true,
  },

  // FOOD — Pastries
  {
    id: '20',
    name: 'Almond Protein Crunch',
    description:
      'Made with creamy almond butter, wholesome oats, protein, and coated with Dulcey chocolate.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80',
    category: 'food',
    section: 'Pastries',
    hasSizes: false,
  },
  {
    id: '21',
    name: 'Butter Croissant',
    description:
      'Laminated 81-hours, baked fresh daily. Crisp shell, airy layers.',
    basePrice: 1.0,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=900&q=80',
    category: 'food',
    section: 'Pastries',
    hasSizes: false,
  },
  {
    id: '22',
    name: 'Pain au Chocolat',
    description: 'Two batons of 70% dark chocolate folded into our viennoiserie dough.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80',
    category: 'food',
    section: 'Pastries',
    hasSizes: false,
  },

  // FOOD — Bento
  {
    id: '23',
    name: 'Protein Bento',
    description:
      'A balanced bento with grilled chicken, quinoa, roasted vegetables, and tahini drizzle.',
    basePrice: 2.5,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80',
    category: 'food',
    section: 'Bento',
    hasSizes: false,
  },
  {
    id: '24',
    name: 'Avocado Toast',
    description:
      'Sourdough, smashed avocado, lemon, chili flakes, and za\u2019atar.',
    basePrice: 2.0,
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec3?w=900&q=80',
    category: 'food',
    section: 'Bento',
    hasSizes: false,
  },

  // BEANS
  {
    id: '30',
    name: 'Ethiopia Yirgacheffe — 250g',
    description:
      'Bright and floral. Notes of jasmine, bergamot, and stone fruit. Light roast, single origin.',
    basePrice: 6.5,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80',
    category: 'beans',
    section: 'Single Origin',
    hasSizes: false,
  },
  {
    id: '31',
    name: 'Colombia La Esperanza — 250g',
    description:
      'Round and chocolatey. Notes of caramel, hazelnut, and red apple. Medium roast.',
    basePrice: 5.5,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=900&q=80',
    category: 'beans',
    section: 'Single Origin',
    hasSizes: false,
  },
  {
    id: '32',
    name: 'House Blend — 250g',
    description:
      'Our signature espresso blend. Balanced body, dark chocolate finish. Great with milk.',
    basePrice: 5.0,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=900&q=80',
    category: 'beans',
    section: 'Blends',
    hasSizes: false,
  },

  // MERCH
  {
    id: '40',
    name: 'Roastery Tote Bag',
    description:
      'Heavyweight cotton canvas tote. Minimal embroidered logo. Carries coffee, books, intentions.',
    basePrice: 4.5,
    image: 'https://images.unsplash.com/photo-1591375275624-c4a76e3ccd75?w=900&q=80',
    category: 'merch',
    section: 'Bags',
    hasSizes: false,
  },
  {
    id: '41',
    name: 'Ceramic Cup — 250ml',
    description:
      'Hand-finished ceramic cup. Minimal silhouette. Espresso brown matte glaze inside.',
    basePrice: 6.0,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80',
    category: 'merch',
    section: 'Drinkware',
    hasSizes: false,
  },
  {
    id: '42',
    name: 'V60 Dripper',
    description:
      'Hario V60 02 ceramic dripper. The classic pour-over tool. Brew at home.',
    basePrice: 8.0,
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&q=80',
    category: 'merch',
    section: 'Equipment',
    hasSizes: false,
  },
  {
    id: '43',
    name: 'Roastery Cap',
    description: 'Unstructured cotton cap. Embroidered "%" mark. Adjustable strap.',
    basePrice: 5.5,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80',
    category: 'merch',
    section: 'Apparel',
    hasSizes: false,
  },
];

// Helper: get a product by id
export function getProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}

// Helper: get all products in a category, grouped by section
export function getProductsByCategory(category: ProductCategory): {
  section: string;
  products: Product[];
}[] {
  const filtered = CATALOG.filter((p) => p.category === category);
  const grouped: Record<string, Product[]> = {};
  filtered.forEach((p) => {
    if (!grouped[p.section]) grouped[p.section] = [];
    grouped[p.section].push(p);
  });
  return Object.entries(grouped).map(([section, products]) => ({
    section,
    products,
  }));
}
