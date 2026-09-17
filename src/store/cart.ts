import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  size: string | null;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  setOpen: (isOpen: boolean) => void;
};

const itemKey = (productId: string, size: string | null) =>
  `${productId}::${size ?? ""}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const key = itemKey(item.productId, item.size);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, key, quantity }] };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "nike-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectItemCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotalCents = (state: CartState) =>
  state.items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0,
  );
