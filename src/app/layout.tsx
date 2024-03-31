import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Cathy Loerzel",
  description:
    "Co-Founder of The Allender Center, author, speaker, and story work coach.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen bg-background font-serif antialiased",
          cormorant.variable,
        )}
      >
        <ClerkProvider>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
