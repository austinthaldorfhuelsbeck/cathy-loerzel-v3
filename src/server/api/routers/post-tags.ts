import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postTagsRouter = createTRPCRouter({
  addTag: publicProcedure
    .input(z.object({ postId: z.number(), tagId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postTag.create({
        data: {
          postId: input.postId,
          tagId: input.tagId,
        },
      });
    }),

  removeTag: publicProcedure
    .input(z.object({ postId: z.number(), tagId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postTag.delete({
        where: {
          postId_tagId: {
            postId: input.postId,
            tagId: input.tagId,
          },
        },
      });
    }),
});
