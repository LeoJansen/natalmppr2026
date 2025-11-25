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
    <section id="doacao" className="w-full ">
      <div className=" border border-[#C5A059]/40 bg-white p-10 text-center shadow-[0_40px_120px_rgba(27,38,49,0.08)]">
        <p className="text-sm tracking-[0.25em] text-[#C5A059]">Doação via PIX</p>
        <h2 className="mt-4 text-3xl text-[#1B2631]">Chave exclusiva para doação</h2>
        <p className="mt-4 text-lg text-[#333333]/80">
         Após fazer o depósito, por gentileza, envie o comprovante no formulário abaixo.
        </p>
        <div className="mt-8 rounded-2xl border border-[#E4E1D4] bg-[#FDFBF6] px-6 py-5 text-lg font-semibold tracking-wide text-[#1B2631]">
          {pixKey}
        </div>
        <CopyPixButton pixKey={pixKey} />
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
      className="mt-6 inline-flex items-center justify-center rounded-full bg-[#C5A059] px-10 py-3 text-base font-semibold tracking-wide text-[#1B2631] transition hover:bg-[#d7b676]"
    >
      {copied ? "Chave copiada" : "Copiar Chave"}
    </button>
  );
}
