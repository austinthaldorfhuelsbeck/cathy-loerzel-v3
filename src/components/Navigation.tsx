import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const eventCategories = [
  {
    event_category_id: 1,
    label: "Conferences",
    text: "Join us for a conference.",
  },
  {
    event_category_id: 2,
    label: "Workshops",
    text: "Participate in a workshop.",
  },
  {
    event_category_id: 3,
    label: "Training",
    text: "Learn more about training.",
  },
];

const postCategories = [
  {
    post_category_id: 1,
    label: "Blog",
    text: "Read our blog.",
  },
  {
    post_category_id: 2,
    label: "Podcast",
    text: "Listen to our podcast.",
  },
  {
    post_category_id: 3,
    label: "Video",
    text: "Watch our videos.",
  },
];

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

const Navigation = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  // const { eventCategories, postCategories } = props;

  return (
    <div className="sticky top-0 z-10 flex flex-col justify-start bg-white p-4 shadow sm:flex-row">
      {
        <aside className="flex justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={24}
              height={24}
              className="w-48 object-cover"
            />
          </Link>
          <Button
            variant="outline"
            className="inline-block sm:hidden"
            onClick={() => setIsDisplayed(!isDisplayed)}
          >
            {isDisplayed ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>
        </aside>
      }

      <NavigationMenu
        className={cn(
          isDisplayed ? "inline-block" : "hidden sm:inline-block",
          "sm:ml-auto",
        )}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Story Work</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-[350px] flex-col gap-2">
                {eventCategories.map((category) => (
                  <ListItem
                    key={category.event_category_id}
                    title={category.label}
                    href={`/events?category=${category.event_category_id}`}
                  >
                    {category.text}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-[400px] flex-col gap-2">
                {postCategories.map((category) => (
                  <ListItem
                    key={category.post_category_id}
                    title={category.label}
                    href={`/posts?category=${category.post_category_id}`}
                  >
                    {category.text}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden lg:inline-block">
            <a href="/redeeming-heartache">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Redeeming Heartache
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <a href="/contact">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
