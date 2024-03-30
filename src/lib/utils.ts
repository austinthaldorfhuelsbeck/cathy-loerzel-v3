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

export function timeToRead(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
}