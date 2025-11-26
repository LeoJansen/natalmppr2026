import Image from "next/image";

export function ManifestSection() {
    return (
        <section className="grid gap-10  bg-[#F5F5F0] px-4 py-4 xl:grid-cols-2 md:gap-16">
            <div className="space-y-6 rounded-3xl bg-white p-10 shadow-xl">
                <p className="text-xl tracking-[0.25em] text-[#C5A059]">Sobre a nossa campanha</p>
                <h2 className="text-3xl text-[#1B2631]">Um gesto nosso, um Natal inteiro para eles.</h2>
                <p className="text-lg text-[#333333]/90">
                   Muita coisa muda numa década. Promotores chegam do interior, outros partem para a capital. Servidores mudam de promotoria, outros aposentam sua jornada de serviço público. Leis alteram-se e justiça se transforma. Mas aqui no MPPR de Foz do Iguaçu, existe um sentimento que permanece inalterado.
                </p>
                    <p className="text-lg text-[#333333]/90">
                 Enquanto estamos focados nos prazos, nas audiências e no atendimento ao público, existe uma equipe de bastidores que garante que garante que a nossa casa funcione. São eles que fazem o café quente que nos desperta, a mesa limpa que organiza nosso dia e a segurança atenta que nos protege na portaria. São responsáveis por todo cenário onde a justiça acontece todos os dias.

                </p>
                <p className="text-lg text-[#333333]/90">
                    Desde 2015, nós — membros e servidores — decidimos que esse cuidado diário merecia ser retribuído. O que começou como uma iniciativa tímida tornou-se, ao longo de 10 anos, a nossa tradição interna mais nobre.
                </p>
                <p className="text-xl text-[#C5A059]">Hoje, celebramos uma década de gratidão.</p>
                  <p className="text-lg text-[#333333]/90">
                  Esta Edição Histórica é um convite entre colegas. Não se trata de caridade, mas de reconhecimento. O valor da doação é livre, mas o objetivo é único: garantir que, neste Natal, a equipe que cuida da nossa segunda casa leve conforto e fartura para a sua própria casa.
                </p>
                <p className="text-lg text-[#333333]/90">
                    A mesa está posta para a solidariedade. O seu lugar nesta história está reservado. Vamos, juntos, fazer do 10.º ano o maior da nossa história.
                </p>
                
            </div>
            <div className="relative rounded-3xl aspect-square">
                <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-[#C5A059]/30 shadow-2xl">
                    <Image
                        src="/cartao3.png"
                        alt="Equipe cuidando do espaço da promotoria"
                        fill
                        quality={100}
                        sizes="100vw"
                        className="object-cover "
                        priority
                    />
                        
                  
            
                </div>
            </div>
        </section>
    );
}
