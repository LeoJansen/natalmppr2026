"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsapClient";

const HeroSectionMobile = dynamic(() => import("./HeroSectionMobile").then((mod) => mod.HeroSectionMobile), {
    ssr: false,
});


export function HeroSection() {
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const updateIsMobile = (event?: MediaQueryListEvent) => {
            if (event) {
                setIsMobile(event.matches);
                return;
            }
            setIsMobile(mediaQuery.matches);
        };

        updateIsMobile();

        const handleViewportChange = (event: MediaQueryListEvent) => {
            updateIsMobile(event);
        };

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleViewportChange);
            return () => mediaQuery.removeEventListener("change", handleViewportChange);
        }

        mediaQuery.addListener(handleViewportChange);
        return () => mediaQuery.removeListener(handleViewportChange);
    }, []);

    useEffect(() => {
        ensureGsapPlugins();

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            tl.fromTo(
                "[data-gsap='hero-bg']",
                { opacity: 0, scale: 1.04 },
                { opacity: 1, scale: 1, duration: 1.25 }
            )
                .from(
                    "[data-gsap='hero-kicker']",
                    { opacity: 0, y: 18, duration: 0.7 },
                    "-=0.8"
                )
                .from(
                    "[data-gsap='hero-title']",
                    { opacity: 0, y: 22, duration: 0.75 },
                    "-=0.55"
                )
                .from(
                    "[data-gsap='hero-subtitle']",
                    { opacity: 0, y: 16, duration: 0.7 },
                    "-=0.5"
                )
                .from(
                    "[data-gsap='hero-badge']",
                    { opacity: 0, y: 14, duration: 0.6 },
                    "-=0.45"
                )
                .from(
                    "[data-gsap='hero-cta']",
                    { opacity: 0, y: 12, duration: 0.6 },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (isMobile) {
        return <HeroSectionMobile />;
    }

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden h-screen bg-[#080A16] text-white shadow-[0_40px_120px_rgba(5,6,15,0.55)]"
        >
            <div className="absolute inset-0">
                <Image
                    src="/hero.png"
                    alt="Mãos oferecendo luz simbolizando cuidado coletivo"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                />
                <div
                    data-gsap="hero-bg"
                    className="absolute inset-0 bg-linear-to-br from-[#131A5C]/95 via-[#03040d]/70 to-transparent"
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between gap-8 px-8 py-12 md:px-14 md:py-16 lg:px-20">
                <div className="flex flex-col gap-8 ">
                    <div>
                        <p data-gsap="hero-kicker" className="text-lg uppercase tracking-[0.35em] text-white/70">
                            Uma campanha dos Membros e Servidores do
                            <span className="ml-2 text-[#6CA0FF]">MPPR</span>
                            <span className="ml-1 text-white/70">de Foz do Iguaçu</span>
                        </p>
                    </div>
                    <div className="flex flex-col  justify-between items-between h-full gap-8 lg:gap-16">
                        <div className="space-y-4 max-w-3xl">
                            <h1 data-gsap="hero-title" className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                                Natal da Nossa Casa <span className="font-bold text-[#5193eb] text-6xl lg:text-7xl">2026</span>
                            </h1>
                            <p data-gsap="hero-subtitle" className="text-lg text-white/85 lg:text-xl">
                                Uma década de gratidão a quem cuida de nós todos os dias. Neste ano histórico,
                                convidamos você a manter acesa a chama de cuidado que aquece cada família do nosso MPPR.
                            </p>
                        </div>
                        <div className="">
                            <p data-gsap="hero-badge" className="inline-flex items-center gap-2 rounded-full border-2 border-[#EB9E50] px-8 py-4 text-lg text-white/85">
                                <span className="text-[#EBB550] font-semibold">10ª edição</span>
                                da campanha.
                            </p>

                        </div>

                    </div>



                </div>


                <div className="flex  w-full  gap-4 text-sm flex-row items-center justify-center ">
                    <a
                        href="#doacao"
                        data-gsap="hero-cta"
                        className="inline-flex items-center justify-center rounded-full bg-[#5C6CFF] px-8 py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#7b88ff]"
                    >
                        Participar agora
                    </a>
                </div>
            </div>
        </section>
    );
}
