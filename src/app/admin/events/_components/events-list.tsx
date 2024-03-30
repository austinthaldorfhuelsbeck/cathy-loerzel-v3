"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, shorten } from "@/lib/utils";
import { type EventWithData } from "@/types";
import { format } from "date-fns";
import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  BookDashedIcon,
  ListFilterIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function EventsListItem({ event }: { event: EventWithData }) {
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

export default function EventsList({ events }: { events: EventWithData[] }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc" as const);
  const [showUnpublished, setShowUnpublished] = useState(true);

  const onToggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const onToggleShowUnpublished = () => {
    setShowUnpublished((prevShowUnpublished) => !prevShowUnpublished);
  };

  useEffect(() => {
    const filtered = events.filter((event) => {
      if (!showUnpublished && !event.published) return false;
      return true;
    });

    setFilteredEvents(
      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.date < b.date ? 1 : -1;
        } else {
          return a.date > b.date ? 1 : -1;
        }
      }),
    );
  }, [events, showUnpublished, sortOrder]);

  return (
    <main>
      <Card className="mb-5 flex w-full items-center justify-between gap-3 px-2 py-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <ListFilterIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filter events</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <aside className="space-x-1">
          <TooltipProvider>
            <Tooltip>
              <Toggle
                aria-label="Toggle sort order"
                onClick={onToggleShowUnpublished}
                className="hover:bg-primary/10"
              >
                <TooltipTrigger asChild>
                  <BookDashedIcon className="h-4 w-4" />
                </TooltipTrigger>
              </Toggle>
              <TooltipContent>
                {showUnpublished ? "Hide unpublished" : "Show unpublished"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={onToggleSortOrder}>
                  {sortOrder === "asc" && (
                    <ArrowDownWideNarrowIcon className="h-4 w-4" />
                  )}
                  {sortOrder === "desc" && (
                    <ArrowUpNarrowWideIcon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {sortOrder === "asc" ? "Sort by newest" : "Sort by oldest"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </aside>
      </Card>

      <ul className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredEvents.map((event) => (
          <EventsListItem event={event} key={event.id} />
        ))}
      </ul>
    </main>
  );
}