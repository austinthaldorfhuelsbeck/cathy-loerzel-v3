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

      <main className="mx-auto flex max-w-6xl flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {!postDrafts && !eventDrafts && <Skeleton className="h-56" />}
        {postDrafts && eventDrafts && (
          <section className="h-full md:col-span-2 lg:col-span-3">
            <DraftsTable postDrafts={postDrafts} eventDrafts={eventDrafts} />
          </section>
        )}
        <Skeleton className="h-56 min-w-56" />
        <Skeleton className="h-56 min-w-56" />
        <Skeleton className="h-56 min-w-56" />
        <Skeleton className="h-56 min-w-56" />
        <Skeleton className="h-56 min-w-56" />
      </main>
    </>
  );
}
