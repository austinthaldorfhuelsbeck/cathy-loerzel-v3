"use client";

import { LoadingPage } from "@/app/_components/loading";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../_components/back-to-all";
import { TagForm } from "../_components/tag-form";

export default function NewTagPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">New Tag</h1>
      <BackToAll type="tag" />
      <TagForm />
    </div>
  );
}
