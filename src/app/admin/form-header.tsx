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
import { Toggle } from "@/components/ui/toggle";
import { toast } from "@/components/ui/use-toast";
import { pluralize } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Category, Event, Post } from "@prisma/client";
import {
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { BackToAll } from "./back-to-all";

export function FormHeader({
  item,
  togglePreview,
  type,
}: {
  item?: Post | Event | Category | null;
  togglePreview: () => void;
  type: "post" | "event" | "category";
}) {
  const router = useRouter();

  const [isPublished, setIsPublished] = useState(item?.published ?? false);
  function togglePublished() {
    setIsPublished((prev) => !prev);
  }

  // Determine which API endpoint to use for publishing/unpublishing
  const togglePublishedPostMutation = api.posts.togglePublished.useMutation({
    onSuccess: () => {
      togglePublished();
      toast({
        title: `Post ${isPublished ? "unpublished" : "published"}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const togglePublishedEventMutation = api.events.togglePublished.useMutation({
    onSuccess: () => {
      togglePublished();
      toast({
        title: `Event ${isPublished ? "unpublished" : "published"}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const togglePublishedCategoryMutation =
    api.categories.togglePublished.useMutation({
      onSuccess: () => {
        togglePublished();
        toast({
          title: `Category ${isPublished ? "unpublished" : "published"}`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  const togglePublishedTagMutation = api.tags.togglePublished.useMutation({
    onSuccess: () => {
      togglePublished();
      toast({
        title: `Tag ${isPublished ? "unpublished" : "published"}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  function onTogglePublished(id: number) {
    switch (type) {
      case "post":
        togglePublishedPostMutation.mutate({ id });
        break;
      case "event":
        togglePublishedEventMutation.mutate({ id });
        break;
      case "category":
        togglePublishedCategoryMutation.mutate({ id });
        break;
    }
  }

  // Determine which API endpoint to use for deletion
  const deletePostMutation = api.posts.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const deleteEventMutation = api.events.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/events");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const deleteCategoryMutation = api.categories.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/categories");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const deleteTagMutation = api.tags.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/tags");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  function onDelete(id: number) {
    switch (type) {
      case "post":
        deletePostMutation.mutate({ id });
        break;
      case "event":
        deleteEventMutation.mutate({ id });
        break;
      case "category":
        deleteCategoryMutation.mutate({ id });
        break;
      case "tag":
        deleteTagMutation.mutate({ id });
        break;
    }
  }

  // Determine which item href to use for previewing
  const itemHref =
    type === "post" || type === "event"
      ? `/${pluralize(type)}/${item?.slug}`
      : `/${pluralize(
          ((item as Category)?.type ?? "POST").toLowerCase(),
        )}?${type}=${item?.slug}`;

  return (
    <header className="sticky right-2 top-10 z-10 flex items-center gap-3 border-b bg-background/80 pb-1 sm:col-span-2 lg:col-span-3">
      <aside className="flex flex-1 flex-col items-start justify-center gap-3">
        <h1 className="text-2xl font-bold">
          {item ? `Edit ${type}` : `Create ${type}`}
        </h1>
        <BackToAll type={type} />
      </aside>

      <aside className="flex flex-1 items-center justify-end gap-3">
        <Button type="submit">Save</Button>

        <Toggle
          variant="outline"
          aria-label="Toggle preview mode"
          type="button"
          onClick={() => {
            togglePreview();
          }}
        >
          Preview
        </Toggle>

        <Button
          variant="outline"
          aria-label="Toggle publish status"
          disabled={!item}
          onClick={(e) => {
            e.preventDefault();
            onTogglePublished(item!.id);
          }}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>

        {item && (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <EllipsisVerticalIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={itemHref} target="_blank" passHref>
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
                  {`This action cannot be undone. This will permanently delete the
                  ${type}.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={() => onDelete(item.id)}>
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
