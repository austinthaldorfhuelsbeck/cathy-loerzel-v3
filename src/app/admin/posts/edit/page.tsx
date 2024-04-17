"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import DashboardPageHeader from "../../dashboard-page-header";
import { PostForm } from "../post-form";

export default function EditPostPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch post by id
  const postQuery = api.posts.getById.useQuery({
    id: Number(searchParams.id as string),
  });
  const post = postQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <DashboardPageHeader type="post" title="Edit Post" />
      <BackToAll type="post" />
      {post && <PostForm post={post} />}
    </div>
  );
}
