import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/Steps";
import { Calculator } from "@/components/Calculator";
import { Tracking } from "@/components/Tracking";
import { KineticBand } from "@/components/KineticBand";
import { Advantages } from "@/components/Advantages";
import { Cases } from "@/components/Cases";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { LeadDialog } from "@/components/LeadDialog";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <Steps />
        <Calculator />
        <KineticBand />
        <Advantages />
        <Tracking />
        <Cases />
        <CtaBanner />
      </main>
      <Footer />
      <LeadDialog />
    </>
  );
}
