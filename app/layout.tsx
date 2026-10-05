import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { CONFIG } from "@/lib/config";
import "./globals.css";
import { Analytics } from "@/components/site/analytics";

const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const caveat = Caveat({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--font-caveat", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-jetbrains", display: "swap" });

const description =
  "Lecții online 1:1 de programare și inteligență artificială pentru copii și adolescenți de 9–17 ani. Copilul construiește jocuri, site-uri și aplicații reale. Prima lecție e gratuită.";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: { default: "Codito · Programare & AI pentru copii și adolescenți", template: "%s · Codito" },
  description,
  keywords: ["meditații programare copii", "curs programare copii online", "Python copii", "inteligență artificială copii", "lecții 1:1 programare", "informatică liceu meditații"],
  alternates: { canonical: "/" },
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FFF9F1", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Codito",
  url: CONFIG.siteUrl,
  description,
  telephone: CONFIG.phone,
  founder: { "@type": "Person", name: "Leonard Pădurean" },
  areaServed: "RO",
  inLanguage: "ro",
  offers: { "@type": "Offer", priceCurrency: "RON", price: String(CONFIG.price.month / 4), description: "Lecție individuală online de programare (90 min), în abonament lunar" },
};

const REVEAL_JS = `(function(){var d=document.documentElement;d.classList.add("js");var qa=${process.env.NEXT_PUBLIC_QA === "1"};if(qa)d.classList.add("qa");function go(){var io=("IntersectionObserver" in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-in","");io.unobserve(e.target)}})},{rootMargin:"0px 0px -60px 0px"}):null;function scan(root){(root.querySelectorAll?root:document).querySelectorAll("[data-reveal]:not([data-in]),[data-stagger]:not([data-in])").forEach(function(el){if(qa||!io)el.setAttribute("data-in","");else io.observe(el)})}scan(document);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.matches("[data-reveal],[data-stagger]"))scan(n.parentNode);else scan(n)}})})}).observe(document.body,{childList:true,subtree:true})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_JS }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
