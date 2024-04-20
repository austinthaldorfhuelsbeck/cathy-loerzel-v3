"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { tagColors } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";

const tagFormSchema = z.object({
  name: z.string({
    required_error: "Tag name is required",
  }),
  color: z.string({
    required_error: "Tag color is required",
  }),
  description: z.string().optional(),
});

export function NewTagForm() {
  const randomTagColor =
    tagColors[Math.floor(Math.random() * tagColors.length)];

  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: "",
      color: randomTagColor,
      description: "",
    },
  });

  function onSubmit() {
    toast({
      title: "Tag created",
      description: `Tag "${form.getValues().name}" has been created.`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <section className="flex gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tag name" {...field} />
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
                  <Input type="color" placeholder="Tag color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Tag description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
