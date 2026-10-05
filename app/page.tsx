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
        <Journey />
        <About />
        <How />
        <FreeLesson />
        <Price />
        <Quiz />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Floating />
    </KidProvider>
  );
}
