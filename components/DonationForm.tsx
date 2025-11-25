"use client";

import { type FormEvent, useState } from "react";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/api";

export function DonationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    // Converter arquivo para Base64 para enviar ao Google Script
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
        // mode: 'no-cors' é essencial para enviar para o Google sem erro de bloqueio
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
        });

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

  if (success) {
    return (
      <section className="w-full px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#1B2631] p-10 text-center text-white shadow-2xl border border-[#C5A059]/30">
          <div className="mb-4 flex justify-center">
            <span className="text-6xl">✨</span>
          </div>
          <h3 className="mb-4 font-serif text-3xl font-bold text-[#C5A059]">
            Recebemos o seu gesto!
          </h3>
          <p className="text-lg text-white/80">
            Obrigado por transformar gratidão em dignidade. O seu lugar à mesa está garantido.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-8 text-sm text-[#C5A059] underline hover:text-white transition-colors"
          >
            Enviar outro comprovante
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F5F5F0] px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl lg:p-12 border-t-4 border-[#C5A059]">
        <h2 className="mb-6 font-serif text-3xl font-semibold text-[#1B2631]">
          Envie seu Comprovante
        </h2>
        <p className="mb-8 text-[#333333]/70">
          Preencha os dados abaixo para confirmarmos a sua contribuição na lista de doadores.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#1B2631]/60">
              Nome Completo
            </label>
            <input
              name="nome"
              type="text"
              required
              className="w-full rounded-lg border border-gray-200 bg-[#F9F9F9] p-4 text-[#1B2631] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
              placeholder="Como gostaria de ser identificado?"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#1B2631]/60">
              Valor da Doação (R$)
            </label>
            <input
              name="valor"
              type="number"
              required
              step="0.01"
              className="w-full rounded-lg border border-gray-200 bg-[#F9F9F9] p-4 text-[#1B2631] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
              placeholder="Ex: 300,00"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#1B2631]/60">
              Anexar Comprovante
            </label>
            <div className="relative">
              <input
                name="comprovante"
                type="file"
                accept="image/*,application/pdf"
                required
                className="w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-[#F9F9F9] p-3 text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#1B2631]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#1B2631] hover:bg-gray-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full rounded-full py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-all ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#C5A059] hover:bg-[#b08d4b] hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {loading ? "Enviando..." : "Confirmar Doação"}
          </button>
        </form>
      </div>
    </section>
  );
}