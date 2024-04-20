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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { tagColors } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlockPicker } from "react-color";

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
      title: "Form submitted",
      description: <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>,
    });
  }

  function handleChangeComplete(color: { hex: string }) {
    form.setValue("color", color.hex);
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
              <FormItem className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="h-6 w-6"
                      style={{ backgroundColor: field.value }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="mt-2 w-auto border-0 p-0 font-sans shadow-none">
                    <FormControl>
                      <BlockPicker
                        color={field.value}
                        onChangeComplete={handleChangeComplete}
                        colors={tagColors}
                      />
                    </FormControl>
                  </PopoverContent>
                </Popover>
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
