"use client";

import { z } from "zod";

import {
  Form,
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
import { useToast } from "@/components/ui/use-toast";
import { convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PostFormHeader } from "./post-form-header";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(128, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  categoryId: z.number(),
  description: z.string().max(1024, { message: "Description is too long" }),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  href: z.string().optional(),
  featured: z.boolean(),
  content: z.string().optional(),
});

export function PostForm({ post }: { post?: Post }) {
  const { toast } = useToast();
  const router = useRouter();

  // Fetch all available post categories for the select dropdown
  const categoriesQuery = api.categories.getAllPostCategories.useQuery();

  // Create, update, and delete post mutations
  const createPostMutation = api.posts.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const updatePostMutation = api.posts.update.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const deletePostMutation = api.posts.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: post?.name ?? "",
      slug: post?.slug ?? "",
      categoryId: post?.categoryId ?? 0,
      description: post?.description ?? "",
      imageUrl: post?.imageUrl ?? "",
      audioUrl: post?.audioUrl ?? "",
      videoUrl: post?.videoUrl ?? "",
      href: post?.href ?? "",
      featured: post?.featured ?? false,
      content: post?.content ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // post
    //   ? updatePostMutation.mutate({ id: post.id, ...values })
    //   : createPostMutation.mutate({ published: false, ...values });
    toast({
      title: "Post saved",
      description: (
        <pre className="bg-slate-800 text-white">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Automatically fill in slug based on name
  useEffect(() => {
    form.setValue("slug", convertToSlug(form.watch("name")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("name")]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <PostFormHeader
          post={post}
          handleDeletePost={(id: number) => deletePostMutation.mutate({ id })}
        />

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
                    placeholder="Post slug"
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

        {categoriesQuery.data && (
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
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

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
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
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
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
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
                <video controls className="w-full">
                  <source src={field.value} type="audio/mpeg" />
                </video>
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
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Content"
                    {...field}
                    className="min-h-[500px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
