import CategoryCards from "@/app/_components/category-cards";
import { CategoriesSkeleton } from "@/app/_components/sub-footer";
import SubscriptionForm from "@/app/_components/subscription-form";
import TagCards from "@/app/_components/tag-cards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function EventPage({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const { slug } = params;

  // Fetch event categories and tags
  const eventCategories = await api.categories.getAllEventCategories();
  const eventTags = await api.tags.getAllEventTags();

  // Fetch event by slug
  const event = await api.events.getBySlug({ slug: slug as string });

  return (
    <>
      <header className="flex flex-col gap-3">
        {!eventCategories && <CategoriesSkeleton />}
        <CategoryCards categories={eventCategories} />

        {!event && <Skeleton className="h-96 w-full" />}

        {event && (
          <Card className="flex flex-col rounded-none border-0 border-b-8 bg-background shadow-none md:flex-row">
            <div className="flex-1">
              {/* Tag Links */}
              <div className="flex gap-3">
                {event.tags.map((tag) => (
                  <Link href={`/events?tag=${tag.slug}`} key={tag.id}>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </Button>
                  </Link>
                ))}
              </div>

              <CardHeader className="flex h-full flex-col justify-center p-3 pb-10">
                <CardTitle>{event.name}</CardTitle>
                <p className="text-muted-foreground">
                  {event.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {event.location}
                </p>
              </CardHeader>
            </div>

            <div className="flex-1">
              <Image
                src={event.imageUrl ?? "/images/Abstract-2.jpg"}
                alt={event.name}
                width={1920}
                height={1080}
                className="my-2 aspect-video border-primary object-cover object-right-top md:rounded-r md:border-l-4"
              />
            </div>
          </Card>
        )}

        <Breadcrumb className="mx-auto text-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/events">Events</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/events/${event?.slug}`}>
                {event?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="border-none bg-background shadow-none">
        {event?.content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}
      </main>

      <TagCards tags={eventTags} type="event" />
      <SubscriptionForm />
    </>
  );
}
