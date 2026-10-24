import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/StructuredData";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Señor Roberto Francisco Pablo | AI Engineer",
    template: "%s | Señor Roberto Francisco Pablo",
  },
  description: "AI Engineer specializing in LLM-based agents, backend systems, and automation pipelines. Experienced in Python, TypeScript, Node.js, and AI workflow orchestration.",
  keywords: ["AI Engineer", "LLM", "Backend Developer", "Python", "TypeScript", "Node.js", "n8n", "Automation", "MCP", "Supabase"],
  authors: [{ name: "Señor Roberto Francisco Pablo" }],
  creator: "Señor Roberto Francisco Pablo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Señor Roberto Francisco Pablo | AI Engineer",
    description: "AI Engineer specializing in LLM-based agents, backend systems, and automation pipelines.",
    siteName: "Señor Roberto Francisco Pablo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Señor Roberto Francisco Pablo | AI Engineer",
    description: "AI Engineer specializing in LLM-based agents, backend systems, and automation pipelines.",
    creator: "@pablodev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
