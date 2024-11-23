import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/utils";

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "465"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const { name, email, company, phone, isEvent, eventLocation, eventDate, message } = input;

        const eventDetails = isEvent 
          ? `\nEvent Details:\nLocation: ${eventLocation}\nDate: ${eventDate ? eventDate.toLocaleDateString() : "Not specified"}`
          : "";

        const companyInfo = company ? `\nCompany: ${company}` : "";
        const phoneInfo = phone ? `\nPhone: ${phone}` : "";

        const emailContent = `
New Contact Form Submission

From: ${name}
Email: ${email}${companyInfo}${phoneInfo}${eventDetails}

Message:
${message}
        `;

        // Send mail with defined transport object
        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: process.env.SMTP_TO,
          subject: `New Contact Form Submission from ${name}`,
          text: emailContent,
          replyTo: email, // Set reply-to to the submitter's email
        });

        return {
          success: true,
          messageId: info.messageId,
        };
      } catch (error) {
        console.error("Email error:", error);
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email",
        });
      }
    }),
});