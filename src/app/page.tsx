import { LandingSection } from "@/components/landing/LandingSection";
import { PrologueSection } from "@/components/prologue/PrologueSection";
import { AtelierSection } from "@/components/atelier/AtelierSection";
import { ArchivesSection } from "@/components/archives/ArchivesSection";
import { CodexSection } from "@/components/codex/CodexSection";
import { TaverneSection } from "@/components/taverne/TaverneSection";
import { SideMenu } from "@/components/nav/SideMenu";

export default function Home() {
  return (
    <main>
      <LandingSection />
      <PrologueSection />
      <AtelierSection />
      <ArchivesSection />
      <CodexSection />
      <TaverneSection />
      <SideMenu />
    </main>
  );
}
