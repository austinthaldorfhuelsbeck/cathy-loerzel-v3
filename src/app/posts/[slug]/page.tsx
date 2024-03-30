import CategoryCards from "@/app/_components/category-cards";
import { CategoriesSkeleton } from "@/app/_components/sub-footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { timeToRead } from "@/lib/utils";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const { slug } = params;

  // Fetch post categories
  const postCategories = await api.category.getAllPostCategories();

  // Fetch post by slug
  const post = await api.post.getBySlug({ slug: slug as string });

  return (
    <>
      <header className="flex flex-col gap-3">
        {!postCategories && <CategoriesSkeleton />}
        <CategoryCards categories={postCategories} />

        {!post && <Skeleton className="h-96 w-full" />}

        {post && (
          <Card className="flex flex-col rounded-none border-0 border-b-8 bg-background shadow-none md:flex-row">
            <div className="flex-1">
              {/* Tag Links */}
              <div className="flex gap-3">
                {post.tags.map((tag) => (
                  <Link href={`/posts?tag=${tag.slug}`} key={tag.id}>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Header content */}
              <CardHeader className="flex h-full flex-col justify-center p-3 pb-10">
                <CardTitle className="text-4xl">{post.name}</CardTitle>
                <time>
                  {post.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="font-bold">
                  {post.category?.slug === "writing" &&
                    `Reading Time: ${timeToRead(post.content)} min`}
                </p>
              </CardHeader>
            </div>

            {/* Image */}
            <Link href={post.href ?? "#"} className="flex-1">
              <Image
                src={post.imageUrl ?? "/images/headshot-banner.jpg"}
                alt={post.name}
                width={1920}
                height={1080}
                className="my-2 aspect-video border-primary object-cover object-right-top md:rounded-r md:border-l-4"
              />
            </Link>
          </Card>
        )}

        <Breadcrumb className="mx-auto text-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/posts`}>Posts</BreadcrumbLink>
            </BreadcrumbItem>
            {post?.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/posts?category=${post.category.slug}`}
                  >
                    {post.category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                {post?.name ?? "This post"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="border-none bg-background shadow-none">
        {post && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
    </>
  );
}
