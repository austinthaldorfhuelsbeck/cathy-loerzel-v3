import { PrismaClient } from "@prisma/client";
import { eventCategories, events, postCategories, posts, tags } from "./data";
const prisma = new PrismaClient();

async function deleteExisting(prisma: PrismaClient) {
  await prisma.postTag.deleteMany();
  await prisma.eventTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.event.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  console.log("Existing data has been deleted.");
}

async function createCategories(prisma: PrismaClient) {
  // Create event categories in the new database
  for (const category of eventCategories) {
    await prisma.category.upsert({
      where: { slug: category.name.toLowerCase() },
      update: {},
      create: {
        ...category,
        type: "EVENT",
      },
    });
  }

  // Create post categories in the new database
  for (const category of postCategories) {
    await prisma.category.upsert({
      where: { slug: category.name.toLowerCase() },
      update: {},
      create: {
        ...category,
        type: "POST",
      },
    });
  }

  console.log("Categories have been seeded.");
}

async function createTags(prisma: PrismaClient) {
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log("Tags have been seeded.");
}

async function createPosts(prisma: PrismaClient) {
  // Fetch created categories and tags
  const categories = await prisma.category.findMany();

  // Create posts
  for (const post of posts) {
    const category = categories.find((c) => c.slug === post.category);
    await prisma.post.create({
      data: {
        name: post.name,
        slug: post.slug,
        date: post.date,
        imageUrl: post.imageUrl,
        audioUrl: post.audioUrl,
        description: post.description,
        href: post.href,
        published: post.published,
        featured: post.featured,
        content: post.content,
        category: {
          connect: {
            id: category?.id,
          },
        },
      },
    });
  }

  console.log("Posts have been seeded.");
}

async function createPostTags(prisma: PrismaClient) {
  const createdTags = await prisma.tag.findMany();
  const createdPosts = await prisma.post.findMany();

  for (const post of posts) {
    const createdPost = createdPosts.find((p) => p.slug === post.slug);
    if (!createdPost) {
      console.error(`Post ${post.slug} not found`);
      continue;
    }

    for (const tag of post.tags) {
      const createdTag = createdTags.find((t) => t.slug === tag);
      if (!createdTag) {
        console.error(`Tag ${tag} not found`);
        continue;
      }

      await prisma.postTag.create({
        data: {
          post: {
            connect: {
              id: createdPost.id,
            },
          },
          tag: {
            connect: {
              id: createdTag.id,
            },
          },
        },
      });
    }
  }
  console.log("Post tags have been seeded.");
}

async function createEvents(prisma: PrismaClient) {
  // Fetch created categories and tags
  const categories = await prisma.category.findMany();

  // Create events
  for (const event of events) {
    const category = categories.find((c) => c.slug === event.category);
    await prisma.event.create({
      data: {
        name: event.name,
        slug: event.slug,
        date: event.date,
        location: event.location,
        href: event.href,
        published: event.published,
        content: event.content,
        category: {
          connect: {
            id: category?.id,
          },
        },
      },
    });
  }

  console.log("Events have been seeded.");
}

async function main() {
  // Delete existing data
  await deleteExisting(prisma);

  // Create data
  await createCategories(prisma);
  await createTags(prisma);
  await createPosts(prisma);
  await createPostTags(prisma);
  await createEvents(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
