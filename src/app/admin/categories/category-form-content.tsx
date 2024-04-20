import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { categoryFormSchema } from "./use-category-form";

export function CategoryFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof categoryFormSchema>>;
}) {
  return (
    <div className="mx-auto my-5 flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {/* Basic Information */}
      <section className="sm:col-span-2 lg:col-span-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Category name"
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
                  placeholder="Post slug (autofills)"
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Category subtitle"
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

      {/* Category Type */}
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-5"
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="POST" />
                  </FormControl>
                  <FormLabel>Post</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="EVENT" />
                  </FormControl>
                  <FormLabel>Event</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
