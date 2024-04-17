"use client";

import { LoadingPage } from "@/app/_components/loading";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">New Post</h1>
      <BackToAll type="post" />
      <PostForm />
    </div>
  );
}
