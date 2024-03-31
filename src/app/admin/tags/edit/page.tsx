"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../_components/back-to-all";
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
      <h1 className="text-2xl font-bold">Edit Tag</h1>
      <BackToAll type="tag" />
      {tag && <TagForm tag={tag} />}
    </div>
  );
}
