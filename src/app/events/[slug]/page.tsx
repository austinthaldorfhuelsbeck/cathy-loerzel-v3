import CategoryCards from "@/app/_components/category-cards";
import { CategoriesSkeleton } from "@/app/_components/sub-footer";
import TagCards from "@/app/_components/tag-cards";
import NewsletterForm from "@/app/home/_components/custom-form";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { EventContent } from "./event-content";

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

  if (!event?.published) return redirect("/not-found");
  return (
    <>
      <header className="flex flex-col gap-3">
        {!eventCategories && <CategoriesSkeleton />}
        <CategoryCards categories={eventCategories} />

        {!event && <Skeleton className="h-96 w-full" />}
      </header>

      {event && <EventContent event={event} />}

      <TagCards tags={eventTags} type="event" />
      <NewsletterForm />
    </>
  );
}
