"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItemType {
  productId: string;
  name: string;
  slug: string;
  price: number;
  regularPrice: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItemType[];
  addItem: (item: WishlistItemType) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (item: WishlistItemType) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().isInWishlist(item.productId)) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
      toggleWishlist: (item) => {
        if (get().isInWishlist(item.productId)) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },
    }),
    {
      name: "arvano-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
