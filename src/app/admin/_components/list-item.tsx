"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, shorten } from "@/lib/utils";
import { type EventWithData, type PostWithData } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

export default function ListItem({
  listItem,
}: {
  listItem: EventWithData | PostWithData;
}) {
  // Build class names for card background color
  let cardBgColor = "bg-primary/30";
  if (!listItem.published) cardBgColor = "bg-card/50";
  if (listItem.date < new Date()) cardBgColor = "bg-background";

  return (
    <li key={listItem.id}>
      <Card className={cn(cardBgColor, "h-full")}>
        <CardHeader className="p-3">
          <CardTitle className="text-md hover:underline">
            <Link href={`/admin/events/${listItem.id}`}>
              {listItem.name}
              {!listItem.published && " (unpublished)"}
              {listItem.date < new Date() && " (past)"}
            </Link>
          </CardTitle>
          <time className="font-serif text-sm font-semibold text-muted-foreground">
            {format(listItem.date, "PPPP")}
          </time>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary hover:underline">
            <Link href={`/admin/categories/${listItem.category?.id}`}>
              {listItem.category?.name}
            </Link>
          </h2>
          <ul className="flex flex-wrap gap-1">
            {listItem.tags.map((tag) => (
              <li key={tag.id}>
                <Link href={`/admin/tags/${tag.id}`}>
                  <Badge style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-sm">{shorten(listItem.description, 30)}</p>
        </CardContent>
        <CardFooter className="p-3">
          <p className="text-sm text-muted-foreground">{listItem.slug}</p>
        </CardFooter>
      </Card>
    </li>
  );
}