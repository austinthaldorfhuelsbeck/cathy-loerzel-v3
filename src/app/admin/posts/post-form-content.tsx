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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import ReactPlayer from "react-player";
import ReactQuill from "react-quill";
import type { z } from "zod";
import type { postFormSchema } from "./use-post-form";

export function PostFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  const { data: postCategories, isLoading: postCategoriesLoading } =
    api.categories.getAllPostCategories.useQuery();

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

      {/* Basic Information */}
      <section className="sm:col-span-2 lg:col-span-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Post name"
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

      {/* Additional Information */}
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
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="mt-3 flex flex-col">
            <FormLabel>Published date</FormLabel>
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
                  disabled={(date) => date > new Date()}
                  className="font-sans"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <section className="sm:col-span-2 lg:col-span-1">
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
                If this post should link to an external URL, enter it here
                (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>

      {/* Media */}
      <FormField
        control={form.control}
        name="audioUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Audio</FormLabel>
            {field.value && (
              <audio controls className="w-full">
                <source src={field.value} type="audio/mpeg" />
              </audio>
            )}
            <FormControl>
              <div className="relative rounded-md border">
                <UploadButton
                  className="p-3 ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
                  endpoint="audioUploader"
                  onClientUploadComplete={(res) => {
                    // Update the form with the new image URL
                    form.setValue("audioUrl", res[0]?.url);
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
      <FormField
        control={form.control}
        name="videoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video</FormLabel>
            {field.value && (
              <ReactPlayer controls className="w-full" url={field.value} />
            )}
            <FormControl>
              <div className="relative rounded-md border">
                <UploadButton
                  className="p-3 ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
                  endpoint="videoUploader"
                  onClientUploadComplete={(res) => {
                    // Update the form with the new image URL
                    form.setValue("videoUrl", res[0]?.url);
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

      {/* Main Content (rich text editor) */}
      <section className="sm:col-span-2 lg:col-span-3">
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
      </section>
    </div>
  );
}
