"use client";

import { useState, useCallback, type ReactNode } from "react";
import { CartButton } from "./cart-button";
import { CartDrawer } from "./cart-drawer";

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {children}
      <CartButton onClick={toggle} />
      <CartDrawer open={open} onClose={close} />
    </>
  );
}
