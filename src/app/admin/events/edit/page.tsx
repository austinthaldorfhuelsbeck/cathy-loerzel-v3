import { api } from "@/trpc/server";
import { EventForm } from "../event-form";

export default async function EditEventPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Fetch event by id
  const event = await api.events.getById({
    id: parseInt(searchParams.id as string),
  });

  if (!event) return null;
  return <EventForm event={event} />;
}
