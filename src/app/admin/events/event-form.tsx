"use client";

import { EventContent } from "@/app/events/[slug]/event-content";
import { Form } from "@/components/ui/form";
import { type Event } from "@prisma/client";
import "react-quill/dist/quill.snow.css";
import { FormHeader } from "../form-header";
import { EventFormContent } from "./event-form-content";
import { useEventForm } from "./use-event-form";

export function EventForm({ event }: { event?: Event }) {
  const { form, onSubmit, showPreview, togglePreview } = useEventForm({
    event,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
