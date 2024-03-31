import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),

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
      orderBy: {
        name: "asc",
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
      orderBy: {
        name: "asc",
      },
    });
  }),
});
