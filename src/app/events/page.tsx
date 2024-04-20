import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import type { Event } from "@prisma/client";
import { CategoryCards } from "../_components/category-cards";
import TagCards from "../_components/tag-cards";
import EventCard from "./event-card";
import { EventsPageHeader } from "./events-page-header";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { category, tag } = searchParams;

  // Fetch event categories
  const eventCategories = await api.categories.getAllEventCategories();
  // Get current category from params
  const eventCategory = eventCategories.find(
    (eventCategory) => eventCategory.slug === category,
  );

  // Fetch events
  let events: Event[] | undefined = undefined;
  if (category) {
    events = await api.events.getUpcomingPublishedByCategory({
      category: category as string,
    });
  } else if (tag) {
    events = await api.events.getUpcomingPublishedByTag({ tag: tag as string });
  } else {
    events = await api.events.getUpcomingPublished();
  }

  // Fetch event tags
  const eventTags = await api.tags.getAllEventTags();
  // Get current tag from params
  const eventTag = eventTags.find((eventTag) => eventTag.slug === tag);

  return (
    <>
      {/* Navigation */}
      <CategoryCards categories={eventCategories} />
      {/* Header */}
      <EventsPageHeader
        eventCategory={eventCategory}
        eventTag={eventTag}
        category={category as string}
        tag={tag as string}
      />

      {/* Events */}
      <section className="flex flex-col gap-5">
        {events ? (
          events.map((event) => (
            <EventCard key={event.id} event={event as EventWithData} />
          ))
        ) : (
          <Skeleton className="h-96 w-full" />
        )}
      </section>

      {/* Tags */}
      <TagCards tags={eventTags} type="event" />
    </>
  );
}
