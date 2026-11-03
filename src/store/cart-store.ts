"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItemType {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  variantName: string;
  sku: string;
  price: number;
  regularPrice: number;
  image: string;
  quantity: number;
  maxStock: number;
}

interface CartStore {
  items: CartItemType[];
  isOpen: boolean;
  couponCode: string | null;
  discountAmount: number;
  deliveryArea: "INSIDE_DHAKA" | "OUTSIDE_DHAKA";
  deliveryCharge: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItemType) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setDeliveryArea: (area: "INSIDE_DHAKA" | "OUTSIDE_DHAKA", charge?: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      discountAmount: 0,
      deliveryArea: "INSIDE_DHAKA",
      deliveryCharge: 80,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            const nextQuantity = Math.min(
              currentItem.quantity + newItem.quantity,
              newItem.maxStock || 99
            );
            updatedItems[existingIndex] = {
              ...currentItem,
              quantity: nextQuantity,
            };
            return { items: updatedItems, isOpen: true };
          }

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.variantId === variantId) {
              const maxAllowed = item.maxStock || 99;
              return {
                ...item,
                quantity: Math.min(quantity, maxAllowed),
              };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discountAmount: 0 }),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, discountAmount: discount }),

      removeCoupon: () => set({ couponCode: null, discountAmount: 0 }),

      setDeliveryArea: (area, charge) => {
        const defaultCharge = area === "INSIDE_DHAKA" ? 80 : 150;
        set({
          deliveryArea: area,
          deliveryCharge: charge !== undefined ? charge : defaultCharge,
        });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        const delivery = subtotal > 10000 ? 0 : get().deliveryCharge; // Free over 10,000 BDT
        return Math.max(0, subtotal - discount + delivery);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "arvano-shopping-bag",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        deliveryArea: state.deliveryArea,
        deliveryCharge: state.deliveryCharge,
      }),
    }
  )
);
