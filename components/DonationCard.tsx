"use client";

import { useState } from "react";

type DonationCardProps = {
    pixKey: string;
};

type CopyPixButtonProps = {
    pixKey: string;
};

export function DonationCard({ pixKey }: DonationCardProps) {
    return (
        <section id="doacao" className="relative w-full bg-[#020617] py-24 px-6">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EB9E50]/50 to-transparent"></div>

            <div className="mx-auto max-w-4xl text-center">
                <div className="glass-panel rounded-3xl p-10 md:p-16 shadow-[0_0_50px_-12px_rgba(212,175,55,0.25)] border border-[#ffffff]/10">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#EB9E50]">
                        Fazer Doação
                    </p>
                    <h2 className="mb-6 font-playfair text-3xl font-semibold text-white md:text-5xl">
                        Sua contribuição faz a diferença
                    </h2>
                    <p className="mb-10 text-lg text-[#94a3b8]">
                        Utilize a chave PIX exclusiva abaixo para realizar sua doação.
                        <br className="hidden md:block" />
                        Após a transferência, envie o comprovante no formulário a seguir.
                    </p>

                    <div className="mx-auto max-w-xl">
                        <div className="group relative overflow-hidden rounded-2xl bg-[#0f172a] p-1 ring-1 ring-[#1e293b] transition-all hover:ring-[#EB9E50]/50">
                            <div className="relative flex flex-col items-center justify-between gap-4 rounded-xl bg-[#020617] px-6 py-6 sm:flex-row sm:py-4">
                                <span className="truncate text-lg font-medium text-[#94a3b8] sm:text-xl">
                                    {pixKey}
                                </span>
                                <CopyPixButton pixKey={pixKey} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CopyPixButton({ pixKey }: CopyPixButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pixKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch (error) {
            console.error("Erro ao copiar a chave PIX", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`relative inline-flex min-w-[140px] items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all
        ${copied
                    ? "bg-green-500 text-white"
                    : "bg-[#EB9E50] text-[#020617] hover:bg-[#a1862c]"
                }
      `}
        >
            {copied ? (
                <span className="flex items-center gap-2">
                    Copiado!
                </span>
            ) : (
                "Copiar"
            )}
        </button>
    );
}
