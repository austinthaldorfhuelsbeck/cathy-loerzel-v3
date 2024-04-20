"use client";

import { type z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { type UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { type eventFormSchema } from "./use-event-form";

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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function EventFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventFormSchema>>;
}) {
  const { data: postCategories, isLoading: postCategoriesLoading } =
    api.categories.getAllEventCategories.useQuery();

  return (
    <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {/* Image */}
      <section className="w-full sm:col-span-2 lg:col-span-3">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  {field.value && (
                    <Image
                      src={field.value}
                      alt="Post image"
                      width={400}
                      height={200}
                      className="absolute h-full w-full object-cover opacity-50"
                    />
                  )}
                  <UploadButton
                    className="p-3 ut-button:bg-primary ut-button:ut-readying:bg-primary/50 sm:h-56"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Update the form with the new image URL
                      form.setValue("imageUrl", res[0]?.url);
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>

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
            <FormItem className="flex items-center justify-start">
              <p className="mt-[9.5px] text-sm">cathyloerzel.com/events/</p>
              <FormControl>
                <Input
                  placeholder="event-name"
                  {...field}
                  className="border-none p-0 text-sm focus-visible:ring-transparent"
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
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!postCategoriesLoading && (
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
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <section className="lg:col-span-3">
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
      </section>

      <div className="sm:col-span-2 lg:col-span-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <ReactQuill
                  placeholder="Type your content here..."
                  theme="snow"
                  value={field.value}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
