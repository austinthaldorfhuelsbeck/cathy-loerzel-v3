import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Define form schema
export const eventFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Event name is required" })
    .max(64, { message: "Event name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(64, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  description: z
    .string()
    .max(1024, { message: "Description is too long" })
    .optional(),
  date: z.date(),
  location: z.string().max(255, { message: "Location is too long" }),
  categoryId: z.string({
    required_error: "Category is required",
  }),
  href: z.string().optional(),
  imageUrl: z.string().optional(),
  content: z.string().optional(),
});

// Invoke form hook
export function useEventForm({ event }: { event?: Event }) {
  const router = useRouter();

  // Create form with default values
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: event?.name ?? "",
      slug: event?.slug ?? "",
      description: event?.description ?? undefined,
      date: event?.date ?? new Date(),
      location: event?.location ?? "",
      categoryId: event?.categoryId.toString() ?? undefined,
      href: event?.href ?? undefined,
      imageUrl: event?.imageUrl ?? undefined,
      content: event?.content ?? undefined,
    },
  });

  // Event mutations
  const createEventMutation = api.events.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/events");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const updateEventMutation = api.events.update.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/admin/events");
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
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const formattedEvent = {
      ...values,
      categoryId: parseInt(values.categoryId),
    };
    // event
    //   ? updateEventMutation.mutate({ id: event.id, ...formattedEvent })
    //   : createEventMutation.mutate(formattedEvent);
    toast({
      title: "Success",
      description: JSON.stringify(formattedEvent, null, 2),
    });
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
