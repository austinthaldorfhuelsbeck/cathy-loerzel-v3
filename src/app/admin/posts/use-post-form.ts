import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

import "react-quill/dist/quill.snow.css";

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
  description: z
    .string()
    .max(1024, { message: "Description is too long" })
    .optional(),
  date: z.date(),
  categoryId: z.string({
    required_error: "Category is required",
  }),
  href: z.string().optional(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
});

// Invoke form hook
export function usePostForm({ post }: { post?: Post }) {
  const router = useRouter();

  // Create form with default values
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      name: post?.name ?? "",
      slug: post?.slug ?? "",
      description: post?.description ?? undefined,
      categoryId: post?.categoryId.toString() ?? undefined,
      date: post?.date ?? new Date(),
      href: post?.href ?? undefined,
      imageUrl: post?.imageUrl ?? undefined,
      audioUrl: post?.audioUrl ?? undefined,
      videoUrl: post?.videoUrl ?? undefined,
      content: post?.content ?? undefined,
    },
  });

  // Post mutations
  const createPostMutation = api.posts.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
      router.push("/admin/posts");
      toast({
        title: "Post created.",
      });
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
      router.refresh();
      toast({
        title: "Post saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handlers
  function onSubmit(values: z.infer<typeof postFormSchema>) {
    const formattedPost = {
      ...values,
      categoryId: parseInt(values.categoryId),
    };
    post
      ? updatePostMutation.mutate({ id: post.id, ...formattedPost })
      : createPostMutation.mutate(formattedPost);
  }

  // Show/hide preview
  const [showPreview, setShowPreview] = useState(false);
  function togglePreview() {
    setShowPreview((prev) => !prev);
  }

  // Automatically fill in slug based on name
  useEffect(() => {
    form.setValue("slug", convertToSlug(form.watch("name")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("name")]);

  return { form, onSubmit, showPreview, togglePreview };
}
