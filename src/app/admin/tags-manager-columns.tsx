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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import type { Category, Tag } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { CirclePlusIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ItemWithTags = {
  id: number;
  name: string;
  tags: Tag[];
  category?: Category;
};

function AddTag({
  item,
  type,
}: {
  item: ItemWithTags;
  type: "post" | "event";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();

  const { data: tags, isLoading: tagsLoading } = api.tags.getAll.useQuery();
  const addPostTagMutation = api.postTags.addTag.useMutation({
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
  const addEventTagMutation = api.eventTags.addTag.useMutation({
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
    if (type === "post")
      addPostTagMutation.mutate({
        postId: item.id,
        tagId: selectedTag.id,
      });
    if (type === "event")
      addEventTagMutation.mutate({
        eventId: item.id,
        tagId: selectedTag.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.name, selectedTag]);

  if (tagsLoading) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto justify-start p-1">
          <CirclePlusIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
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

function ExistingTags({ item }: { item: ItemWithTags }) {
  const router = useRouter();
  const removePostTagMutation = api.postTags.removeTag.useMutation({
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
  const removeEventTagMutation = api.eventTags.removeTag.useMutation({
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
      {item?.tags.map((tag) => (
        <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
          {tag.name}
          <CircleXIcon
            className="ml-1 h-4 w-4 cursor-pointer"
            onClick={() => {
              if (item.category) {
                removePostTagMutation.mutate({
                  postId: item.id,
                  tagId: tag.id,
                });
              } else {
                removeEventTagMutation.mutate({
                  eventId: item.id,
                  tagId: tag.id,
                });
              }
            }}
          />
        </Badge>
      ))}
      <AddTag item={item} type={item.category ? "post" : "event"} />
    </div>
  );
}

export const columns: ColumnDef<ItemWithTags>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Badge className="bg-muted-foreground">{row.original.name}</Badge>;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      return <ExistingTags item={row.original} />;
    },
  },
];
