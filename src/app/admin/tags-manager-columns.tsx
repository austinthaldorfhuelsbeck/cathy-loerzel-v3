"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import type { Tag } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewTagForm } from "./new-tag-form";

export type PostWithTags = {
  id: number;
  name: string;
  tags: Tag[];
};

function ExistingTags({ post }: { post: PostWithTags }) {
  const router = useRouter();
  const removeTagMutation = api.postTags.removeTag.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Tag removed",
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
  return (
    <div className="flex flex-wrap gap-1">
      {post.tags.map((tag) => (
        <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
          {tag.name}
          <CircleXIcon
            className="ml-1 h-4 w-4 cursor-pointer"
            onClick={() => {
              removeTagMutation.mutate({
                postId: post.id,
                tagId: tag.id,
              });
            }}
          />
        </Badge>
      ))}
    </div>
  );
}

function AddTag({ post }: { post: PostWithTags }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();

  const { data: tags, isLoading: tagsLoading } = api.tags.getAll.useQuery();
  const addTagMutation = api.postTags.addTag.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Tag added",
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

  useEffect(() => {
    if (!selectedTag) return;
    addTagMutation.mutate({
      postId: post.id,
      tagId: selectedTag.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.name, selectedTag]);

  if (tagsLoading) return <Skeleton className="h-6 w-24" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto justify-start p-1">
          Add a tag
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Search or create a tag..." />
          <CommandList>
            <CommandEmpty>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <span>Create a new tag</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="font-sans">
                  <DialogHeader>
                    <DialogTitle>Create a new tag</DialogTitle>
                  </DialogHeader>
                  <NewTagForm />
                </DialogContent>
              </Dialog>
            </CommandEmpty>
            <CommandGroup>
              {tags?.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.slug}
                  onSelect={(slug) => {
                    setSelectedTag(
                      tags.find((tag) => tag.slug === slug) ?? undefined,
                    );
                    setOpen(false);
                  }}
                >
                  <span>{tag.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const columns: ColumnDef<PostWithTags>[] = [
  {
    accessorKey: "name",
    header: "Post Name",
    cell: ({ row }) => {
      return <Badge className="bg-muted-foreground">{row.original.name}</Badge>;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      return <ExistingTags post={row.original} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <AddTag post={row.original} />;
    },
  },
];
