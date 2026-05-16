import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem } from './cartStore';

// A finalized order — captured at checkout time.
// Stores everything needed to display the order and to "reorder" it later.
export type Order = {
  id: string; // unique, e.g. timestamp-based
  orderNumber: string; // user-facing short code, e.g. "FLT-2418"
  createdAt: number; // ms timestamp
  items: CartItem[]; // full snapshot including customization
  subtotal: number;
  total: number;
  pickupLocation: string; // e.g. "Salmiya"
  pickupTime: string; // e.g. "ASAP" or "12:30 PM"
  status: 'received' | 'preparing' | 'ready' | 'completed';
};

type OrdersState = {
  orders: Order[]; // newest first
  addOrder: (o: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  setStatus: (id: string, status: Order['status']) => void;
  clear: () => void; // for dev/debug
};

// Generate a short user-facing order number like "FLT-4821"
function generateOrderNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `FLT-${n}`;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (o) => {
        const order: Order = {
          ...o,
          id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
          status: 'received',
        };
        set((state) => ({
          orders: [order, ...state.orders].slice(0, 50), // keep last 50
        }));
        return order;
      },

      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),

      clear: () => set({ orders: [] }),
    }),
    {
      name: 'flat-orders',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper: format a relative timestamp for display
export function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day === 1) return 'yesterday';
  if (day < 7) return `${day}d ago`;
  const d = new Date(ms);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Helper: build a one-line summary of an order's items
// e.g. "1× Iced Latte, 2× Flat White" or "3 items"
export function orderSummary(order: Order): string {
  if (order.items.length === 0) return 'Empty order';
  if (order.items.length === 1) {
    const i = order.items[0];
    return `${i.quantity}× ${i.name}`;
  }
  if (order.items.length <= 3) {
    return order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ');
  }
  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);
  return `${totalQty} items`;
}

// Helper: reorder — push every item from a past order into the cart.
// Caller passes the cartStore's addItem function.
export function reorderInto(
  order: Order,
  addItem: (item: Omit<CartItem, 'quantity'>) => void
) {
  order.items.forEach((item) => {
    // Re-add each item the same number of times as it was originally ordered
    for (let i = 0; i < item.quantity; i++) {
      const { quantity: _q, ...rest } = item;
      addItem(rest);
    }
  });
}
