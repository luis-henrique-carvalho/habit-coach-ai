import { Features } from "@/components/landing/feature";
import { Hero } from "@/components/landing/hero";
import { PersonalityShowcase } from "@/components/landing/personality-showcase";
import { Pricing } from "@/components/landing/pricing";
import { Problem } from "@/components/landing/problem";
import { Solution } from "@/components/landing/solution";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <main>
        <Hero />
        <Problem />
        <Features />
        <Solution />
        <HowItWorks />
        <PersonalityShowcase />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
