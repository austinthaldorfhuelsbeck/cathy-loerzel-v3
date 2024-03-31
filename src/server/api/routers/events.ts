import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { type Event } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

async function addDataToEvent(event: Event) {
  const category = await db.category.findUnique({
    where: {
      id: event.categoryId,
    },
  });
  const tags = await db.tag.findMany({
    where: {
      eventTags: {
        some: {
          eventId: event.id,
        },
      },
    },
  });

  if (!category) throw new TRPCError({ code: "NOT_FOUND" });

  return {
    ...event,
    category,
    tags,
  };
}

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    if (!events) return [];

    return Promise.all(events.map(addDataToEvent));
  }),

  getDrafts: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      where: {
        published: false,
      },
    });

    if (!events) return [];

    return events;
  }),

  getUpcomingPublished: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        published: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    if (!events) return [];

    return Promise.all(events.map(addDataToEvent));
  }),

  getUpcomingPublishedByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const events = await ctx.db.event.findMany({
        where: {
          category: {
            slug: input.category,
          },
          date: {
            gte: new Date(),
          },
          published: true,
        },
        orderBy: {
          date: "asc",
        },
      });

      if (!events) return [];

      return Promise.all(events.map(addDataToEvent));
    }),

  getUpcomingPublishedByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ ctx, input }) => {
      const events = await ctx.db.event.findMany({
        where: {
          tags: {
            some: {
              tag: {
                slug: input.tag,
              },
            },
          },
          date: {
            gte: new Date(),
          },
          published: true,
        },
        orderBy: {
          date: "asc",
        },
      });

      if (!events) return [];

      return Promise.all(events.map(addDataToEvent));
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          slug: input.slug,
        },
      });

      if (!event) return null;

      return addDataToEvent(event);
    }),
});
