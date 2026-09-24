import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { portfolioData, siteUrl } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070607",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioData.personal.name} | ${portfolioData.personal.role}`,
    template: `%s | ${portfolioData.personal.name}`,
  },
  description: `Portfolio of ${portfolioData.personal.name} - ${portfolioData.personal.role} specializing in high-retention short-form content, After Effects motion graphics, and DaVinci Resolve color grading.`,
  keywords: [
    portfolioData.personal.name,
    "Shanu",
    "Video Editor",
    "Motion Designer",
    "DaVinci Resolve Studio",
    "Adobe After Effects",
    "Short Form Content",
    "Reels Editor",
    "Kinetic Typography",
    "Colorist",
    "Commercial Video Editor",
    "Showreel",
  ],
  authors: [{ name: portfolioData.personal.name, url: siteUrl }],
  creator: portfolioData.personal.name,
  publisher: portfolioData.personal.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  verification: {
    google: "",
  },
  openGraph: {
    title: `${portfolioData.personal.name} | ${portfolioData.personal.role}`,
    description: portfolioData.personal.tagline,
    url: siteUrl,
    siteName: `${portfolioData.personal.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personal.name} | ${portfolioData.personal.role}`,
    description: portfolioData.personal.tagline,
    creator: "@shahanhassan",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: portfolioData.personal.name,
      alternateName: "Shanu",
      jobTitle: portfolioData.personal.role,
      description: portfolioData.personal.bio,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kerala",
        addressCountry: "India",
      },
      sameAs: [portfolioData.socials.instagram, portfolioData.socials.whatsapp].filter(Boolean),
      knowsAbout: [
        "DaVinci Resolve Studio",
        "Adobe After Effects",
        "Video Editing",
        "Motion Graphics",
        "Color Grading",
        "Short-Form Video Production",
        "Kinetic Typography",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${portfolioData.personal.name} — Portfolio`,
      description: portfolioData.personal.tagline,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
