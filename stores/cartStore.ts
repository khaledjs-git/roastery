import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  pulseCounter: number; // increments on every addItem → triggers cart icon animation
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  increaseQuantity: (id: string, size: string) => void;
  decreaseQuantity: (id: string, size: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  pulseCounter: 0,

  addItem: (newItem) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === newItem.id && i.size === newItem.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === newItem.id && i.size === newItem.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
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

  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.size === size)),
    }));
  },

  increaseQuantity: (id, size) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  },

  decreaseQuantity: (id, size) => {
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
