import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { CONFIG } from "@/lib/config";
import "./globals.css";
import { Analytics } from "@/components/site/analytics";
import { MotionProvider } from "@/components/ui/motion-provider";

const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const caveat = Caveat({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--font-caveat", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-jetbrains", display: "swap" });

const description =
  "Lecții online 1:1 de programare și AI pentru copii și adolescenți. Copilul își face jocuri, site‑uri și aplicații reale. Prima lecție e gratuită.";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: { default: "Lecții de programare și AI pentru copii, online 1:1 · Codito", template: "%s · Codito" },
  description,
  keywords: ["cursuri programare copii", "curs programare copii online", "lecții programare copii", "Python pentru copii", "inteligență artificială copii", "meditații informatică", "programare copii București", "lecții 1:1 programare"],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "/",
    siteName: "Codito",
    title: "Codito · Programare & AI pentru copii și adolescenți",
    description: "Din „iar stă pe telefon” în „Mama, uite ce am construit!”. Lecții online 1:1, 9–17 ani. Prima lecție e gratuită.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Codito · Programare & AI pentru copii și adolescenți" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...(CONFIG.googleVerification ? { verification: { google: CONFIG.googleVerification } } : {}),
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
  authors: [{ name: "Leonard Pădurean" }],
  creator: "Leonard Pădurean",
  category: "education",
};

export const viewport: Viewport = { themeColor: "#FFF9F1", colorScheme: "light", viewportFit: "cover" };

const ORG = `${CONFIG.siteUrl}/#org`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": ORG,
      name: "Codito",
      url: `${CONFIG.siteUrl}/`,
      logo: { "@type": "ImageObject", url: `${CONFIG.siteUrl}/apple-icon.png`, width: 180, height: 180 },
      image: `${CONFIG.siteUrl}/og.png`,
      description,
      telephone: CONFIG.phone,
      areaServed: { "@type": "Country", name: "România" },
      address: { "@type": "PostalAddress", addressLocality: "București", addressCountry: "RO" },
      legalName: CONFIG.company.name,
      taxID: CONFIG.company.cui,
      founder: { "@id": `${CONFIG.siteUrl}/#leonard` },
      contactPoint: { "@type": "ContactPoint", telephone: CONFIG.phone, contactType: "customer service", availableLanguage: "ro" },
      knowsLanguage: "ro",
    },
    {
      "@type": "Person",
      "@id": `${CONFIG.siteUrl}/#leonard`,
      name: "Leonard Pădurean",
      jobTitle: "Programator software și profesor de programare pentru copii",
      url: `${CONFIG.siteUrl}/#despre`,
      image: CONFIG.photo ? `${CONFIG.siteUrl}${CONFIG.photo}` : undefined,
      worksFor: { "@id": ORG },
    },
    {
      "@type": "WebSite",
      "@id": `${CONFIG.siteUrl}/#website`,
      url: `${CONFIG.siteUrl}/`,
      name: "Codito",
      inLanguage: "ro",
      publisher: { "@id": ORG },
    },
  ],
};

const REVEAL_JS = `(function(){var d=document.documentElement;d.classList.add("js");var qa=${process.env.NEXT_PUBLIC_QA === "1"};if(qa)d.classList.add("qa");function go(){var io=("IntersectionObserver" in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-in","");io.unobserve(e.target)}})},{rootMargin:"0px 0px -60px 0px"}):null;function scan(root){(root.querySelectorAll?root:document).querySelectorAll("[data-reveal]:not([data-in]),[data-stagger]:not([data-in])").forEach(function(el){if(qa||!io)el.setAttribute("data-in","");else io.observe(el)})}scan(document);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.matches("[data-reveal],[data-stagger]"))scan(n.parentNode);else scan(n)}})})}).observe(document.body,{childList:true,subtree:true})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_JS }} />
      </head>
      <body suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
