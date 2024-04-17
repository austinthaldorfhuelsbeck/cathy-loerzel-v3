"use client";

import { Button } from "@/components/ui/button";
import { adminNavigationItems } from "@/lib/consts";
import { useClerk } from "@clerk/clerk-react";
import { LogOutIcon } from "lucide-react";
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

      <Button
        variant="secondary"
        className="flex items-center justify-center gap-1 rounded-none bg-destructive p-2 text-destructive-foreground"
        onClick={() => signOut(() => router.push("/"))}
      >
        <LogOutIcon size={16} />
        Sign Out
      </Button>
    </nav>
  );
}
