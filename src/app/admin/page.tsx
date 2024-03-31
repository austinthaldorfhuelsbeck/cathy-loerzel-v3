"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "../_components/loading";
import { DraftsTable } from "./_components/drafts-table";

export default function AdminPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch all drafts
  const postsDraftsQuery = api.posts.getDrafts.useQuery();
  const eventsDraftsQuery = api.events.getDrafts.useQuery();
  const postDrafts = postsDraftsQuery.data;
  const eventDrafts = eventsDraftsQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      <main>
        {!postDrafts && !eventDrafts && <Skeleton className="h-56" />}
        {postDrafts && eventDrafts && (
          <DraftsTable postDrafts={postDrafts} eventDrafts={eventDrafts} />
        )}
      </main>
    </>
  );
}
