"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "../../components/ui/use-toast";
import { cn } from "../../lib/utils";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
const formSchema = z.object({
  name: z.string(),
  company: z.string().optional(),
  phone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
  email: z.string().email(),
  isEvent: z.boolean(),
  eventLocation: z.string().optional(),
  eventDate: z.date().optional(),
  message: z.string({
    required_error: "What do you want to say?",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const isEvent = form.watch("isEvent");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
          <h2 className="font-sans text-2xl font-bold text-primary md:col-span-2">
            Reach out today.
          </h2>

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
                <Label htmlFor="isEvent" className="text-primary">
                  I am reaching out about an event
                </Label>
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
          >
            Let&#39;s talk!
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
