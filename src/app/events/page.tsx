import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import type { Event } from "@prisma/client";
import CategoryCards from "../_components/category-cards";
import TagCards from "../_components/tag-cards";
import EventCard from "./_components/event-card";

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
      <header className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-3xl font-semibold text-muted-foreground">
          {eventCategory?.name ?? eventTag?.name ?? "All Events"}
        </h1>
        <p className="text-center text-xl text-muted-foreground">
          {eventCategory?.description ??
            eventTag?.description ??
            "Catch Cathy at a speaking engagement near you, join a virtual event, or attend an intensive or retreat."}
        </p>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/events`}>Events</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/events?category=${category.toString()}`}
                  >
                    {eventCategory?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {tag && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/events?tag=${tag.toString()}`}>
                    {eventTag?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </header>

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
