import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AskThisWebsite",
  description: "Chat with any web page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <Providers>
          <main className="h-screen dark text-foreground bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
