import "./globals.css";
import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import Header from "@/components/header";
import { AuthErrorHandler } from "@/components/auth-error-handler";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  title: "The Luxe Bus | Luxury Group Transportation | Southern California",
  description:
    "2025 Mercedes Sprinter luxury party bus for all your transportation needs. Airport transfers, events, parties, wine tours & more. Servicing Southern California.",
  keywords: [
    "luxury bus",
    "party bus",
    "Mercedes Sprinter",
    "group transportation",
    "Southern California",
    "airport transfer",
    "bachelorette party bus",
    "event transportation",
  ],
  openGraph: {
    title: "The Luxe Bus | Luxury Group Transportation",
    description:
      "2025 Mercedes Sprinter luxury party bus. Fits up to 14 passengers. Servicing Southern California.",
    type: "website",
    locale: "en_US",
    siteName: "The Luxe Bus",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Luxe Bus | Luxury Group Transportation",
    description:
      "2025 Mercedes Sprinter luxury party bus. Servicing Southern California.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${cinzel.className} min-h-screen bg-[#0a0a0a] text-[#f5f5f5] antialiased`}
      >
        <AuthErrorHandler>
          <Header />
          {children}
        </AuthErrorHandler>
      </body>
    </html>
  );
}
