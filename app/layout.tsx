import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/app/_components/ui/sonner";

const inconsolata = Inconsolata({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Wedding List",
  description: "Created by VCTRR",
  icons: {
    icon: "/site-logo.svg", // caminho relativo à pasta public
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/site-logo.svg" />
      </head>
      <body className={inconsolata.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
