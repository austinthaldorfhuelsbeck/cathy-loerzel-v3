"use client";

import { Form } from "@/components/ui/form";
import { type Category } from "@prisma/client";
import { CategoryFormContent } from "./category-form-content";
import { useCategoryForm } from "./use-category-form";

export function CategoryForm({ category }: { category?: Category }) {
  const { form, onSubmit, showPreview, togglePreview } = useCategoryForm({
    category,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CategoryFormContent form={form} />
      </form>
    </Form>
  );
}
