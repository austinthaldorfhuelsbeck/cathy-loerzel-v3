import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(64, { message: "Category name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(64, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  type: z.enum(["EVENT", "POST"]),
  subtitle: z.string().max(64, { message: "Subtitle is too long" }).optional(),
  description: z
    .string()
    .max(255, { message: "Description is too long" })
    .optional(),
});

export function useCategoryForm({ category }: { category?: Category }) {
  const { toast } = useToast();
  const router = useRouter();
  const createCategoryMutation = api.categories.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/categories");
    },
    onError: (error) => {
      toast({
        title: "Error creating category",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const updateCategoryMutation = api.categories.update.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/categories");
    },
    onError: (error) => {
      toast({
        title: "Error updating category",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize form with category data
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      type: category?.type ?? "POST",
      subtitle: category?.subtitle ?? "",
      description: category?.description ?? "",
    },
  });

  // Handlers
  function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    category
      ? updateCategoryMutation.mutate({ id: category.id, ...values })
      : createCategoryMutation.mutate(values);
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

  return {
    form,
    onSubmit,
    showPreview,
    togglePreview,
  };
}
