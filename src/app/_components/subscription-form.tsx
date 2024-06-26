"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const SubscriptionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-center font-sans font-bold uppercase text-primary">
          Connect with Cathy
          <br />&<br />
          subscribe to her mailing list
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="md:w-64" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="md:w-64"
                    placeholder="your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary">
            Subscribe
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SubscriptionForm;
