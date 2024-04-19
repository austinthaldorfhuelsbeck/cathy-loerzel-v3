"use client";

import { type z } from "zod";

import { EventContent } from "@/app/events/[slug]/event-content";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { type Event } from "@prisma/client";
import Image from "next/image";
import { type UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormHeader } from "../form-header";
import { EventFormBasicInformation } from "./event-form-basic-information";
import { EventFormDetails } from "./event-form-details";
import { useEventForm, type eventFormSchema } from "./use-event-form";

function EventFormContent({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventFormSchema>>;
}) {
  return (
    <>
      <EventFormBasicInformation form={form} />
      <EventFormDetails form={form} />

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
                    toast({
                      title: "Error",
                      description: error.message,
                      variant: "destructive",
                    });
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
                <ReactQuill
                  placeholder="Type your content here..."
                  theme="snow"
                  value={field.value}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

export function EventForm({ event }: { event?: Event }) {
  const { form, onSubmit, showPreview, togglePreview } = useEventForm({
    event,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <FormHeader item={event} type="event" togglePreview={togglePreview} />
        {showPreview ? (
          <div className="col-span-3 flex flex-col gap-3 font-serif">
            <EventContent
              event={{
                ...form.watch(),
                categoryId: Number(form.watch("categoryId")),
              }}
            />
          </div>
        ) : (
          <EventFormContent form={form} />
        )}
      </form>
    </Form>
  );
}
