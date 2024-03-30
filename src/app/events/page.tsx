import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import type { Event } from "@prisma/client";
import Link from "next/link";
import CategoryCards from "../_components/category-cards";
import TagCards from "../_components/tag-cards";

function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.slug}`} passHref>
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
        </CardContent>
        <CardFooter>
          <p>
            {event.date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { category, tag } = searchParams;

  // Fetch event categories
  const eventCategories = await api.category.getAllEventCategories();
  // Get current category from params
  const eventCategory = eventCategories.find(
    (eventCategory) => eventCategory.slug === category,
  );

  // Fetch events
  let events: Event[] | undefined = undefined;
  if (category) {
    events = await api.events.getByCategory({ category: category as string });
  } else if (tag) {
    events = await api.events.getByTag({ tag: tag as string });
  } else {
    events = await api.events.getAll();
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
            "Check out our upcoming events!"}
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
      <section className="mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
        {events ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <Skeleton className="h-96 w-full" />
        )}
      </section>
      {/* Tags */}
      <TagCards tags={eventTags} />
    </>
  );
}
