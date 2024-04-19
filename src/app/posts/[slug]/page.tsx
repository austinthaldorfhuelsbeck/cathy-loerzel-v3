import CategoryCards from "@/app/_components/category-cards";
import FeaturedPostBanner from "@/app/_components/featured-post-banner";
import { CategoriesSkeleton } from "@/app/_components/sub-footer";
import TagCards from "@/app/_components/tag-cards";
import NewsletterForm from "@/app/home/_components/custom-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { PostContent } from "./post-content";

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

  return (
    <>
      <header className="flex flex-col gap-3">
        {!postCategories && <CategoriesSkeleton />}
        <CategoryCards categories={postCategories} />

        {!post && <Skeleton className="h-96 w-full" />}
      </header>

      {post && <PostContent post={post} />}

      {relatedPosts?.length ? (
        <section className="flex flex-col gap-4 p-4">
          <h2 className="text-3xl">Related Posts</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts?.map((post) => (
              <Card key={post.id}>
                <Link href={`/posts/${post.slug}`}>
                  <Image
                    src={post.imageUrl ?? "/images/headshot-banner.jpg"}
                    alt={post.name}
                    width={1920}
                    height={1080}
                    className="aspect-video rounded-t-lg border-b-8 border-primary object-cover"
                    style={{
                      borderColor: post.tags[0]?.color ?? "primary",
                    }}
                  />
                </Link>
                <CardHeader>
                  <Link href={`/posts/${post.slug}`}>
                    <CardTitle className="decoration-primary hover:underline">
                      {post.name}
                    </CardTitle>
                  </Link>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}

      {!featuredPost && <Skeleton className="h-96 w-full" />}
      {featuredPost && <FeaturedPostBanner post={featuredPost} />}

      <TagCards tags={postTags} type="post" />
      <NewsletterForm />
    </>
  );
}
