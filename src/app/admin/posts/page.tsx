"use client";

import { useUser } from "@clerk/nextjs";

import { LoadingPage } from "@/app/_components/loading";
import { api } from "@/trpc/react";

import { type PostWithData } from "@/types";
import { DashboardBadges } from "../_components/dashboard-badges";
import { DashboardFilter } from "../_components/dashboard-filter";
import DashboardGrid from "../_components/dashboard-grid";
import DashboardPageHeader from "../_components/dashboard-page-header";
import {
  FilterBarSkeleton,
  GridSkeleton,
} from "../_components/dashboard-skeletons";
import { useFilter } from "../_hooks/useFilter";

export default function AdminPostsPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  // Fetch all posts
  const postsQuery = api.posts.getAll.useQuery();
  const posts = postsQuery.data;

  // Fetch all postCategories and postTags
  const postCategoriesQuery = api.categories.getAllPostCategories.useQuery();
  const postCategories = postCategoriesQuery.data;
  const postTagsQuery = api.tags.getAllPostTags.useQuery();
  const postTags = postTagsQuery.data;

  // Call useFilter hook
  const filterProvider = useFilter(posts as PostWithData[]);

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <DashboardPageHeader type="post" />

      {(!posts || !postCategories || !postTags) && <FilterBarSkeleton />}
      {posts && postCategories && postTags && (
        <DashboardFilter
          type="post"
          categories={postCategories}
          tags={postTags}
          filterProvider={filterProvider}
        />
      )}

      <DashboardBadges type="post" filterProvider={filterProvider} />

      {!posts && <GridSkeleton />}
      {posts && (
        <DashboardGrid type="post" items={filterProvider.filteredItems} />
      )}
    </>
  );
}
