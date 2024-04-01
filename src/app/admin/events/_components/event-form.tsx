"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn, convertToSlug } from "@/lib/utils";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { type Event } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Event name is required" })
    .max(64, { message: "Event name is too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(64, { message: "Slug is too long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase with dashes" }),
  date: z.date(),
  location: z.string().max(255, { message: "Location is too long" }),
  categoryId: z.number(),
  description: z
    .string()
    .max(1024, { message: "Description is too long" })
    .optional(),
  imageUrl: z.string().optional(),
  content: z.string().optional(),
});

export function EventForm({ event }: { event?: Event }) {
  const { toast } = useToast();
  const router = useRouter();
  const createEventMutation = api.events.create.useMutation({
    onSuccess: () => {
      form.reset();
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
  const updateEventMutation = api.events.update.useMutation({
    onSuccess: () => {
      form.reset();
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
  const deleteEventMutation = api.events.delete.useMutation({
    onSuccess: () => {
      form.reset();
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

  // Initialize form with event data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name ?? "",
      slug: event?.slug ?? "",
      date: event?.date ?? new Date(),
      location: event?.location ?? "",
      categoryId: event?.categoryId ?? 1,
      description: event?.description ?? "",
      imageUrl: event?.imageUrl ?? "",
      content: event?.content ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    event
      ? updateEventMutation.mutate({ id: event.id, ...values })
      : createEventMutation.mutate({ published: false, ...values });
  }

  // Automatically fill in slug based on name
  useEffect(() => {
    form.setValue("slug", convertToSlug(form.watch("name")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("name")]);

  return (
    <Form {...form}>
      <Image
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        src={form.watch("imageUrl") || "/images/Abstract-1.jpg"}
        alt={form.watch("name") || "Event image"}
        width={1200}
        height={600}
        className="h-64 w-full object-cover"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-6xl flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <section className="lg:col-span-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event name</FormLabel>
                <FormControl>
                  <Input placeholder="Event name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Slug</span>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  (automatically generated)
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Event slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "border-primary bg-transparent pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>event date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        className="font-sans"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Event category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"1"}>Category 1</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="lg:col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Event description"
                    className="min-h-56"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section className="sm:col-span-2 lg:col-span-1">
          <FormLabel>Image</FormLabel>
          <UploadButton
            className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 p-3"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Update the form with the new image URL
              form.setValue("imageUrl", res[0]?.url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </section>
        <div className="sm:col-span-2 lg:col-span-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Event content"
                    className="min-h-80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between sm:col-span-2 lg:col-span-3">
          <Button type="submit">Save</Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="ml-2 mr-auto"
          >
            Cancel
          </Button>

          {event && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>

              <DialogContent className="font-sans">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the event.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => deleteEventMutation.mutate({ id: event.id })}
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
        </div>
      </form>
    </Form>
  );
}
