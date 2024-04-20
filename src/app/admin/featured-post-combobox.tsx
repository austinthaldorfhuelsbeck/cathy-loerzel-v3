"use client";

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
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostsList({
  setOpen,
  setSelectedPost,
  posts,
}: {
  setOpen: (open: boolean) => void;
  setSelectedPost: (post: Post | undefined) => void;
  posts: Post[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Change post..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {posts.map((post) => (
            <CommandItem
              key={post.id}
              value={post.slug}
              onSelect={(slug) => {
                setSelectedPost(
                  posts.find((post) => post.slug === slug) ?? undefined,
                );
                setOpen(false);
              }}
            >
              <span>{post.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FeaturedPostCombobox({ posts }: { posts: Post[] }) {
  const featuredPost = posts.find((post) => post.featured);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(
    featuredPost,
  );

  const setNewFeaturedMutation = api.posts.setNewFeatured.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Featured post updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update featured post",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (!selectedPost || selectedPost === featuredPost) return;
    setNewFeaturedMutation.mutate({ id: selectedPost.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start">
            {selectedPost ? selectedPost.name : "Select featured post"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <PostsList
            setOpen={setOpen}
            setSelectedPost={setSelectedPost}
            posts={posts}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
