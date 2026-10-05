import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { FAQ } from "@/lib/content";
import { KidProvider } from "@/components/kid-context";
import { Nav, TopBar } from "@/components/site/nav";
import { Floating } from "@/components/site/floating";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { QuickFacts } from "@/components/sections/quick-facts";
import { Problem } from "@/components/sections/problem";
import { Demo } from "@/components/sections/demo";
import { Journey } from "@/components/sections/journey";
import { About } from "@/components/sections/about";
import { How } from "@/components/sections/how";
import { FreeLesson, Price } from "@/components/sections/offer";
import { Quiz } from "@/components/sections/quiz";
import { Faq } from "@/components/sections/faq";
import { Closing } from "@/components/sections/closing";
import { Trust } from "@/components/sections/trust";
import { Proof } from "@/components/sections/proof";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const strip = (t: string) => t.replace(/\u2011/g, "-").replace(/\u2060/g, "");
const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${CONFIG.siteUrl}/#lectii`,
      name: "Lecții online 1:1 de programare și inteligență artificială pentru copii",
      serviceType: "Lecții de programare pentru copii",
      provider: { "@id": `${CONFIG.siteUrl}/#org` },
      areaServed: { "@type": "Country", name: "România" },
      audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Copii și adolescenți" },
      availableChannel: { "@type": "ServiceChannel", serviceUrl: `${CONFIG.siteUrl}/`, availableLanguage: "ro" },
      offers: [
        { "@type": "Offer", name: "Prima lecție (45 de minute)", price: "0", priceCurrency: "RON", availability: "https://schema.org/InStock" },
        { "@type": "Offer", name: "Abonament lunar: 4 lecții de 90 de minute", price: String(CONFIG.price.month), priceCurrency: "RON" },
        { "@type": "Offer", name: "Lecție individuală (90 de minute)", price: String(CONFIG.price.single), priceCurrency: "RON" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${CONFIG.siteUrl}/#intrebari`,
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })),
    },
  ],
};

export default function Home() {
  return (
    <KidProvider>
      <TopBar />
      <Nav />
      <main>
        <Hero />
        <QuickFacts />
        <Problem />
        <Demo />
        <About />
        <Journey />
        <How />
        <Trust />
        <Proof />
        <FreeLesson />
        <Price />
        <Quiz />
        <Faq />
        <Closing />
      </main>
      <Footer pad />
      <Floating />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLd) }} />
    </KidProvider>
  );
}
