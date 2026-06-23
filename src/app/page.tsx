import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Telemetry } from "@/components/Telemetry";
import { Steps } from "@/components/Steps";
import { Calculator } from "@/components/Calculator";
import { Tracking } from "@/components/Tracking";
import { KineticBand } from "@/components/KineticBand";
import { Features } from "@/components/Features";
import { Audience } from "@/components/Audience";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { StatsBar } from "@/components/StatsBar";
import { Footer } from "@/components/Footer";
import { LeadDialog } from "@/components/LeadDialog";
import { ScrollRail } from "@/components/ScrollRail";

export default function Home() {
  return (
    <>
      <Header />
      <ScrollRail />
      <main>
        <Hero />
        <Telemetry />
        <Steps />
        <Calculator />
        <Tracking />
        <KineticBand />
        <Features />
        <Audience />
        <Testimonials />
        <CtaBanner />
        <StatsBar />
      </main>
      <Footer />
      <LeadDialog />
    </>
  );
}
