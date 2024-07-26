// @ts-nocheck

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Function to introduce a delay.
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
