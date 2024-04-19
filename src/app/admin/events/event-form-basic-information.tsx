"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type UseFormReturn } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { type z } from "zod";
import { type eventFormSchema } from "../events/use-event-form";

export function EventFormBasicInformation({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventFormSchema>>;
}) {
  return (
    <section className="sm:col-span-2 lg:col-span-3">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Event name"
                {...field}
                className="border-none text-2xl focus-visible:ring-transparent"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Event slug (autofills)"
                {...field}
                className="border-none text-sm focus-visible:ring-transparent"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
