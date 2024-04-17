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

  getRecommended: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: {
          id: input.postId,
        },
      });

      if (!post) return [];

      const postWithData = await addDataToPost(post);

      const posts = await ctx.db.post.findMany({
        where: {
          OR: [
            { id: postWithData.categoryId },
            {
              tags: {
                some: {
                  tagId: {
                    in: postWithData.tags.map((tag) => tag.id),
                  },
                },
              },
            },
          ],

          NOT: {
            id: post.id,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!posts) return [];

      return Promise.all(posts.slice(0, 6).map(addDataToPost));
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

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!post) return null;

      return post;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        categoryId: z.number(),
        description: z.string(),
        imageUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        href: z.string().optional(),
        published: z.boolean(),
        featured: z.boolean(),
        content: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        categoryId: z.number(),
        description: z.string(),
        imageUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        href: z.string().optional(),
        featured: z.boolean(),
        content: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
