"use client";

import { useSyncExternalStore } from "react";

/** Client is mounted; server snapshot is false (no DOM mismatch for gated effects). */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
