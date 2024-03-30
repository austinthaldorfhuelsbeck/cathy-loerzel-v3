import type { Category, Post, Tag } from "@prisma/client";

export interface PostWithData extends Post {
  category: Category;
  tags: Tag[];
}
