"use client";
import { useUser } from "@clerk/nextjs";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { type EventWithData } from "@/types";

import { DashboardBadges } from "../_components/dashboard-badges";
import { DashboardFilter } from "../_components/dashboard-filter";
import DashboardGrid from "../_components/dashboard-grid";
import DashboardPageHeader from "../_components/dashboard-page-header";
import { useFilter } from "../_hooks/useFilter";

export default function AdminEventsPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch all events
  const eventsQuery = api.events.getAll.useQuery();
  const events = eventsQuery.data;

  // Fetch all eventCategories and eventTags
  const eventCategoriesQuery = api.categories.getAllEventCategories.useQuery();
  const eventCategories = eventCategoriesQuery.data;
  const eventTagsQuery = api.tags.getAllEventTags.useQuery();
  const eventTags = eventTagsQuery.data;

  // Call useFilter hook
  const filterProvider = useFilter(events as EventWithData[]);

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <DashboardPageHeader type="event" />

      {events && eventCategories && eventTags && (
        <section className="flex flex-col">
          <DashboardFilter
            type="event"
            categories={eventCategories}
            tags={eventTags}
            filterProvider={filterProvider}
          />
          <DashboardBadges filterProvider={filterProvider} />
        </section>
      )}

      {events && <DashboardGrid items={filterProvider.filteredItems} />}
    </>
  );
}
