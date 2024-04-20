"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Tag } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const colors = ["#e4cdc2", "#934a26", "#a79186", "#a8baba", "#ac612c"];

const tagFormSchema = z.object({
  name: z.string().min(2).max(20),
  color: z.string().min(7).max(7),
  description: z.string().min(2).max(100).optional(),
});

function TagForm({ tag }: { tag?: Tag }) {
  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: tag?.name ?? undefined,
      color: tag?.color ?? colors[Math.floor(Math.random() * colors.length)],
      description: tag?.description ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof tagFormSchema>) {
    toast({
      title: JSON.stringify(values),
    });
  }

  return (
    <Form {...form}>
      <pre>{JSON.stringify(tag?.name, null, 2)}</pre>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Create a tag..."
                  className="border-none focus-visible:ring-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="color"
                  placeholder="Select a color..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add a description..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export function TagsManager({ tags }: { tags: Tag[] }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tags Manager</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="self-start">
              {selectedTag ? <>{selectedTag.name}</> : <>Select a tag</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change tag..." />
              <CommandList>
                <CommandEmpty></CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={(value) => {
                        setSelectedTag(
                          tags.find((tag) => tag.name === value) ?? undefined,
                        );
                        setOpen(false);
                      }}
                    >
                      <Badge style={{ backgroundColor: tag.color }}>
                        {tag.name}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <TagForm tag={selectedTag} />
      </CardContent>
    </Card>
  );
}
