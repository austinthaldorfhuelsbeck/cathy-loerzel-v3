import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import Link from "next/link";
import EventsList from "./_components/events-list";

export default async function AdminEventsPage() {
  // Fetch all events
  const events = await api.events.getAll();

  // Fetch all categories and tags
  const categories = await api.categories.getAllEventCategories();
  const tags = await api.tags.getAllEventTags();

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/admin/events/new">
          <Button>Create Event</Button>
        </Link>
      </header>

      {<EventsList events={events as EventWithData[]} />}
    </>
  );
}
