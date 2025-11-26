import type { Metadata } from "next";
import { CertificateGenerator } from "@/components/CertificateGenerator";

export const metadata: Metadata = {
	title: "Gerador de Certificados | Natal da Nossa Casa 2026",
	description:
		"Crie certificados personalizados para agradecer os doadores da campanha Natal da Nossa Casa 2026.",
};

export default function CertificatePage() {
	return (
		<main className="min-h-screen bg-[#0b0b20]">
			<section className="mx-auto max-w-5xl px-4 pb-8 pt-20 text-center text-[#dadada]">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059]">
					Ferramenta interna
				</p>
				<h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
					Gerador de Certificados
				</h1>
				<p className="mt-4 text-base text-[#dadada]/80 md:text-lg">
					Personalize o nome e a mensagem para cada doador e exporte em PDF
					diretamente do navegador.
				</p>
			</section>

			<CertificateGenerator />
		</main>
	);
}
