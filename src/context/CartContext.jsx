import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "sellphone_cart_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadInitial() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || typeof parsed !== "object") return { items: {} };
  if (!parsed.items || typeof parsed.items !== "object") return { items: {} };
  return { items: parsed.items };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, qty = 1 } = action.payload;
      const current = state.items[id] ?? 0;
      return { ...state, items: { ...state.items, [id]: current + qty } };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const nextQty = Math.max(0, Number(qty) || 0);
      const nextItems = { ...state.items };
      if (nextQty <= 0) delete nextItems[id];
      else nextItems[id] = nextQty;
      return { ...state, items: nextItems };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    function addToCart(id, qty = 1) {
      dispatch({ type: "ADD", payload: { id, qty } });
    }
    function setQty(id, qty) {
      dispatch({ type: "SET_QTY", payload: { id, qty } });
    }
    function clearCart() {
      dispatch({ type: "CLEAR" });
    }
    const count = Object.values(state.items).reduce((a, b) => a + b, 0);
    return { items: state.items, addToCart, setQty, clearCart, count };
  }, [state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

