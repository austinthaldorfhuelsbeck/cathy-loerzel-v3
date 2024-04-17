"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import DashboardPageHeader from "../../dashboard-page-header";
import { TagForm } from "../_components/tag-form";

export default function EditTagPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch tag by id
  const tagQuery = api.tags.getById.useQuery({
    id: Number(searchParams.id as string),
  });
  const tag = tagQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <DashboardPageHeader type="tag" title="Edit Tag" />
      <BackToAll type="tag" />
      {tag && <TagForm tag={tag} />}
    </div>
  );
}
