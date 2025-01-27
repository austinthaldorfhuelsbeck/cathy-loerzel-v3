import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import Image from "next/image";

const discoverLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact" },
  { name: "Redeeming Heartache", href: "/redeeming-heartache" },
];

const storyWorkLinks = [
  { name: "Coaching", href: "/coaching" },
  { name: "Intensives", href: "/intensives" },
  { name: "Sacred Interruption", href: "/sacred-interruption" },
];

export default async function Footer() {
  const postCategories = await api.categories.getAllPostCategories();
  const eventCategories = await api.categories.getAllEventCategories();
  const postCategoryLinks = postCategories.map((category) => ({
    name: category.name,
    href: `/posts?category=${category.slug}`,
  }));
  const eventCategoryLinks = eventCategories.map((category) => ({
    name: category.name,
    href: `/events?category=${category.slug}`,
  }));

  return (
    <footer className="w-full bg-secondary p-4 text-secondary-foreground">
      <div className="flex items-center justify-between">
        <a href="/" className="hidden sm:inline-block">
          <Image
            src="/logo.png"
            alt="logo"
            width={192}
            height={192}
            className="h-auto w-48 object-cover mix-blend-screen"
          />
        </a>
        <div className="grid grid-cols-2 gap-5 sm:flex sm:flex-row">
          <div className="mt-auto flex flex-col gap-2">
            <h2 className="text-xl font-bold">Discover</h2>
            <ul className="flex flex-col">
              {discoverLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <h2 className="text-xl font-bold">Story Work</h2>
            <ul className="flex flex-col">
              {storyWorkLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <a href="/posts">
              <h2 className="text-xl font-bold">Posts</h2>
            </a>
            <ul className="flex flex-col">
              {postCategoryLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <a href="/events">
              <h2 className="text-xl font-bold">Events</h2>
            </a>
            <ul className="flex flex-col">
              {eventCategoryLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <p className="text-xs tracking-wide text-border">
        © {new Date().getFullYear()} Cathy Loerzel. All rights reserved.
      </p>
    </footer>
  );
}
