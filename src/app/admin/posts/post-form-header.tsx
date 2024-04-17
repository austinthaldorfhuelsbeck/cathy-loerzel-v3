"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { BackToAll } from "../back-to-all";

export function PostFormHeader({
  post,
  handleDeletePost,
}: {
  post?: { id: number; slug: string } | null;
  handleDeletePost: (id: number) => void;
}) {
  return (
    <header className="sticky right-2 top-10 z-10 flex items-center gap-3 border-b bg-background/80 pb-1 sm:col-span-2 lg:col-span-3">
      <aside className="flex flex-1 flex-col items-start justify-center gap-3">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <BackToAll type="post" />
      </aside>

      <aside className="flex flex-1 items-center justify-end gap-3">
        <Button type="submit">Save</Button>

        <Button variant="outline" onClick={(e) => e.preventDefault()}>
          Preview
        </Button>

        <Button variant="outline" onClick={(e) => e.preventDefault()}>
          Publish
        </Button>

        {post && (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <EllipsisVerticalIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/posts/${post.slug}`} target="_blank" passHref>
                  <DropdownMenuItem className="cursor-pointer">
                    <ExternalLinkIcon className="mr-2 h-6 w-6" />
                    <span>View on site</span>
                  </DropdownMenuItem>
                </Link>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <TrashIcon className="mr-2 h-6 w-6" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="font-sans">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  post.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </aside>
    </header>
  );
}
