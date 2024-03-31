import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

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

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.tag.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        color: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.tag.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        color: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.tag.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
