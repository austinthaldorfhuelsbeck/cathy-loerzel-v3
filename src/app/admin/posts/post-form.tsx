"use client";

import { PostContent } from "@/app/posts/[slug]/post-content";
import { Form } from "@/components/ui/form";
import type { Post } from "@prisma/client";

import { FormHeader } from "../form-header";

import "react-quill/dist/quill.snow.css";
import { PostFormContent } from "./post-form-content";
import { usePostForm } from "./use-post-form";

export function PostForm({ post }: { post?: Post }) {
  const { form, onSubmit, showPreview, togglePreview } = usePostForm({ post });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormHeader item={post} type="post" togglePreview={togglePreview} />
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
