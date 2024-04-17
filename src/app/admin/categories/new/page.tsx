"use client";

import { LoadingPage } from "@/app/_components/loading";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import { CategoryForm } from "../_components/category-form";

export default function NewCategoryPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">New Category</h1>
      <BackToAll type="category" />
      <CategoryForm />
    </div>
  );
}
