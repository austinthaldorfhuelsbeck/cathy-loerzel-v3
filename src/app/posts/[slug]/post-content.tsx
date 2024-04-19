import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { timeToRead } from "@/lib/utils";
import { type PostWithData } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export function PostContent({ post }: { post: Partial<PostWithData> }) {
  return (
    <>
      <Card className="flex flex-col rounded-none border-0 border-b-8 bg-background shadow-none md:flex-row">
        <div className="flex-1">
          {/* Tag Links */}
          <div className="flex gap-3">
            {post.tags?.map((tag) => (
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
            {post.createdAt && <time>{format(post.createdAt, "PPP")}</time>}
            <p className="font-bold">
              {post.category?.slug === "writing" &&
                post.content &&
                `Reading Time: ${timeToRead(post.content)} min`}
            </p>
          </CardHeader>
        </div>

        {/* Image */}
        <Link href={post.href ?? "#"} className="flex-1">
          <Image
            src={post.imageUrl ?? "/images/headshot-banner.jpg"}
            alt={post.name ?? "This post"}
            width={1920}
            height={1080}
            className="my-2 aspect-video border-primary object-cover object-right-top md:rounded-r md:border-l-4"
          />
        </Link>
      </Card>

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
                <BreadcrumbLink href={`/posts?category=${post.category.slug}`}>
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

      {post?.audioUrl && (
        <div>
          <audio
            src={post.audioUrl}
            controls
            className="h-16 w-full bg-background"
          />
        </div>
      )}

      <div className="border-none bg-background shadow-none">
        {post?.content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
    </>
  );
}
