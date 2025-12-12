"use client";

import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { DONATIONS_API_URL } from "@/lib/api";
import { ensureGsapPlugins, gsap } from "@/lib/gsapClient";

export function DonationForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    const blockDecimalInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if ([".", ",", "Decimal", "NumpadDecimal"].includes(event.key)) {
            event.preventDefault();
        }
    };

    const enforceIntegerValue = (event: FormEvent<HTMLInputElement>) => {
        const sanitized = event.currentTarget.value.replace(/[^\d]/g, "");
        if (sanitized !== event.currentTarget.value) {
            event.currentTarget.value = sanitized;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const file = formData.get("comprovante") as File;

        if (!file || file.size === 0) {
            alert("Por favor, anexe o comprovante.");
            setLoading(false);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64 = (reader.result as string).split(",")[1];

            const payload = {
                nome: formData.get("nome"),
                valor: formData.get("valor"),
                arquivo: base64,
                mimeType: file.type,
            };

            try {
                const response = await fetch(DONATIONS_API_URL, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Falha ao enviar o comprovante.");
                }

                setSuccess(true);
                form.reset();

            } catch (error) {
                console.error(error);
                alert("Erro ao enviar. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };
    };

    useEffect(() => {
        ensureGsapPlugins();

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            if (success) {
                gsap.from("[data-gsap='donationform-success']", {
                    opacity: 0,
                    y: 18,
                    duration: 0.7,
                    ease: "power3.out",
                });
                return;
            }

            gsap.from(
                [
                    "[data-gsap='donationform-header']",
                    "[data-gsap='donationform-form']",
                ],
                {
                    opacity: 0,
                    y: 24,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [success]);

    if (success) {
        return (
            <section ref={sectionRef} className="w-full bg-[#020617] px-4 pb-20 pt-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div data-gsap="donationform-success" className="glass-panel relative overflow-hidden rounded-3xl p-10 border border-[#EB9E50]/30 shadow-[0_0_80px_-20px_rgba(212,175,55,0.15)]">

                        {/* Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#EB9E50] to-transparent opacity-50" />

                        <div className="mb-6 flex justify-center">
                            <div className="rounded-full bg-[#EB9E50]/10 p-4 ring-1 ring-[#EB9E50]/30">
                                <span className="text-4xl">✨</span>
                            </div>
                        </div>

                        <h3 className="mb-4 font-playfair text-3xl font-bold text-[#EB9E50]">
                            Recebemos o seu gesto!
                        </h3>
                        <p className="text-lg text-[#94a3b8] leading-relaxed">
                            Obrigado por transformar gratidão em dignidade. <br />
                            O seu lugar à mesa está garantido.
                        </p>

                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#D4AF37] transition-all hover:text-[#b5952f] hover:underline hover:underline-offset-4"
                        >
                            <span>← </span> Enviar outro comprovante
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="w-full bg-[#020617] px-4 pb-24 pt-8">
            <div className="mx-auto max-w-3xl">

                <div data-gsap="donationform-header" className="mb-10 text-center">
                    <span className="inline-block h-px w-24 bg-linear-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6"></span>
                    <h2 className="font-playfair text-3xl font-semibold text-white">
                        Envie seu Comprovante
                    </h2>
                    <p className="mt-4 text-[#94a3b8]">
                        Preencha os dados para confirmarmos sua contribuição.
                    </p>
                </div>

                <form data-gsap="donationform-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#64748b] transition-colors group-focus-within:text-[#EB9E50]">
                            Nome Completo
                        </label>
                        <input
                            name="nome"
                            type="text"
                            required
                            className="w-full rounded-xl border border-[#1e293b] bg-[#0f172a] p-4 text-white placeholder-gray-500 outline-none ring-0 transition-all focus:border-[#EB9E50] focus:ring-1 focus:ring-[#EB9E50]"
                            placeholder="Como gostaria de ser identificado?"
                        />
                    </div>

                    <div className="group">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#64748b] transition-colors group-focus-within:text-[#EB9E50]">
                            Valor da Doação (R$)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                            <input
                                name="valor"
                                type="number"
                                required
                                inputMode="numeric"
                                pattern="[0-9]*"
                                onKeyDown={blockDecimalInput}
                                onInput={enforceIntegerValue}
                                className="w-full rounded-xl border border-[#1e293b] bg-[#0f172a] p-4 pl-12 text-white placeholder-gray-500 outline-none ring-0 transition-all focus:border-[#EB9E50] focus:ring-1 focus:ring-[#EB9E50]"
                                placeholder="0,00"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#64748b] transition-colors group-focus-within:text-[#EB9E50]">
                            Anexar Comprovante
                        </label>
                        <div className="relative">
                            <input
                                name="comprovante"
                                type="file"
                                accept="image/*,application/pdf"
                                required
                                title="Enviar comprovante de doação"
                                className="w-full cursor-pointer rounded-xl border border-dashed border-[#334155] bg-[#0f172a]/50 p-6 text-sm text-gray-400 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#EB9E50] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#020617] file:transition-colors hover:file:bg-[#a1862c] focus:border-[#EB9E50] focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 w-full rounded-full py-4 text-sm font-bold uppercase tracking-widest text-[#020617] shadow-lg transition-all ${loading
                                ? "cursor-not-allowed bg-gray-600 opacity-50"
                                : "bg-[#EB9E50] hover:bg-[#a1862c] hover:shadow-[#EB9E50]/25 hover:-translate-y-1"
                            }`}
                    >
                        {loading ? "Enviando..." : "Confirmar Doação"}
                    </button>
                </form>
            </div>
        </section>
    );
}
