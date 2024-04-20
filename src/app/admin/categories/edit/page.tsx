import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/server";
import { CategoryForm } from "../category-form";

export default async function EditCategoryPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Fetch category by id
  const category = await api.categories.getById({
    id: Number(searchParams.id as string),
  });

  if (!category) return <LoadingPage />;
  return <CategoryForm category={category} />;
}
