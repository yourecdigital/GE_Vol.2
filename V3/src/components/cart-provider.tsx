"use client";

import { useState, useCallback, type ReactNode } from "react";
import { CartButton } from "./cart-button";
import { CartDrawer } from "./cart-drawer";
import { OrderForm } from "./order-form";

export function CartProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeOrder = useCallback(() => setOrderOpen(false), []);

  const openOrder = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setOrderOpen(true), 200);
  }, []);

  return (
    <>
      {children}
      <CartButton onClick={toggleDrawer} />
      <CartDrawer open={drawerOpen} onClose={closeDrawer} onOrder={openOrder} />
      <OrderForm open={orderOpen} onClose={closeOrder} />
    </>
  );
}
