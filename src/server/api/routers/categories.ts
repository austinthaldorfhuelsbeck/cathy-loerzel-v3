import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getEventCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "EVENT",
      },
    });
  }),
  getPostCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        type: "POST",
      },
    });
  }),
});
