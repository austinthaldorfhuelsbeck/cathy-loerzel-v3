"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import DashboardGrid from "../_components/dashboard-grid";
import DashboardPageHeader from "../_components/dashboard-page-header";
import { GridSkeleton } from "../_components/dashboard-skeletons";

export default function TagsPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch all tags
  const tagsQuery = api.tags.getAll.useQuery();
  const tags = tagsQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <DashboardPageHeader type="tag" />
      {!tags && <GridSkeleton />}
      {tags && <DashboardGrid type="tag" items={tags} />}
    </>
  );
}
