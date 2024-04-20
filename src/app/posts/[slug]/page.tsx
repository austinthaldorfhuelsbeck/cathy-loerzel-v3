import CategoryCards from "@/app/_components/category-cards";
import FeaturedPostBanner from "@/app/_components/featured-post-banner";
import { CategoriesSkeleton } from "@/app/_components/sub-footer";
import TagCards from "@/app/_components/tag-cards";
import NewsletterForm from "@/app/home/_components/custom-form";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { PostContent } from "./post-content";
import { RelatedPosts } from "./related-posts";

export default async function PostPage({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const { slug } = params;

  // Fetch post categories and tags
  const postCategories = await api.categories.getAllPostCategories();
  const postTags = await api.tags.getAllPostTags();

  // Fetch post by slug
  const post = await api.posts.getBySlug({ slug: slug as string });

  // Fetch related posts
  const relatedPosts = await api.posts.getRecommended({
    postId: post?.id ?? 0,
  });

  // Fetch featured post
  const featuredPost = await api.posts.getFeatured();

  if (!post?.published) return redirect("/not-found");
  return (
    <>
      <header className="flex flex-col gap-3">
        {!postCategories && <CategoriesSkeleton />}
        <CategoryCards categories={postCategories} />

        {!post && <Skeleton className="h-96 w-full" />}
      </header>

      {post && <PostContent post={post} />}

      {relatedPosts?.length && <RelatedPosts relatedPosts={relatedPosts} />}

      {!featuredPost && <Skeleton className="h-96 w-full" />}
      {featuredPost && <FeaturedPostBanner post={featuredPost} />}

      <TagCards tags={postTags} type="post" />
      <NewsletterForm />
    </>
  );
}
