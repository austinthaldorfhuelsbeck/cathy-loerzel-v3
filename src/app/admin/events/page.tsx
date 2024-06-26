"use client";

import { useUser } from "@clerk/nextjs";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { type EventWithData } from "@/types";

import { useFilter } from "../_hooks/useFilter";
import { DashboardBadges } from "../dashboard-badges";
import { DashboardFilter } from "../dashboard-filter";
import DashboardGrid from "../dashboard-grid";
import DashboardPageHeader from "../dashboard-page-header";
import { FilterBarSkeleton, GridSkeleton } from "../dashboard-skeletons";

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

      {(!events || !eventCategories || !eventTags) && <FilterBarSkeleton />}
      {events && eventCategories && eventTags && (
        <DashboardFilter
          type="event"
          categories={eventCategories}
          tags={eventTags}
          filterProvider={filterProvider}
        />
      )}

      <DashboardBadges type="event" filterProvider={filterProvider} />

      {!events && <GridSkeleton />}
      {events && (
        <DashboardGrid type="event" items={filterProvider.filteredItems} />
      )}
    </>
  );
}
