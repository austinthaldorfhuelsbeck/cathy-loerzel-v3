"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema
export const postFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(128, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  categoryId: z.string().max(8),
  description: z.string().max(1024, { message: "Description is too long" }),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  href: z.string().optional(),
  featured: z.boolean(),
  content: z.string().optional(),
});

export function usePostForm({ post }: { post?: Post | null }) {
  const router = useRouter();

  // Create form with default values
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      name: post?.name ?? "",
      slug: post?.slug ?? "",
      description: post?.description ?? "",
      categoryId: String(post?.categoryId ?? ""),
      imageUrl: post?.imageUrl ?? "",
      audioUrl: post?.audioUrl ?? "",
      videoUrl: post?.videoUrl ?? "",
      href: post?.href ?? "",
      featured: post?.featured ?? false,
      content: post?.content ?? "",
    },
  });

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

  // Handle form actions
  function onSubmit(values: z.infer<typeof postFormSchema>) {
    // const res = post
    //   ? updatePostMutation.mutate({ id: post.id, ...values })
    //   : createPostMutation.mutate({ published: false, ...values });
    console.log("post saved");
    toast({
      title: "Post saved",
      description: JSON.stringify(
        {
          ...values,
          categoryId: Number(values.categoryId),
        },
        null,
        2,
      ),
    });
  }
  function onDelete(id: number) {
    deletePostMutation.mutate({ id });
  }

  return {
    form,
    onSubmit,
    onDelete,
  };
}
