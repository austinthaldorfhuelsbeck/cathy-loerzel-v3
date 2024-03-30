import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import CategoryCards from "./category-cards";
import FeaturedPostBanner from "./featured-post-banner";
import TagCards from "./tag-cards";

export function CategoriesSkeleton() {
  return (
    <div className="flex h-24 w-full gap-5 md:h-36">
      <Skeleton className="w-36 md:w-72" />
      <Skeleton className="w-36 md:w-72" />
      <Skeleton className="w-36 md:w-72" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="flex w-full items-center justify-center gap-5 md:h-36">
      <Skeleton className="h-24 w-24 rounded-full lg:h-32 lg:w-32" />
      <Skeleton className="h-24 w-24 rounded-full lg:h-32 lg:w-32" />
      <Skeleton className="h-24 w-24 rounded-full lg:h-32 lg:w-32" />
      <Skeleton className="h-24 w-24 rounded-full lg:h-32 lg:w-32" />
      <Skeleton className="hidden h-24 w-24 rounded-full sm:inline-block lg:h-32 lg:w-32" />
    </div>
  );
}

export default async function SubFooter(props: { title?: string }) {
  const featuredPost = await api.posts.getFeatured();
  const postCategories = await api.categories.getAllPostCategories();
  const postTags = await api.tags.getAllPostTags();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 lg:max-w-4xl">
      <h1 className="px-5 text-4xl font-semibold text-muted-foreground sm:px-0">
        {props.title ?? "Blog"}
      </h1>
      {!featuredPost && <Skeleton className="h-48" />}
      {featuredPost && <FeaturedPostBanner post={featuredPost} />}
      {!postCategories && <CategoriesSkeleton />}
      <CategoryCards categories={postCategories} />
      {!postTags && <TagsSkeleton />}
      <h2 className="px-5 text-2xl font-semibold text-muted-foreground sm:px-0">
        Topics
      </h2>
      <TagCards tags={postTags} type="post" />
    </div>
  );
}
