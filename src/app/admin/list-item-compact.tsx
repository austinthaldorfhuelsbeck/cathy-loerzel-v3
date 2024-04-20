"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pluralize, shorten } from "@/lib/utils";
import { type Category, type Tag } from "@prisma/client";
import Link from "next/link";

export function ListItemCompact({
  listItem,
  type,
}: {
  type: "category" | "tag";
  listItem: Category | Tag;
}) {
  const editLink = `/admin/${pluralize(type)}/edit?id=${listItem.id}`;

  const slugLink =
    type === "category"
      ? `/${pluralize((listItem as Category).type.toLocaleLowerCase())}?category=${listItem.slug}`
      : `/posts?tag=${listItem.slug}`;

  return (
    <li>
      <Card className={"h-full bg-card/50"}>
        <CardHeader className="p-3">
          <CardTitle className="text-md hover:underline">
            <Link href={editLink}>{listItem.name}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-sm">{shorten(listItem.description ?? "", 30)}</p>
        </CardContent>
        <CardFooter className="p-3">
          <Link href={slugLink} target="_blank">
            <p className="text-sm text-muted-foreground">{listItem.slug}</p>
          </Link>
        </CardFooter>
      </Card>
    </li>
  );
}
