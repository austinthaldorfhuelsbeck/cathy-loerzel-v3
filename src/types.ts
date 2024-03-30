import type { Category, Event, Post, Tag } from "@prisma/client";

export interface PostWithData extends Post {
  category: Category;
  tags: Tag[];
}

export interface EventWithData extends Event {
  category: Category;
  tags: Tag[];
}
