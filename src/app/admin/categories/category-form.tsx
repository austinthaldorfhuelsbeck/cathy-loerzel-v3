"use client";

import { CategoryCard } from "@/app/_components/category-cards";
import { EventsPageHeader } from "@/app/events/events-page-header";
import { Form } from "@/components/ui/form";
import { type Category } from "@prisma/client";
import { FormHeader } from "../form-header";
import { CategoryFormContent } from "./category-form-content";
import { useCategoryForm } from "./use-category-form";

export function CategoryForm({ category }: { category?: Category }) {
  const { form, onSubmit, showPreview, togglePreview } = useCategoryForm({
    category,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormHeader
          item={category}
          type="category"
          togglePreview={togglePreview}
        />
        {showPreview ? (
          <div className="col-span-3 my-5 flex flex-col items-center gap-3 font-serif">
            <CategoryCard category={form.watch()} idx={0} />
            <EventsPageHeader eventCategory={form.watch()} />
          </div>
        ) : (
          <CategoryFormContent form={form} />
        )}
      </form>
    </Form>
  );
}
