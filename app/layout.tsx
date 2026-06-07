import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Nexara Media — Brands That Cannot Be Ignored.",
  description:
    "Full-spectrum digital marketing agency in Colombo, Sri Lanka. Social Media, Video, Web, AI Automation, Branding, Ads & SEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
