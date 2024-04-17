"use client";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { BackToAll } from "../../back-to-all";
import DashboardPageHeader from "../../dashboard-page-header";
import { CategoryForm } from "../_components/category-form";

export default function EditCategoryPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch category by id
  const categoryQuery = api.categories.getById.useQuery({
    id: Number(searchParams.id as string),
  });
  const category = categoryQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <div className="space-y-5">
      <DashboardPageHeader type="category" title="Edit Category" />
      <BackToAll type="category" />
      {category && <CategoryForm category={category} />}
    </div>
  );
}
