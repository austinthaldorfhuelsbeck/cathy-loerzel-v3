import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shorten } from "@/lib/utils";
import { type Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import abstract from "../../../../public/images/Abstract-4.jpg";

const PostCard = (props: { post: Post }) => {
  const { post } = props;

  return (
    <Card key={post.id} className="border-muted">
      <CardHeader className="p-0">
        <Link href={`/posts/${post.slug}`} className="hover:none">
          <Image
            src={post.imageUrl ?? abstract}
            alt={post.name}
            width={300}
            height={200}
            className="aspect-video w-full rounded-t-lg object-cover hover:brightness-90"
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5 flex flex-col gap-3">
        <CardTitle className="text-lg font-semibold text-primary underline">
          <Link href={`/posts/${post.slug}`}>{post.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <time>
            {post.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
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
