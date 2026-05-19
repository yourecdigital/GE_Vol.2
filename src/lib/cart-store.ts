"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { MenuItem } from "./georgian-menu";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

type Listener = () => void;

let items: CartItem[] = [];
let listeners: Listener[] = [];

function emit() {
  for (const l of listeners) l();
}

function getSnapshot(): CartItem[] {
  return items;
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function makeId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function addToCart(item: MenuItem) {
  const id = makeId(item.name);
  const existing = items.find((i) => i.id === id);
  if (existing) {
    items = items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
  } else {
    items = [...items, { id, name: item.name, price: item.price, qty: 1 }];
  }
  emit();
}

export function removeFromCart(id: string) {
  items = items.filter((i) => i.id !== id);
  emit();
}

export function updateQty(id: string, qty: number) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  items = items.map((i) => (i.id === id ? { ...i, qty } : i));
  emit();
}

export function clearCart() {
  items = [];
  emit();
}

export function useCart() {
  const cartItems = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return { items: cartItems, total, count };
}
