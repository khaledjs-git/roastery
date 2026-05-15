import { create } from 'zustand';
import type { Flavor, Milk } from '@/data/catalog';

// A fully-specified line item in the cart.
// Two items are "the same" only if every customization matches.
export type CartItem = {
  id: string;
  name: string;
  price: number; // unit price INCLUDING all customization modifiers
  size: string;
  image: string;
  quantity: number;

  // Drink customization (undefined for non-drinks)
  strengthBase?: string; // 'Regular' | 'Decaf'
  extraShots?: number; // 0, 1, or 2
  milk?: Milk; // only for milk-based drinks
  flavors?: Flavor[]; // multi-select
  notes?: string; // free-form special instructions

  // Apparel size (undefined for non-apparel)
  apparelSize?: string; // 'S' | 'M' | 'L' | 'XL'
};

// Build a unique signature for a cart line based on all distinguishing fields.
function lineKey(i: {
  id: string;
  size: string;
  strengthBase?: string;
  extraShots?: number;
  milk?: string;
  flavors?: string[];
  notes?: string;
  apparelSize?: string;
}): string {
  const flavors = (i.flavors || []).slice().sort().join('+');
  return [
    i.id,
    i.size || '',
    i.strengthBase || '',
    i.extraShots ?? 0,
    i.milk || '',
    flavors,
    (i.notes || '').trim().toLowerCase(),
    i.apparelSize || '',
  ].join('|');
}

type CartState = {
  items: CartItem[];
  pulseCounter: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItemByKey: (key: string) => void;
  increaseByKey: (key: string) => void;
  decreaseByKey: (key: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  keyFor: (i: CartItem) => string;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  pulseCounter: 0,

  keyFor: (i) => lineKey(i),

  addItem: (newItem) => {
    set((state) => {
      const key = lineKey(newItem);
      const existing = state.items.find((i) => lineKey(i) === key);

      if (existing) {
        return {
          items: state.items.map((i) =>
            lineKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
          ),
          pulseCounter: state.pulseCounter + 1,
        };
      }
      return {
        items: [...state.items, { ...newItem, quantity: 1 }],
        pulseCounter: state.pulseCounter + 1,
      };
    });
  },

  removeItemByKey: (key) => {
    set((state) => ({
      items: state.items.filter((i) => lineKey(i) !== key),
    }));
  },

  increaseByKey: (key) => {
    set((state) => ({
      items: state.items.map((i) =>
        lineKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  },

  decreaseByKey: (key) => {
    set((state) => ({
      items: state.items
        .map((i) =>
          lineKey(i) === key ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
