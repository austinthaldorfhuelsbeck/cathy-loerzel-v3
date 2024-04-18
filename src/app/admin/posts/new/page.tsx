"use client";

import { LoadingPage } from "@/app/_components/loading";
import { useUser } from "@clerk/nextjs";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return <PostForm />;
}
