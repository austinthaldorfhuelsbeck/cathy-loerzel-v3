import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAllEventTags: publicProcedure.query(({ ctx }) => {
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
  getAllPostTags: publicProcedure.query(({ ctx }) => {
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
