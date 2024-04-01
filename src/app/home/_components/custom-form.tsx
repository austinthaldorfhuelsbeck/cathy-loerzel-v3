"use client";

import { LoadingSpinner } from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import MailchimpSubscribe, {
  type EmailFormFields,
} from "react-mailchimp-subscribe";

function CustomForm({
  status,
  message,
  onValidated,
}: {
  status: "error" | "success" | "sending" | null;
  message: string | Error | null;
  onValidated: (formData: EmailFormFields) => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  // clear the form if successful
  useEffect(() => {
    if (status === "success") {
      clearFields();
      toast({
        title: "Thank you for subscribing!",
        content: message as string,
      });
    }
    if (status === "error") {
      toast({ title: "Error!", content: message as string });
    }
  }, [message, status]);

  const clearFields = () => {
    setFormData({
      email: "",
      name: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    formData.email &&
      formData.name &&
      onValidated({
        EMAIL: formData.email,
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex items-center gap-2">
      {status === "sending" && <LoadingSpinner size={16} />}

      <Input
        onChange={handleChange}
        type="email"
        name="email"
        value={formData.email}
        placeholder="email"
        className="input"
      />

      <Input
        onChange={handleChange}
        type="text"
        name="name"
        value={formData.name}
        placeholder="your name"
        className="input"
      />

      <Button type="submit">Subscribe!</Button>
    </form>
  );
}

export default function NewsletterForm() {
  const postURL =
    "https://gmail.us5.list-manage.com/subscribe/post?u=07d928836c4bfc5f2ac3958b0&amp;id=da7fe51007";

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h3 className="text-center font-sans font-bold uppercase text-primary">
        Connect with Cathy
        <br />&<br />
        subscribe to her mailing list
      </h3>

      <MailchimpSubscribe
        url={postURL}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData: EmailFormFields) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
}
