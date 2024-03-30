import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shorten } from "@/lib/utils";
import { type PostWithData } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function PostCard({ post }: { post: PostWithData }) {
  return (
    <Card key={post.id} className="border-muted">
      <CardHeader className="p-0">
        <Link
          href={`/posts/${post.slug}`}
          className="hover:none border-b-8"
          style={{
            borderColor: post.tags[0]?.color ?? "primary",
          }}
        >
          <Image
            src={post.imageUrl ?? "/images/Abstract-4.jpg"}
            alt={post.name}
            width={300}
            height={200}
            className="aspect-video w-full rounded-t-lg object-cover hover:brightness-90"
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5 flex flex-col gap-3">
        <CardTitle className="text-xl font-semibold text-primary underline">
          <Link href={`/posts/${post.slug}`}>{post.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <time>{format(post.createdAt, "PPP")}</time>
        </CardDescription>
        {post.description && (
          <p className="text-muted-foreground">
            {shorten(post.description, 30)}
          </p>
        )}
        <Button className="mr-auto">
          <Link href={`/posts/${post.slug}`}>Read more</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
