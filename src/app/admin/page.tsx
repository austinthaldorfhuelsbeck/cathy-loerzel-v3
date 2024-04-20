import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import type { Post } from "@prisma/client";
import FeaturedPostBanner from "../_components/featured-post-banner";
import { LoadingPage } from "../_components/loading";
import { FeaturedPostCombobox } from "./featured-post-combobox";

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

export default async function AdminPage() {
  const posts = await api.posts.getAll();

  if (!posts) return <LoadingPage />;
  return (
    <>
      <FeaturedPostManager posts={posts} />
    </>
  );
}
