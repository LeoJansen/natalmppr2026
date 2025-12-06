"use client";

import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { useState, useRef } from "react";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

export function CertificateGenerator() {
  const [donorName, setDonorName] = useState("Dra. Vicenária Silva");
  // Mensagem padrão sem uso de IA
  const [message, setMessage] = useState(
    "Por manter acesa a chama do cuidado que aquece cada família do nosso MPPR. Sua doação garante um lugar à mesa para aqueles que cuidam de nós todos os dias."
  );
  
  // Referência para a área de impressão
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#EBEBE6] px-4 py-16 print:bg-white print:p-0">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-area, #certificate-area * {
            visibility: visible;
          }
          #certificate-area {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            z-index: 9999;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(0.9); /* Ajuste para caber na folha A4 */
          }
          /* Esconde a barra de controles na impressão */
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Área de Controles (Escondida na impressão) */}
        <div className="no-print rounded-3xl bg-white p-8 shadow-lg border border-[#C5A059]/20">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-[#C5A059]">
              Uso Interno
            </p>
            <h2 className="font-serif text-3xl text-[#1B2631]">
              Gerador de Certificados
            </h2>
            <p className="mt-2 text-[#333]/70">
              Gere certificados digitais personalizados para enviar aos doadores via WhatsApp ou E-mail.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label
                htmlFor="donor-name"
                className="mb-2 block text-xs font-bold uppercase text-[#1B2631]/60"
              >
                Nome do Doador
              </label>
              <input
                id="donor-name"
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F9F9F9] p-3 text-[#1B2631] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="custom-message"
                className="mb-2 block text-xs font-bold uppercase text-[#1B2631]/60"
              >
                Mensagem Personalizada
              </label>
              <textarea
                id="custom-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F9F9F9] p-3 text-[#1B2631] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] h-[52px] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-lg bg-[#C5A059] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#d4a045]"
              >
                <span>🖨️</span> Salvar PDF
              </button>
            </div>
          </div>
        </div>

        {/* O Certificado (Visualização) */}
        <div className="overflow-auto py-4 flex justify-center">
          <div
            id="certificate-area"
            ref={certificateRef}
            className="certificate-paper relative h-[794px] w-[1123px] min-w-[1123px] overflow-hidden bg-[#FDFDFC] text-[#0f254a] shadow-2xl"
          >
            {/* --- Elementos Decorativos --- */}
            {/* Borda Grossa */}
            <div className="absolute inset-5 border-4 border-[#0f254a] z-20 m-29 mx-39" />
            {/* Borda Fina Dourada */}
            <div className="absolute inset-8 border border-[#d4a045] z-20 m-30 mx-40" />

            {/* Cantos Decorativos (Círculos/Meias-luas) */}
            <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full border border-[#5d8bff] opacity-50 z-20" />
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full border border-[#5d8bff] opacity-50 z-20" />
            <div className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full border border-[#5d8bff] opacity-50 z-20" />
            <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full border border-[#5d8bff] opacity-50 z-20" />

            {/* Glow Central */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#5d8bff]/10 to-transparent z-10" />

            {/* --- Conteúdo --- */}
            <div className="relative z-10 flex h-full flex-col items-center justify-start px-40 py-16 text-center overflow-hidden">
                <Image
                  src="/back-certificado3.png"
                  alt="Logo Natal da Nossa Casa 2026"
                  fill
                  quality={100}
                  sizes="(min-width: 1123px) 1123px, 100vw"
                  className="object-cover -z-10"
                />
              {/* Cabeçalho */}
              <div className="mt-4 z-10 p-20">
                <h1 className="font-serif text-[50px] font-bold leading-none text-[#0f254a]">
                  Natal da Nossa Casa <span className="text-[#5d8bff]">2026</span>
                </h1>
                <div className="mt-4 inline-block rounded-full border border-[#d4a045] px-6 py-2 font-sans text-sm font-medium uppercase tracking-widest text-[#d4a045] ">
                  10 anos de história
                </div>
              </div>
              <div className="absolute top-1/3 right-1/5">
                <Image
                  src="/carimbo.png"
                  alt="Logo Natal da Nossa Casa 2026"
                  width={120}
                  height={120}
                  quality={100}
                  className="mb-8 rounded-full"
                />  

              </div>

              {/* Corpo */}
              <div className="flex flex-col items-center justify-center z-10">
                <p className="font-sans text-base uppercase tracking-[0.2em] text-[#666]">
                  Certificado de Gratidão conferido a
                </p>

                <div
                  className={`mb-8 px-4 text-[60px] leading-tight text-[#0f254a] drop-shadow-sm ${greatVibes.className}`}
                >
                  {donorName}
                </div>

                <p className="max-w-2xl font-serif text-base leading-relaxed text-[#636363]">
                  {message}
                </p>
              </div>

              {/* Rodapé / Assinaturas */}
              <div className="mb-4 flex w-full items-end justify-between px-12">
                <div className="text-center">
                  <div className="mb-2 font-pinyon text-xl text-[#666]">
                    Léo Jansen
                  </div>
                  <div className="mb-2 h-px w-56 bg-[#0f254a]/30" />
                  <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0f254a]">
                   Organização da Campanha
                  </div>
                </div>

                <div className="flex h-full items-center">
                 <Image
                 src="/logo-certificado.png"
                 alt="Assinatura Roberto"
                 width={759}
                 height={769}
                 quality={100}
                 className="w-40 rounded-full"
                 />
                </div>

                <div className="text-center">
                  <div className="mb-3 font-sans text-sm text-[#666]">
                    Dezembro, 2025
                  </div>
                  <div className="mb-2 h-px w-56 bg-[#0f254a]/30" />
                  <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0f254a]">
                    Data da Emissão
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-[#333]/40 no-print">
          * Este gerador roda localmente no seu navegador. Nenhum dado pessoal é salvo no servidor.
        </p>
      </div>
    </section>
  );
}