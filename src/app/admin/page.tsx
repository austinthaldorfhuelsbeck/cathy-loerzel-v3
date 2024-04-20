import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { api } from "@/trpc/server";
import { type PostWithData } from "@/types";
import type { Post } from "@prisma/client";
import FeaturedPostBanner from "../_components/featured-post-banner";
import { LoadingPage } from "../_components/loading";
import { FeaturedPostCombobox } from "./featured-post-combobox";
import { columns } from "./tags-manager-columns";

function FeaturedPostManager({ posts }: { posts: Post[] }) {
  const featuredPost = posts.find((post) => post.featured);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Post Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <FeaturedPostCombobox posts={posts} />
        {featuredPost && <FeaturedPostBanner post={featuredPost} />}
      </CardContent>
    </Card>
  );
}

function TagsManager({ posts }: { posts: PostWithData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={posts} />
      </CardContent>
    </Card>
  );
}

export default async function AdminPage() {
  const posts = await api.posts.getAll();

  if (!posts) return <LoadingPage />;
  return (
    <>
      <FeaturedPostManager posts={posts} />
      <TagsManager posts={posts} />
    </>
  );
}
