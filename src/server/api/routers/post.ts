import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { type Post } from "@prisma/client";
import { z } from "zod";

const addDataToPost = async (post: Post) => {
  const category = await db.category.findUnique({
    where: {
      id: post.categoryId,
    },
  });
  const tags = await db.tag.findMany({
    where: {
      postTags: {
        some: {
          postId: post.id,
        },
      },
    },
  });

  return {
    ...post,
    category,
    tags,
  };
};

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany();

    if (!posts) return [];

    return Promise.all(posts.map(addDataToPost));
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          category: {
            slug: input.category,
          },
        },
      });

      if (!posts) return [];

      return Promise.all(posts.map(addDataToPost));
    }),

  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          tags: {
            some: {
              tag: {
                slug: input.tag,
              },
            },
          },
        },
      });

      if (!posts) return [];

      return Promise.all(posts.map(addDataToPost));
    }),

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      where: {
        featured: true,
      },
    });

    if (!post) return null;

    return addDataToPost(post);
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          slug: input.slug,
        },
      });

      if (!post) return null;

      return addDataToPost(post);
    }),
});
