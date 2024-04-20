import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category name</FormLabel>
            <FormControl>
              <Input placeholder="Category name" {...field} />
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
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input placeholder="Category slug" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Category type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="POST">Post</SelectItem>
                <SelectItem value="EVENT">Event</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Category subtitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <section className="sm:col-span-2 lg:col-span-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Category description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </div>
  );
}
