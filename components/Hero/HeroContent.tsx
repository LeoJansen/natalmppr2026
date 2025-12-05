"use client";

export function HeroContent() {
    return (
        <div className="relative z-10 flex h-full flex-col justify-center px-6 lg:px-20">
            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                        Campanha Jubilar 2015–2025
                    </p>
                    <h1 className="font-playfair text-5xl font-medium leading-tight text-white sm:text-7xl lg:text-[5.5rem]">
                        10 Anos de <br />
                        <span className="italic text-[#D4AF37]">Gratidão & Cuidado</span>
                    </h1>
                </div>

                <p className="max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                    Neste ano histórico, celebramos uma década retribuindo o zelo de quem
                    cuida da nossa segunda casa. O Ministério Público do Paraná de Foz do Iguaçu
                    convida você a manter essa chama acesa.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <a
                        href="#doacao"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#020617] transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Fazer Doação</span>
                        <div className="absolute inset-0 -z-10 translate-y-full bg-[#F8FAFC] transition-transform duration-300 group-hover:translate-y-0" />
                    </a>

                    <a
                        href="#manifesto"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                    >
                        Ler Manifesto
                    </a>
                </div>
            </div>
        </div>
    );
}
