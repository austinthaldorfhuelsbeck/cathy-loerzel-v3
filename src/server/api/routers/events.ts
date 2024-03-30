import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany();
  }),
  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findMany({
        where: {
          category: {
            slug: input.category,
          },
        },
      });
    }),
  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findMany({
        where: {
          tags: {
            some: {
              slug: input.tag,
            },
          },
        },
      });
    }),
});
