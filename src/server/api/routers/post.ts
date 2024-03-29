import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),

  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      where: {
        featured: true,
      },
    });
  }),
});
