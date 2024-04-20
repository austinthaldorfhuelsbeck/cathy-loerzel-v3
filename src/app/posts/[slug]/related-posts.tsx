import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { type PostWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function RelatedPosts({
  relatedPosts,
}: {
  relatedPosts: PostWithData[];
}) {
  return (
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
  );
}
