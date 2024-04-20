import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/server";
import { type PostWithData } from "@/types";
import type { Post } from "@prisma/client";
import { NotebookPenIcon, PlusIcon, TagsIcon } from "lucide-react";
import FeaturedPostBanner from "../_components/featured-post-banner";
import { LoadingPage } from "../_components/loading";
import { FeaturedPostCombobox } from "./featured-post-combobox";
import { NewTagForm } from "./new-tag-form";
import { columns } from "./tags-manager-columns";

function FeaturedPostManager({ posts }: { posts: Post[] }) {
  const featuredPost = posts.find((post) => post.featured);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <NotebookPenIcon width={24} height={24} />
          <span>Featured Post Manager</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FeaturedPostCombobox posts={posts} />
        <section className="font-serif">
          {featuredPost && <FeaturedPostBanner post={featuredPost} />}
        </section>
      </CardContent>
    </Card>
  );
}

function TagsManager({ posts }: { posts: PostWithData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TagsIcon width={24} height={24} />
          <span>Tags Manager</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 sm:mr-auto">
              <PlusIcon width={16} height={16} />
              <span>New tag</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="font-sans">
            <DialogHeader>
              <DialogTitle>Create a new tag</DialogTitle>
            </DialogHeader>
            <NewTagForm />
          </DialogContent>
        </Dialog>
        <CardTitle>Posts</CardTitle>
        <DataTable columns={columns} data={posts} />
        <CardTitle>Events</CardTitle>
        <p>Coming soon...</p>
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
