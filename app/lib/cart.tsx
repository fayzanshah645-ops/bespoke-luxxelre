"use client";

// ---------------------------------------------------------------------------
// Cart store — React Context + useReducer with localStorage persistence
// ---------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "./products";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: string; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string; size: string }
  | {
      type: "UPDATE_QUANTITY";
      productId: string;
      size: string;
      quantity: number;
    }
  | { type: "CLEAR" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "bespoke-luxurrele-cart";

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIdx = state.items.findIndex(
        (i) => i.product.id === action.product.id && i.size === action.size,
      );

      let nextItems: CartItem[];
      if (existingIdx >= 0) {
        nextItems = state.items.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        );
      } else {
        nextItems = [
          ...state.items,
          {
            product: action.product,
            size: action.size,
            quantity: action.quantity,
          },
        ];
      }

      return { ...state, items: nextItems, isCartOpen: true };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(i.product.id === action.productId && i.size === action.size),
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              !(i.product.id === action.productId && i.size === action.size),
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId && item.size === action.size
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isCartOpen: true };

    case "CLOSE_CART":
      return { ...state, isCartOpen: false };

    case "HYDRATE":
      return { ...state, items: action.items };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CartContext = createContext<CartContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isCartOpen: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // Silently ignore corrupt data
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Quota exceeded — silently ignore
    }
  }, [state.items]);

  // ------- Memoised action creators -------

  const addItem = useCallback(
    (product: Product, size: string, quantity = 1) => {
      dispatch({ type: "ADD_ITEM", product, size, quantity });
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: string) => {
    dispatch({ type: "REMOVE_ITEM", productId, size });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", productId, size, quantity });
    },
    [],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, []);

  // ------- Derived values -------

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen: state.isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}
