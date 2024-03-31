"use client";
import { useUser } from "@clerk/nextjs";

import { LoadingPage } from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type EventWithData } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventsListItem from "../_components/dashboard-grid";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type Category, type Tag } from "@prisma/client";
import {
  AlarmClockIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  BetweenHorizontalStartIcon,
  BookDashedIcon,
  BookMarkedIcon,
  CheckCircleIcon,
  HistoryIcon,
  ListFilterIcon,
  TagIcon,
  XCircleIcon,
} from "lucide-react";

export default function AdminEventsPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  const [filteredEvents, setFilteredEvents] = useState<EventWithData[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc" as const);
  const [showOnlyPublished, setShowOnlyPublished] = useState(false);
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  // Fetch all events
  const eventsQuery = api.events.getAll.useQuery();
  const events = eventsQuery.data;

  // Fetch all eventCategories and eventTags
  const eventCategoriesQuery = api.categories.getAllEventCategories.useQuery();
  const eventCategories = eventCategoriesQuery.data;
  const eventTagsQuery = api.tags.getAllEventTags.useQuery();
  const eventTags = eventTagsQuery.data;

  // Handlers
  const onToggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const onToggleShowOnlyPublished = () => {
    setShowOnlyPublished((prevShowOnlyUnpublished) => !prevShowOnlyUnpublished);
  };

  const onToggleShowOnlyUpcoming = () => {
    setShowOnlyUpcoming((prevShowOnlyUpcoming) => !prevShowOnlyUpcoming);
  };

  const onCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (events && eventCategories && eventTags) {
      setFilteredEvents(events);
    }
  }, [events, eventCategories, eventTags]);

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/admin/events/new">
          <Button>Create Event</Button>
        </Link>
      </header>

      {events && eventCategories && eventTags && (
        <section className="flex flex-col">
          <Card className="mb-5 flex w-full items-center justify-between gap-3 px-2 py-1">
            <aside className="flex items-center gap-1">
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <DropdownMenuTrigger asChild>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
                          <ListFilterIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <TooltipContent>Filter events</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <BetweenHorizontalStartIcon className="h-4 w-4" />
                        <span>Filter by category</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {eventCategories.map((category) => (
                            <DropdownMenuItem
                              key={category.id}
                              onClick={() => onCategorySelect(category)}
                              className={cn(
                                selectedCategory === category
                                  ? "bg-accent text-accent-foreground"
                                  : "",
                                "flex items-center justify-between",
                              )}
                            >
                              {category.name}
                              <CheckCircleIcon
                                className={cn(
                                  selectedCategory === category ? "" : "hidden",
                                  "h-3 w-3 text-accent-foreground",
                                )}
                              />
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <TagIcon className="h-4 w-4" />
                        <span>Filter by tag</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {eventTags.map((tag) => (
                            <DropdownMenuItem
                              key={tag.id}
                              onClick={() => setSelectedTag(tag)}
                              className={cn(
                                selectedTag === tag
                                  ? "bg-accent text-accent-foreground"
                                  : "",
                                "flex items-center justify-between",
                              )}
                            >
                              {tag.name}
                              <CheckCircleIcon
                                className={cn(
                                  selectedTag == tag ? "" : "hidden",
                                  "h-3 w-3 text-accent-foreground",
                                )}
                              />
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>

              <Input
                placeholder="Search event titles and descriptions"
                className="w-48 text-sm sm:w-64 md:w-80 lg:w-96 xl:w-96 2xl:w-96"
                aria-label="Search events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {(selectedCategory ?? selectedTag ?? searchQuery) && (
                <TooltipProvider>
                  <Tooltip>
                    <Toggle
                      aria-label="Clear filters"
                      className="hover:bg-primary/10"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedTag(null);
                        setSearchQuery("");
                      }}
                    >
                      <TooltipTrigger asChild>
                        <XCircleIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>Clear filters</TooltipContent>
                    </Toggle>
                  </Tooltip>
                </TooltipProvider>
              )}
            </aside>

            <aside className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <Toggle
                    aria-label="Toggle show only upcoming"
                    onClick={onToggleShowOnlyUpcoming}
                    className="hover:bg-primary/10"
                  >
                    <TooltipTrigger asChild>
                      {showOnlyUpcoming ? (
                        <AlarmClockIcon className="h-4 w-4" />
                      ) : (
                        <HistoryIcon className="h-4 w-4" />
                      )}
                    </TooltipTrigger>
                  </Toggle>
                  <TooltipContent>
                    {!showOnlyUpcoming
                      ? "Show only upcoming"
                      : "Show past events"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <Toggle
                    aria-label="Toggle show only published"
                    onClick={onToggleShowOnlyPublished}
                    className="hover:bg-primary/10"
                  >
                    <TooltipTrigger asChild>
                      {showOnlyPublished ? (
                        <BookMarkedIcon className="h-4 w-4" />
                      ) : (
                        <BookDashedIcon className="h-4 w-4" />
                      )}
                    </TooltipTrigger>
                  </Toggle>
                  <TooltipContent>
                    {!showOnlyPublished
                      ? "Show only published"
                      : "Show unpublished"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={onToggleSortOrder}>
                      {
                        {
                          desc: <ArrowDownWideNarrowIcon className="h-4 w-4" />,
                          asc: <ArrowUpNarrowWideIcon className="h-4 w-4" />,
                        }[sortOrder]
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {sortOrder === "asc" ? "Sort by newest" : "Sort by oldest"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </aside>
          </Card>

          <div className="flex gap-2">
            {selectedCategory && (
              <Badge>{`Showing events in category: ${selectedCategory.name}`}</Badge>
            )}
            {selectedTag && (
              <Badge
                style={{
                  backgroundColor: selectedTag.color,
                }}
              >{`Showing events with tag: ${selectedTag.name}`}</Badge>
            )}
          </div>
        </section>
      )}

      {events && eventCategories && eventTags && (
        <ul className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredEvents.map((event) => (
            <EventsListItem listItem={event} key={event.id} />
          ))}
        </ul>
      )}
    </>
  );
}
