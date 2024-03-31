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

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.category.findFirst({
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
        type: z.enum(["EVENT", "POST"]),
        subtitle: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.category.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        type: z.enum(["EVENT", "POST"]),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
