import type { Metadata } from "next";
import {Darker_Grotesque} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const darkerGrotesque = Darker_Grotesque({subsets: ['latin']})


export const metadata: Metadata = {
  title: "Wedding List",
  description: "Created by VCTRR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}