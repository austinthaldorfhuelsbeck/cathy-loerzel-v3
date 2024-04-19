import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type PostWithData } from "@/types";
import { type Post } from "@prisma/client";
import CategoryCards from "../_components/category-cards";
import FeaturedPostBanner from "../_components/featured-post-banner";
import TagCards from "../_components/tag-cards";
import PostCard from "./post-card";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { category, tag } = searchParams;

  // Fetch post categories
  const postCategories = await api.categories.getAllPostCategories();
  // Get current category from params
  const postCategory = postCategories.find(
    (postCategory) => postCategory.slug === category,
  );

  // Fetch posts
  let posts: Post[] | undefined = undefined;
  if (category) {
    posts = await api.posts.getByCategory({ category: category as string });
  } else if (tag) {
    posts = await api.posts.getByTag({ tag: tag as string });
  } else {
    posts = await api.posts.getAll();
  }
  // Get featured
  const featuredPost = await api.posts.getFeatured();

  // Fetch post tags
  const postTags = await api.tags.getAllPostTags();
  // Get current tag from params
  const postTag = postTags.find((postTag) => postTag.slug === tag);

  return (
    <>
      {/* Navigation */}
      <CategoryCards categories={postCategories} />
      {/* Header */}
      <header className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-3xl font-semibold text-muted-foreground">
          {postCategory?.name ?? postTag?.name ?? "All Posts"}
        </h1>
        <p className="text-center text-xl text-muted-foreground">
          {postCategory?.description ??
            postTag?.description ??
            "The blog is a collection of stories, reflections, and resources that explore the intersection of faith, mental health, and culture."}
        </p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/posts`}>Posts</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/posts?category=${category.toString()}`}
                  >
                    {postCategory?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {tag && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/posts?tag=${tag.toString()}`}>
                    {postTag?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main content */}
      <section className="align-stretch flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {/* Posts */}
        {!posts && (
          <>
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
            <Skeleton className="aspect-video w-full rounded-t-lg object-cover sm:aspect-square" />
          </>
        )}
        {posts?.map((post) => (
          <PostCard key={post.id} post={post as PostWithData} />
        ))}
      </section>

      {featuredPost && <FeaturedPostBanner post={featuredPost} />}

      <TagCards tags={postTags} type="post" />
    </>
  );
}
