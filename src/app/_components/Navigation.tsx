import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import NavigationItems from "./navigation-items";

export default async function Navigation() {
  // Fetch all categories
  const postCategories = await api.categories.getAllPostCategories();
  const eventCategories = await api.categories.getAllEventCategories();

  // Construct navigation items
  const postItems: { title: string; href: string; description?: string }[] =
    postCategories.map((category) => ({
      title: category.name,
      href: `/posts?category=${category.slug}`,
      description: category.subtitle ?? undefined,
    }));
  const eventItems: { title: string; href: string; description?: string }[] =
    eventCategories.map((category) => ({
      title: category.name,
      href: `/events?category=${category.slug}`,
      description: category.subtitle ?? undefined,
    }));
  const items = [
    { title: "Events", items: eventItems },
    { title: "Resources", items: postItems },
  ];

  return (
    <div className="sticky top-0 z-10 flex flex-col items-center justify-center gap-5 bg-white p-4 shadow sm:flex-row">
      <aside>
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width="200"
            height="42"
            priority
          />
        </Link>
      </aside>
      <NavigationItems items={items} />
    </div>
  );
}
