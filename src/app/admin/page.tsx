import { api } from "@/trpc/server";
import { LoadingPage } from "../_components/loading";
import { TagsManager } from "./tags-manager";

export default async function AdminPage() {
  const tags = await api.tags.getAll();

  if (!tags) return <LoadingPage />;
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col">
      <TagsManager tags={tags} />
    </div>
  );
}
