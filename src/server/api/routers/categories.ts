import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getAllEventCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "EVENT",
      },
      orderBy: {
        name: "asc",
      },
    });
  }),

  getAllPostCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "POST",
      },
      orderBy: {
        name: "asc",
      },
    });
  }),

  getCategoryBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.category.findFirst({
        where: {
          slug: input.slug,
        },
      });
    }),
});
