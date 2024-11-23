"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn, contactFormSchema } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      isEvent: false,
      eventLocation: '',
      eventDate: undefined,
      message: '',
    }
  });
  const isEvent = form.watch("isEvent");
  const [thankYou, setThankYou] = useState(false);

  const { mutate: submitContact, isPending } = api.contact.submit.useMutation({
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      setThankYou(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    submitContact(values);
  };

  return (
    <section
      className="w-full"
      id="contact"
      style={{
        backgroundImage: `url("/images/Abstract-1.jpg")`,
      }}
    >
      <h1 className="p-8 font-sans text-4xl font-bold uppercase text-background/80 md:text-5xl lg:text-6xl xl:text-7xl">
        Contact
      </h1>
      <Form {...form}>
        <form
          className="mx-8 grid max-w-2xl grid-cols-1 gap-4 pb-10 md:mx-auto md:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormLabel className="font-sans text-2xl font-bold text-primary md:col-span-2">
            Reach out today.
          </FormLabel>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-primary bg-transparent"
                    type="text"
                    placeholder="your name*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-primary bg-transparent"
                    type="email"
                    placeholder="your email*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-primary bg-transparent"
                    placeholder="your company"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-primary bg-transparent"
                    type="tel"
                    placeholder="your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEvent"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    id="isEvent"
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="isEvent" className="text-primary">
                  I am reaching out about an event
                </FormLabel>
              </FormItem>
            )}
          />

          {isEvent && (
            <>
              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-primary bg-transparent"
                        placeholder="event location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
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
            </>
          )}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="border-primary bg-transparent"
                      placeholder="your message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="px-10 hover:bg-primary sm:mr-auto md:col-span-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Let's talk!"
            )}
          </Button>

          {thankYou && (
            <FormMessage className="col-span-2 text-primary">
              Thank you for reaching out! We will get back to you soon.
            </FormMessage>
          )}
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
