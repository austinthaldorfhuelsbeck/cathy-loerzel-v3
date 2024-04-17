"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import DashboardPageHeader from "../../dashboard-page-header";
import { EventForm } from "../event-form";

export default function EditEventPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch event by id
  const eventQuery = api.events.getById.useQuery({
    id: Number(searchParams.id as string),
  });
  const event = eventQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <DashboardPageHeader type="event" title="Edit Event" />
      <BackToAll type="event" />
      {event && <EventForm event={event} />}
    </div>
  );
}
