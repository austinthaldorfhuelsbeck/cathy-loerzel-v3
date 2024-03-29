import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shorten(text: string, maxLength: number) {
  return text.length > maxLength
    ? `${text.split(" ").slice(0, maxLength).join(" ")}...`
    : text;
}
