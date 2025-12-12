import type { Metadata } from "next";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { CertificatePageHeader } from "@/components/CertificatePageHeader";

export const metadata: Metadata = {
	title: "Gerador de Certificados | Natal da Nossa Casa 2026",
	description:
		"Crie certificados personalizados para agradecer os doadores da campanha Natal da Nossa Casa 2026.",
};

export default function CertificatePage() {
	return (
		<main className="min-h-screen bg-[#0b0b20]">
			<CertificatePageHeader />

			<CertificateGenerator />
		</main>
	);
}
