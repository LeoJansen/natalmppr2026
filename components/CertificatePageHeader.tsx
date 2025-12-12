"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsapClient";

export function CertificatePageHeader() {
	const headerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		ensureGsapPlugins();
		if (!headerRef.current) return;

		const ctx = gsap.context(() => {
			gsap.from(
				[
					"[data-gsap='cert-header-kicker']",
					"[data-gsap='cert-header-title']",
					"[data-gsap='cert-header-subtitle']",
				],
				{
					opacity: 0,
					y: 18,
					duration: 0.75,
					stagger: 0.1,
					ease: "power3.out",
				}
			);
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={headerRef}
			className="mx-auto max-w-5xl px-4 pb-8 pt-20 text-center text-[#dadada]"
		>
			<p
				data-gsap="cert-header-kicker"
				className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059]"
			>
				Ferramenta interna
			</p>
			<h1
				data-gsap="cert-header-title"
				className="mt-4 font-serif text-4xl text-white md:text-5xl"
			>
				Gerador de Certificados
			</h1>
			<p
				data-gsap="cert-header-subtitle"
				className="mt-4 text-base text-[#dadada]/80 md:text-lg"
			>
				Personalize o nome e a mensagem para cada doador e exporte em PDF
				diretamente do navegador.
			</p>
		</section>
	);
}
