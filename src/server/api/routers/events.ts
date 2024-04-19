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

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!event) return null;

      return event;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        date: z.date(),
        location: z.string(),
        categoryId: z.number(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.event.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        date: z.date(),
        location: z.string(),
        categoryId: z.number(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.event.delete({
        where: {
          id: input.id,
        },
      });
    }),

  togglePublished: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!event)
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });

      return ctx.db.event.update({
        where: {
          id: event.id,
        },
        data: {
          published: !event.published,
        },
      });
    }),
});
