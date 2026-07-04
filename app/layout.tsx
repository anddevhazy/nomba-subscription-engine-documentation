import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { DocsShell } from "@/components/docs/docs-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nomba Subscription Engine | Docs",
    template: "%s | Nomba Subscription Engine",
  },
  description:
    "Multi-tenant Subscription-as-a-Service, built on Nomba's payment rails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-full font-sans">
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  );
}
