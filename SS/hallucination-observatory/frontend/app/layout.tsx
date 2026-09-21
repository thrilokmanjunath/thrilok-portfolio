import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hallucination Observatory",
  description: "Advanced Research Platform for LLM Hallucinations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground flex h-screen overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent opacity-10 rounded-full blur-[128px] pointer-events-none" />
          {children}
        </main>
      </body>
    </html>
  );
}
