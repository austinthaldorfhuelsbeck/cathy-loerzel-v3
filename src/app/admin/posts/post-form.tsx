"use client";

import { PostContent } from "@/app/posts/post-content";
import { Form } from "@/components/ui/form";
import { convertToSlug } from "@/lib/utils";
import { type Post } from "@prisma/client";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { PostFormContent } from "./post-form-content";
import { PostFormHeader } from "./post-form-header";
import { usePostForm } from "./usePostForm";

export function PostForm({ post }: { post?: Post }) {
  // Custom form hook
  const { form, onSubmit, onDelete } = usePostForm({ post });

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5 flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <PostFormHeader
          post={post}
          onDelete={onDelete}
          togglePreview={togglePreview}
        />
        {showPreview ? (
          <div className="col-span-3 flex flex-col gap-3 font-serif">
            <PostContent
              post={{
                ...form.watch(),
                categoryId: Number(form.watch("categoryId")),
              }}
            />
          </div>
        ) : (
          <PostFormContent form={form} />
        )}
      </form>
    </Form>
  );
}
