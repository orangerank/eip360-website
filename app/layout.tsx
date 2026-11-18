import type { Metadata } from "next";
import { Public_Sans, Unbounded } from "next/font/google";
import { company, siteMeta } from "@/content/site";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-public",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: "Workforce retention advisory | EIP",
    template: "%s | EIP",
  },
  description:
    "EIP finds who is likely to leave in the next 90 days, prices what turnover is costing you, and stays until the number moves. Advisory first. Technology backed.",
  authors: [{ name: company.legal }],
  openGraph: {
    siteName: "EIP",
    type: "website",
    images: ["/assets/brand/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/brand/og.png"],
  },
  robots: siteMeta.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/assets/brand/eip-logo-640.webp" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        {siteMeta.reviewBanner ? (
          <p className="bg-gold-pale px-4 py-2 text-center text-[0.9rem] text-ink">
            Review build for Experience Improvement Partners. Not the live site. Draft lines and open items are listed in the README.
          </p>
        ) : null}
        <Header />
        <main id="content">{children}</main>
        <CtaBand />
        <Footer />
      </body>
    </html>
  );
}
