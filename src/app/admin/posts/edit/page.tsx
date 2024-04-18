"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
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
  return post && <PostForm post={post} />;
}
