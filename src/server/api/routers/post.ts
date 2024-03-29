import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          category: {
            slug: input.category,
          },
        },
      });
    }),

  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
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
    }),

  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      where: {
        featured: true,
      },
    });
  }),
});
