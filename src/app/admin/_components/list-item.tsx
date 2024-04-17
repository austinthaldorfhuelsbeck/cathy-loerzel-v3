"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, pluralize, shorten } from "@/lib/utils";
import { type EventWithData, type PostWithData } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

export function ListItem({
  listItem,
  type,
}: {
  listItem: EventWithData | PostWithData;
  type: "event" | "post";
}) {
  // Build class names for card background color
  let cardBgColor = "bg-primary/30";
  if (!listItem.published) cardBgColor = "bg-card/50";
  if (listItem.date < new Date()) cardBgColor = "bg-background";

  const editLink = `/admin/${pluralize(type)}/edit?id=${listItem.id}`;
  const categoryLink = `/admin/categories/edit?id=${listItem.category?.id}`;
  const slugLink = `/${pluralize(type)}/${listItem.slug}`;

  return (
    <li>
      <Card className={cn(cardBgColor, "h-full")}>
        <CardHeader className="p-3">
          <CardTitle className="text-md hover:underline">
            <Link href={editLink}>
              {listItem.name}
              {!listItem.published && " (unpublished)"}
            </Link>
          </CardTitle>
          <time className="font-serif text-sm font-semibold text-muted-foreground">
            {format(listItem.date, "PPPP")}
          </time>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary hover:underline">
            <Link href={categoryLink}>{listItem.category?.name}</Link>
          </h2>
          <ul className="flex flex-wrap gap-1">
            {listItem.tags.map((tag) => (
              <li key={tag.id}>
                <Link href={`/admin/tags/edit?id=${tag.id}`}>
                  <Badge style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
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
