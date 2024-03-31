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
import { type EventWithData } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

export default function EventsListItem({ event }: { event: EventWithData }) {
  // Build class names for card background color
  let cardBgColor = "bg-primary/30";
  if (!event.published) cardBgColor = "bg-card/50";
  if (event.date < new Date()) cardBgColor = "bg-background";

  return (
    <li key={event.id}>
      <Card className={cn(cardBgColor, "h-full")}>
        <CardHeader className="p-3">
          <CardTitle className="text-md hover:underline">
            <Link href={`/admin/events/${event.id}`}>
              {event.name}
              {!event.published && " (unpublished)"}
              {event.date < new Date() && " (past)"}
            </Link>
          </CardTitle>
          <time className="font-serif text-sm font-semibold text-muted-foreground">
            {format(event.date, "PPPP")}
          </time>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary hover:underline">
            <Link href={`/admin/categories/${event.category?.id}`}>
              {event.category?.name}
            </Link>
          </h2>
          <ul className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
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
          <p className="text-sm">{shorten(event.description, 30)}</p>
        </CardContent>
        <CardFooter className="p-3">
          <p className="text-sm text-muted-foreground">{event.slug}</p>
        </CardFooter>
      </Card>
    </li>
  );
}