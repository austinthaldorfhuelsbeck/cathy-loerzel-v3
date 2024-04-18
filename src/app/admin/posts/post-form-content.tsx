"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { type UseFormReturn } from "react-hook-form";
import ReactPlayer from "react-player";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { type z } from "zod";
import { type postFormSchema } from "./usePostForm";

function BasicInformation({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
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
  );
}

function CategorySelect({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  // Fetch all available post categories for the select dropdown
  const categoriesQuery = api.categories.getAllPostCategories.useQuery();

  return (
    categoriesQuery.data && (
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Post category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesQuery.data.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              A post needs to be assigned to a category.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  );
}

function ExternalUrl({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  return (
    <section className="lg:col-span-2">
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
  );
}

function FileUploaders({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <div className="relative rounded-md border">
                {field.value && (
                  <Image
                    src={field.value}
                    alt="Post image"
                    width={400}
                    height={200}
                    className="absolute h-full w-full rounded-md object-cover opacity-50"
                  />
                )}
                <UploadButton
                  className="p-3 ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
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
    </>
  );
}

function Content({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  return (
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
  );
}

export function PostFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  return (
    <>
      <BasicInformation form={form} />
      <CategorySelect form={form} />
      <ExternalUrl form={form} />
      <FileUploaders form={form} />
      <Content form={form} />
    </>
  );
}
