import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Nexara Media — Built for brands that refuse ordinary.",
  description:
    "Full-spectrum premium digital studio. AI Automation, Business Systems, Web Development, Branding, Creative Media, and Digital Experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <CustomCursor />
          <div className="announcement-bar">
            ← Now accepting projects for Q3 2026.{" "}
            <span className="gold-highlight">Limited spots available.</span> →
          </div>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
