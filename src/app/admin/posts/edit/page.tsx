import { api } from "@/trpc/server";
import { PostForm } from "../post-form";

export default async function EditPostPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Fetch post by id
  const post = await api.posts.getById({
    id: parseInt(searchParams.id as string),
  });

  if (!post) return null;
  return <PostForm post={post} />;
}
