import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getAllEventCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "EVENT",
      },
    });
  }),
  getAllPostCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "POST",
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
