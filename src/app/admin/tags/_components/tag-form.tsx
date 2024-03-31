"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tag name is required" })
    .max(64, { message: "Tag name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(64, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  color: z.string().length(7),
  description: z.string().max(255).optional(),
});

export function TagForm({ tag }: { tag?: Tag }) {
  const { toast } = useToast();
  const router = useRouter();
  const createTagMutation = api.tags.create.useMutation({
    onSuccess: () => {
      router.push("/admin/tags");
    },
    onError: (error) => {
      toast({
        title: "Error creating tag",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const updateTagMutation = api.tags.update.useMutation({
    onSuccess: () => {
      router.push("/admin/tags");
    },
    onError: (error) => {
      toast({
        title: "Error updating tag",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize form with tag data if editing
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tag?.name ?? "",
      slug: tag?.slug ?? (tag?.name && convertToSlug(tag.name)) ?? "",
      color: tag?.color ?? "#BC796C",
      description: tag?.description ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    tag
      ? updateTagMutation.mutate({ ...values, id: tag.id })
      : createTagMutation.mutate({ ...values });
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
        className="mx-auto flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag name</FormLabel>
              <FormControl>
                <Input placeholder="Leadership" {...field} />
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
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="leadership" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="#BC796C" type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A tag for leadership content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mr-auto">
          Save
        </Button>
      </form>
    </Form>
  );
}
