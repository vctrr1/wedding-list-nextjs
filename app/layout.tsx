import type { Metadata } from "next";
import {Darker_Grotesque} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

const darkerGrotesque = Darker_Grotesque({subsets: ['latin']})


export const metadata: Metadata = {
  title: "Wedding List",
  description: "Created by VCTRR",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={darkerGrotesque.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}