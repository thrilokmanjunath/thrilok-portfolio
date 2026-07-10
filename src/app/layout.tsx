import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thrilok M | Data Scientist, ML Architect & Quantum Developer",
    template: "%s | Thrilok M",
  },
  description: "Portfolio of Thrilok M, an MSc Data Science student at Christ University, President of the Quantum Club, specializing in Machine Learning, Generative AI, Quantum Computing, and Full-Stack Systems.",
  keywords: [
    "Thrilok M",
    "Data Science",
    "Machine Learning",
    "Generative AI",
    "Quantum Computing",
    "Qiskit",
    "MLOps",
    "Christ University",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Thrilok M" }],
  creator: "Thrilok M",
  metadataBase: new URL("https://thrilok.dev"), // default workspace domain placeholder
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thrilok.dev",
    title: "Thrilok M | Data Scientist & Quantum Developer",
    description: "Portfolio showcasing research, engineering benchmarks, and projects in ML/AI and Quantum Computing.",
    siteName: "Thrilok M Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thrilok M Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thrilok M | Data Scientist & Quantum Developer",
    description: "Portfolio showcasing research, engineering benchmarks, and projects in ML/AI and Quantum Computing.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
