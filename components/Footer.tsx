"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsapClient";

export function Footer() {
    const footerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        ensureGsapPlugins();
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-gsap='footer-inner']", {
                opacity: 0,
                y: 18,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 92%",
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative border-t border-white/5 bg-[#020617] px-6 py-12 text-center text-sm text-[#94a3b8]">
            <div data-gsap="footer-inner" className="mx-auto max-w-4xl space-y-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-white/5 p-4 ring-1 ring-white/10">
                        <Image
                            src="/logo-azul.png"
                            alt="Logo da Organização"
                            width={140}
                            height={140}
                            className="h-20 w-auto opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="font-playfair text-lg text-white">
                        Campanha Natal da Nossa Casa 2026
                    </p>
                    <p className="mx-auto max-w-lg text-[#64748b]">
                        Uma iniciativa independente dos membros e servidores do MPPR de Foz do Iguaçu.
                        Não possui vínculo institucional oficial.
                    </p>
                </div>

                <div className="pt-8 text-xs font-medium uppercase tracking-widest text-[#475569]">
                    © {new Date().getFullYear()} · 10 Anos de História
                </div>
            </div>
        </footer>
    );
}
