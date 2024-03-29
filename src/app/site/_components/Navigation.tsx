"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

export default function Navigation() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  // const { eventCategories, postCategories } = props;

  return (
    <div className="sticky top-0 z-10 flex flex-col justify-start bg-white p-4 shadow sm:flex-row">
      <aside className="flex justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width="200"
            height="42"
            priority
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

      {/* <NavigationMenu
        className={cn(
          isDisplayed ? "inline-block" : "hidden sm:inline-block",
          "sm:ml-auto",
        )}
      >
        <NavigationMenuList>
          <NavigationMenuItem className="hidden lg:inline-block">
            <Link href="/redeeming-heartache">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Redeeming Heartache
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
    </div>
  );
}
