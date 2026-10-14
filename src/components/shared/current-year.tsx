"use client";

import { useSyncExternalStore } from "react";

import { site } from "@/content/site";

const subscribe = () => () => {};

/**
 * Shows the current year without reading the clock during server rendering,
 * so the statically generated markup stays stable.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => site.startYear,
  );
  return <>{year}</>;
}
