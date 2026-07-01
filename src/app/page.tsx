import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Features } from "@/components/landing/features";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Workflow } from "@/components/landing/workflow";
import { AnalyticsPreview } from "@/components/landing/analytics-preview";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { BackgroundGrid } from "@/components/landing/background-grid";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#fdfcff] dark:bg-ink-950">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <DashboardPreview />
      <Workflow />
      <AnalyticsPreview />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}