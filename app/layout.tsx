import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SiteBackground } from "@/components/layout/SiteBackground";

const siteUrl = "https://www.nexaramediastudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nexara Media — Brands That Cannot Be Ignored.",
  description:
    "Full-spectrum digital marketing agency in Colombo, Sri Lanka. Social Media, Video, Web, AI Automation, Branding, Ads & SEO.",
  icons: {
    icon: [
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Nexara Media — Brands That Cannot Be Ignored.",
    description:
      "Full-spectrum digital marketing agency in Colombo, Sri Lanka. Social Media, Video, Web, AI Automation, Branding, Ads & SEO.",
    url: siteUrl,
    siteName: "Nexara Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexara Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexara Media — Brands That Cannot Be Ignored.",
    description:
      "Full-spectrum digital marketing agency in Colombo, Sri Lanka. Social Media, Video, Web, AI Automation, Branding, Ads & SEO.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexara Media",
  url: siteUrl,
  logo: `${siteUrl}/icon-192.png`,
  description:
    "Full-spectrum digital marketing agency in Colombo, Sri Lanka. Social Media, Video, Web, AI Automation, Branding, Ads & SEO.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  sameAs: [
    "https://www.instagram.com/nexaramediastudio/",
    "https://www.facebook.com/share/18gLjUTbY6/?mibextid=wwXIfr",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <SiteBackground />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
