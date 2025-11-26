import Image from "next/image";

export function HeroSectionMobile() {
    return (
        <section className="relative isolate overflow-hidden  bg-[#080A16] text-white shadow-[0_25px_80px_rgba(5,6,15,0.65)] px-6 py-12 min-h-[85vh] flex flex-col gap-10">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/hero.png"
                    alt="Ilustração luminosa representando solidariedade"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#131A5C]/95 via-[#03040d]/70 to-transparent" />
            </div>

            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    Membros e servidores
                    <span className="ml-2 text-[#6CA0FF]">MPPR</span>
                </p>
                <div className="space-y-4">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1 text-[0.8rem] text-white/85">
                        <span className="text-[#EBB550] font-semibold">10ª edição</span>
                        da campanha.
                    </p>
                    <h1 className="text-4xl font-semibold leading-snug">
                        Natal da Nossa Casa
                        <span className="block text-[#5193eb] text-5xl font-bold">2026</span>
                    </h1>
                    <p className="text-base text-white/80">
                        Uma década de gratidão a quem cuida de nós todos os dias. Neste ano histórico, convidamos você a manter acesa a chama de cuidado que aquece cada família do nosso MPPR.
                    </p>
                </div>
            </div>

          

            <div className="flex flex-col gap-4">
                <a
                    href="#doacao"
                    className="inline-flex items-center justify-center rounded-full bg-[#5C6CFF] px-8 py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#7b88ff]"
                >
                    Participar agora
                </a>
          
            </div>
        </section>
    );
}
