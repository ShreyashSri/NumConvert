import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: string): string {
  return value
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
