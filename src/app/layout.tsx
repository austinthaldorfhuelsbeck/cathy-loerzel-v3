import "@/styles/globals.css";

import { Cormorant_Garamond, Roboto } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});
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
        className={`font-sans ${roboto.variable} font-serif ${cormorant.variable}`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
