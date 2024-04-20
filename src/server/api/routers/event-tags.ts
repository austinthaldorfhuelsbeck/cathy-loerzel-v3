import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventTagsRouter = createTRPCRouter({
  addTag: publicProcedure
    .input(z.object({ eventId: z.number(), tagId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventTag.create({
        data: {
          eventId: input.eventId,
          tagId: input.tagId,
        },
      });
    }),

  removeTag: publicProcedure
    .input(z.object({ eventId: z.number(), tagId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventTag.delete({
        where: {
          eventId_tagId: {
            eventId: input.eventId,
            tagId: input.tagId,
          },
        },
      });
    }),
});
