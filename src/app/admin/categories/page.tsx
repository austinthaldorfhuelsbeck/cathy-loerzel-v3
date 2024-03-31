"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import DashboardGrid from "../_components/dashboard-grid";
import DashboardPageHeader from "../_components/dashboard-page-header";
import { GridSkeleton } from "../_components/dashboard-skeletons";

export default function CategoriesPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch all categories
  const eventCategoriesQuery = api.categories.getAllEventCategories.useQuery();
  const eventCategories = eventCategoriesQuery.data;
  const postCategoriesQuery = api.categories.getAllPostCategories.useQuery();
  const postCategories = postCategoriesQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <DashboardPageHeader type="category" />

      <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
        Event Categories
      </h2>
      {!eventCategories && <GridSkeleton />}
      {eventCategories && (
        <DashboardGrid type="category" items={eventCategories} />
      )}

      <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
        Post Categories
      </h2>
      {!postCategories && <GridSkeleton />}
      {postCategories && (
        <DashboardGrid type="category" items={postCategories} />
      )}
    </>
  );
}
