import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getEventTags: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany({
      where: {
        eventTags: {
          some: {
            event: {
              published: true,
            },
          },
        },
      },
    });
  }),
  getPostTags: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany({
      where: {
        postTags: {
          some: {
            post: {
              published: true,
            },
          },
        },
      },
    });
  }),
});
