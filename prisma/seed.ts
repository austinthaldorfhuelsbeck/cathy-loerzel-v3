import { PrismaClient, Type } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Event categories from the old database
  const eventCategories = [
    { label: "Retreats", text: "Embodied spiritual healing" },
    { label: "Conferences", text: "Opportunities to hear from Cathy" },
    { label: "Coaching", text: "Story Work and leadership coaching sessions" },
  ];

  // Post categories from the old database
  const postCategories = [
    { label: "Writing", text: "Blog posts and more..." },
    { label: "Podcasts", text: "Features and guest appearances" },
    { label: "Teaching", text: "Recorded lectures and teaching" },
  ];

  // Create event categories in the new database
  for (const category of eventCategories) {
    await prisma.category.upsert({
      where: { slug: category.label.toLowerCase() },
      update: {},
      create: {
        name: category.label,
        slug: category.label.toLowerCase(),
        description: category.text,
        type: Type.EVENT,
      },
    });
  }

  // Create post categories in the new database
  for (const category of postCategories) {
    await prisma.category.upsert({
      where: { slug: category.label.toLowerCase() },
      update: {},
      create: {
        name: category.label,
        slug: category.label.toLowerCase(),
        description: category.text,
        type: Type.POST,
      },
    });
  }

  console.log("Categories have been seeded.");
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
