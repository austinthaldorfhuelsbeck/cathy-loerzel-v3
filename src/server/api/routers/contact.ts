import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/utils";
import { fallbackToEmail, fallbackFromEmail } from "@/lib/constants";
import { type z } from "zod";

// Initialize Resend client with error handling
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to validate email configuration
async function validateEmailConfig() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing Resend API key");
  }
  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn("Missing FROM email, falling back to default Resend address");
  }
  if (!process.env.RESEND_TO_EMAIL) {
    console.warn("Missing TO email, falling back to fallback address");
  }
}

// Helper function to format email content
function formatEmailContent(input: z.infer<typeof contactFormSchema>) {
  const {
    name,
    email,
    company,
    phone,
    isEvent,
    eventLocation,
    eventDate,
    message,
  } = input;

  const sections = [
    `From: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    phone && `Phone: ${phone}`,
    isEvent &&
      `Event Details:
    Location: ${eventLocation}
    Date: ${eventDate ? eventDate.toLocaleDateString() : "Not specified"}`,
    `\nMessage:\n${message}`,
  ].filter(Boolean); // Remove falsy values (undefined sections)

  return `New Contact Form Submission\n\n${sections.join("\n")}`;
}

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Validate configuration on each request
        await validateEmailConfig();

        const emailContent = formatEmailContent(input);

        // Send email with enhanced error handling
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? fallbackFromEmail,
          to: process.env.RESEND_TO_EMAIL ?? fallbackToEmail,
          subject: `New Contact Form Submission from ${input.name}`,
          text: emailContent,
          replyTo: input.email,
          // Adding HTML version for better email client compatibility
          html: emailContent.replace(/\n/g, "<br>"),
        });

        if (error) {
          console.error("Resend error details:", {
            error,
            to: process.env.RESEND_TO_EMAIL ?? fallbackToEmail,
            from: process.env.RESEND_FROM_EMAIL ?? fallbackFromEmail,
          });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }

        return {
          success: true,
          messageId: data?.id,
        };
      } catch (error) {
        console.error("Email submission error:", error);

        // Provide more specific error messages based on the type of error
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to send email: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email",
        });
      }
    }),
});
