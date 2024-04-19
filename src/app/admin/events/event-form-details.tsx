"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type eventFormSchema } from "./use-event-form";

export function EventFormDetails({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventFormSchema>>;
}) {
  const { data: postCategories, isLoading } =
    api.categories.getAllEventCategories.useQuery();

  if (isLoading) return null;
  return (
    <>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="mt-3 flex flex-col">
            <FormLabel>Event date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "pl-3 text-left font-sans",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  className="font-sans"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {postCategories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="href"
        render={({ field }) => (
          <FormItem>
            <FormLabel>External URL</FormLabel>
            <FormControl>
              <Input placeholder="External URL" {...field} />
            </FormControl>
            <FormDescription>
              If this event should link to an external URL, enter it here
              (optional).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
