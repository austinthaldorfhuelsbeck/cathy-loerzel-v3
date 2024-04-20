"use client";

import { Button } from "@/components/ui/button";
import { adminNavigationItems } from "@/lib/constants";
import { useClerk } from "@clerk/clerk-react";
import { ExternalLinkIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 flex justify-between bg-secondary font-sans text-sm font-semibold tracking-wide text-secondary-foreground shadow">
      <ul className="flex items-center">
        {adminNavigationItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <li className="px-4 py-2 hover:bg-primary hover:underline">
              {item.title}
            </li>
          </Link>
        ))}
      </ul>

      <aside className="flex gap-5">
        <Link href="/" target="_blank">
          <Button
            variant="link"
            className="flex items-center gap-1 text-background"
          >
            <ExternalLinkIcon size={16} />
            <span>View Site</span>
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-1 rounded-none bg-destructive p-2 text-destructive-foreground"
          onClick={() => signOut(() => router.push("/"))}
        >
          <LogOutIcon size={16} />
          <span>Sign Out</span>
        </Button>
      </aside>
    </nav>
  );
}
