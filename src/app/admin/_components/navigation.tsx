import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminNavigationItems } from "@/lib/consts";
import { SignOutButton } from "@clerk/nextjs";
import { LogOutIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-10 flex flex-col bg-white text-muted-foreground shadow">
      <nav className="flex items-center justify-center gap-3 p-3">
        <aside className="flex w-full items-center gap-3 rounded-lg border-2 pr-3">
          <Input
            placeholder="Search..."
            className="rounded-r-none border-none"
          />
          <SearchIcon size={24} />
        </aside>

        <TooltipProvider>
          <Tooltip>
            <SignOutButton>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <LogOutIcon size={24} />
                </Button>
              </TooltipTrigger>
            </SignOutButton>
            <TooltipContent>Sign out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="bg-secondary font-sans text-sm font-semibold tracking-wide text-secondary-foreground">
        <ul className="flex items-center">
          {adminNavigationItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <li className="px-4 py-2 hover:bg-primary hover:underline">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
