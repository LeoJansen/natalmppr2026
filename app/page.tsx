import { DonationCard } from "@/components/DonationCard";
import { DonationForm } from "@/components/DonationForm";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/Hero/HeroSection";
import { ManifestSection } from "@/components/ManifestSection";
import { TransparencyPanel } from "@/components/TransparencyPanel";
import { ContractorDistribution } from "@/components/ContractorDistribution";
import { pixKey } from "@/lib/campaignData";

export default function Home() {
    return (
        <div className="min-h-screen">
            <main>
                <HeroSection />
                <ManifestSection />
                <DonationCard pixKey={pixKey} />
                <DonationForm />
                <TransparencyPanel />
                <ContractorDistribution />
            </main>
            <Footer />
        </div>
    );
}
