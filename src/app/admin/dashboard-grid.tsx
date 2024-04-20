"use client";

import { type EventWithData, type PostWithData } from "@/types";
import { type Category } from "@prisma/client";
import { ListItem } from "./list-item";
import { ListItemCompact } from "./list-item-compact";

export default function DashboardGrid({
  items,
  type,
}: {
  items: (EventWithData | PostWithData | Category)[];
  type: "event" | "post" | "category";
}) {
  return (
    items && (
      <ul className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) =>
          type === "category" ? (
            <ListItemCompact
              key={item.id}
              listItem={item as Category}
              type={type}
            />
          ) : (
            <ListItem
              key={item.id}
              listItem={item as EventWithData | PostWithData}
              type={type}
            />
          ),
        )}
      </ul>
    )
  );
}
