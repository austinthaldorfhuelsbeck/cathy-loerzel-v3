import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shorten(text: string, maxLength: number) {
  const words = text.split(" ");

  return words.length > maxLength
    ? `${words.slice(0, maxLength).join(" ")}...`
    : text;
}

export function timeToRead(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function pluralize(input: string) {
  return input.endsWith("y") ? input.slice(0, -1) + "ies" : input + "s";
}

export function convertToSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
  isEvent: z.boolean(),
  eventLocation: z.string().optional(),
  eventDate: z.date().optional(),
  message: z.string({
    required_error: "What do you want to say?",
  }),
});