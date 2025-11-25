"use client";

import { useState } from "react";

const pixKey = "natal2026@institutoempresa.com";
const goal = 1000000;
const raised = 720000;
const progressPct = Math.min(Math.round((raised / goal) * 100), 100);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#333333]">
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <HeroSection />
        <ManifestSection />
        
        <DonationCard />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-4xl bg-[#1B2631] px-8 py-16 text-white shadow-2xl md:px-16">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.35),transparent_55%)]" />
      </div>
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/30 px-5 py-1 text-sm tracking-[0.18em] uppercase text-white/80">
            Campanha dos Membros e Servidores do MPPR da Comarca de Foz do Iguaçu - 2026
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Natal da Nossa Casa 2026
            </h1>
            <p className="text-lg text-white/80 sm:text-xl">
              Quem cuida de nós o ano inteiro, merece um lugar à mesa de Natal.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center">
            <a
              href="#doacao"
              className="inline-flex items-center justify-center rounded-full bg-[#C5A059] px-8 py-3 text-base font-semibold tracking-wide text-[#1B2631] transition hover:bg-[#d7b676]"
            >
              PARTICIPAR AGORA
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}

function ManifestSection() {
  return (
    <section className="grid gap-10 rounded-[28px] bg-[#F5F5F0] px-4 py-4 md:grid-cols-2 md:gap-16">
      <div className="space-y-6 rounded-3xl bg-white p-10 shadow-xl">
        <p className="text-sm tracking-[0.25em] text-[#C5A059]">Manifesto</p>
        <h2 className="text-3xl text-[#1B2631]">Gratidão que se materializa em dignidade.</h2>
        <p className="text-lg text-[#333333]/90">
          “Natal da Nossa Casa” nasceu do desejo de devolver cuidado a quem mantém nossos espaços limpos, seguros e acolhedores o ano inteiro. São profissionais invisíveis que sustentam nossa rotina corporativa.
        </p>
        <p className="text-lg text-[#333333]/90">
          Nesta edição, convidamos a sua organização a financiar cestas frescas, experiências afetivas e memoráveis mesas coletivas, garantindo que cada colaborador terceirizado vivencie um Natal completo junto das suas famílias.
        </p>
        <ul className="space-y-3 text-base text-[#1B2631]">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#C5A059]" aria-hidden />
            Relatórios de impacto e agradecimento exclusivo para os mantenedores.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#C5A059]" aria-hidden />
            Entregas presenciais com participação dos times executivos.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#C5A059]" aria-hidden />
            Curadoria alimentar com nutricionistas e pequenos produtores parceiros.
          </li>
        </ul>
      </div>
      <div className="relative rounded-3xl">
        <div className="manifest-image h-full min-h-[360px] rounded-3xl border border-[#C5A059]/30 shadow-2xl">
          <div className="flex h-full w-full flex-col items-start justify-end rounded-3xl p-8 text-white">
            <p className="text-lg font-semibold">Cuidado que ilumina</p>
            <p className="max-w-sm text-sm text-white/80">
              Simbolizamos nosso compromisso com mãos que acolhem calor e esperança. É assim que cada doação chega às famílias assistidas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoalSection() {
  return (
    <section className="rounded-[28px] bg-white px-8 py-12 shadow-xl">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <p className="text-sm tracking-[0.25em] text-[#C5A059]">Meta 2026</p>
          <h2 className="text-3xl text-[#1B2631]">Juntos rumo a R$ 1 milhão em cuidado.</h2>
          <p className="text-lg text-[#333333]/80">
            As contribuições financiam cestas especiais, cartões de experiência, transporte solidário e apoio psicológico para famílias cuidadoras.
          </p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center justify-between text-sm font-semibold text-[#1B2631]">
            <span>R$ {raised.toLocaleString("pt-BR")}</span>
            <span>Meta R$ {goal.toLocaleString("pt-BR")}</span>
          </div>
          <div className="h-3 rounded-full bg-[#E4E1D4]">
            <svg
              viewBox="0 0 100 12"
              className="h-full w-full"
              role="img"
              aria-label={`Progresso de ${progressPct}% da meta`}
            >
              <rect width="100" height="12" fill="transparent" rx="6" />
              <rect
                width={progressPct}
                height="12"
                fill="#C5A059"
                rx="6"
              />
            </svg>
          </div>
          <p className="text-sm text-[#333333]/70">{progressPct}% da meta alcançada</p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-4xl font-semibold text-[#1B2631]">R$ 5k</p>
              <p className="text-sm text-[#333333]/70">Kit Natal completo para 15 famílias</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-[#1B2631]">R$ 25k</p>
              <p className="text-sm text-[#333333]/70">Experiência de ceia coletiva com equipe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationCard() {
  return (
    <section id="doacao" className="mx-auto w-full max-w-3xl">
      <div className="rounded-4xl border border-[#C5A059]/40 bg-white p-10 text-center shadow-[0_40px_120px_rgba(27,38,49,0.08)]">
        <p className="text-sm tracking-[0.25em] text-[#C5A059]">Doação Corporativa via PIX</p>
        <h2 className="mt-4 text-3xl text-[#1B2631]">Chave exclusiva para empresas mantenedoras</h2>
        <p className="mt-4 text-lg text-[#333333]/80">
          Adicione o CNPJ da sua empresa na mensagem para receber o relatório personalizado e o selo de apoiador institucional.
        </p>
        <div className="mt-8 rounded-2xl border border-[#E4E1D4] bg-[#FDFBF6] px-6 py-5 text-lg font-semibold tracking-wide text-[#1B2631]">
          {pixKey}
        </div>
        <CopyPixButton />
      </div>
    </section>
  );
}

function CopyPixButton() {
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
      className="mt-6 inline-flex items-center justify-center rounded-full bg-[#C5A059] px-10 py-3 text-base font-semibold tracking-wide text-[#1B2631] transition hover:bg-[#d7b676]"
    >
      {copied ? "Chave copiada" : "Copiar Chave"}
    </button>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-[#1B2631] px-6 py-8 text-center text-sm text-white/70">
      © {new Date().getFullYear()} Instituto Nossa Casa · Campanha de Doação Corporativa.
    </footer>
  );
}
