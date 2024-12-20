import { postRouter } from "@/server/api/routers/posts";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/categories";
import { eventTagsRouter } from "./routers/event-tags";
import { eventRouter } from "./routers/events";
import { postTagsRouter } from "./routers/post-tags";
import { tagRouter } from "./routers/tags";
import { contactRouter } from "./routers/contact";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postRouter,
  events: eventRouter,
  categories: categoryRouter,
  tags: tagRouter,
  postTags: postTagsRouter,
  eventTags: eventTagsRouter,
  contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
