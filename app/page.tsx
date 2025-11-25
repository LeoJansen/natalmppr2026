import { DonationCard } from "@/components/DonationCard";
import { Footer } from "@/components/Footer";
import { GoalSection } from "@/components/GoalSection";
import { HeroSection } from "@/components/HeroSection";
import { ManifestSection } from "@/components/ManifestSection";
import { goal, pixKey, raised } from "@/lib/campaignData";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0b20] text-[#dadada]">
      <main className="">
        <HeroSection />
        <ManifestSection />
        
        <DonationCard pixKey={pixKey} />
        <GoalSection goal={goal} raised={raised} />
      </main>
      <Footer />
    </div>
  );
}
