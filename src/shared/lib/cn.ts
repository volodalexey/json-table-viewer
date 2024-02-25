import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  // px-2 py-2 => twMerge => p-2
  // clsx => order of classes doesn't matter
  return twMerge(clsx(args));
}
