"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsapClient";

export function ManifestSection() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        ensureGsapPlugins();
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(
                ["[data-gsap='manifest-text']", "[data-gsap='manifest-image']"],
                {
                    opacity: 0,
                    y: 28,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="manifesto"
            className="relative z-10 w-full overflow-hidden bg-white px-6 py-24 md:py-32 lg:px-20"
        >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Text Content */}
                <div data-gsap="manifest-text" className="flex flex-col justify-center space-y-8">
                    <div>
                        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#EB9E50]">
                            Manifesto da 10ª Edição
                        </p>
                        <h2 className="font-playfair text-4xl font-semibold leading-tight text-[#9b9b9b] md:text-5xl">
                            Um gesto nosso, <br />
                            <span className="italic  text-[#122DA3]">um Natal inteiro para eles.</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-lg leading-relaxed text-[#565e69]">
                        <p>
                            Muita coisa muda numa década. Promotores chegam, outros partem.
                            Leis se transformam e a justiça evolui. Mas aqui no MPPR de Foz do Iguaçu,
                            existe um sentimento que permanece inalterado: <span className="font-semibold text-[#5e6583]">a gratidão</span>.
                        </p>
                        <p>
                            Enquanto focamos nos prazos e audiências, uma equipe de bastidores garante
                            que nossa casa funcione. São eles que preparam o café que nos desperta,
                            mantêm o ambiente limpo e garantem nossa segurança na portaria.
                        </p>
                        <p>
                            Desde 2015, decidimos que esse cuidado merecia ser retribuído.
                            O que começou como uma iniciativa tímida tornou-se nossa tradição mais nobre.
                        </p>
                        <p className="border-l-4 border-[#D4AF37] pl-6 font-playfair text-xl italic text-[#9b9b9b]">
                            &ldquo;Esta Edição Histórica não é caridade, é reconhecimento.
                            Garantimos que quem cuida da nossa segunda casa leve conforto para a sua própria casa.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Image Composition */}
                <div data-gsap="manifest-image" className="relative">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src="/cartao3.png"
                            alt="Equipe reunida"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/10 p-6 backdrop-blur-md border border-white/20">
                            <p className="font-playfair text-2xl text-white">
                                10 Anos de História
                            </p>
                            <p className="text-sm font-medium text-white/80">
                                Uma memória construída por todos nós.
                            </p>
                        </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                    <div className="absolute -top-6 -left-6 -z-10 h-64 w-64 rounded-full bg-[#3B82F6]/10 blur-3xl" />
                </div>
            </div>
        </section>
    );
}
