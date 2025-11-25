"use client";

import { useEffect, useMemo, useState } from "react";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/api";

type Doador = {
  nome: string;
  data: string;
  valor?: number | string;
  link?: string;
  arquivo?: string;
  arquivoUrl?: string;
};

export type DonationStats = {
  total: number;
  doadores: Doador[];
};

export function TransparencyPanel() {
  const [stats, setStats] = useState<DonationStats>({ total: 0, doadores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currencyFormatter = useMemo(() => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }), []);

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }), []);

  const formattedTotal = useMemo(() => currencyFormatter.format(stats.total || 0), [currencyFormatter, stats.total]);

  const formatDonationDate = (value: string) => {
    if (!value) return "—";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }
    return dateFormatter.format(parsed);
  };

  const formatDonationValue = (value: Doador["valor"]) => {
    if (value === undefined || value === null || value === "") {
      return "—";
    }

    const normalized = typeof value === "number"
      ? value
      : Number(String(value).replace(/\./g, "").replace(",", "."));

    if (!Number.isFinite(normalized) || normalized <= 0) {
      return "—";
    }

    return currencyFormatter.format(normalized);
  };

  const resolveDonationLink = (donor: Doador) => donor.link ?? donor.arquivoUrl ?? donor.arquivo ?? "";

  const fetchStats = async () => {
    try {
      setError(null);
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Falha ao carregar os dados");

      const data: DonationStats = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a lista de doadores agora.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const intervalId = setInterval(fetchStats, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#1B2631] p-8 text-white shadow-2xl lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Transparência
            </p>
            <h2 className="font-serif text-3xl font-semibold text-white">
              Quem já garantiu um lugar à mesa
            </h2>
          </div>
          <button
            onClick={fetchStats}
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-white"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Atualizar"}
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <p className="text-sm text-white/60 uppercase tracking-widest">Total Arrecadado</p>
            <p className="mt-1 text-4xl font-bold text-[#C5A059]">{formattedTotal}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-[#1B2631] text-xs uppercase tracking-widest text-white/50">
                  <tr>
                    <th className="pb-4 font-normal">Data da Doação</th>
                    <th className="pb-4 font-normal">Nome do Doador</th>
                    <th className="pb-4 text-right font-normal">Valor da Doação</th>
                    <th className="pb-4 text-right font-normal">Comprovante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-white/60">
                        Carregando lista de doadores...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-red-300">
                        {error}
                      </td>
                    </tr>
                  ) : stats.doadores && stats.doadores.length > 0 ? (
                    stats.doadores.map((d, i) => {
                      const donationLink = resolveDonationLink(d);
                      return (
                        <tr key={`${d.nome}-${i}`} className="group">
                          <td className="py-4 text-white/70">
                            {formatDonationDate(d.data)}
                          </td>
                          <td className="py-4 font-medium text-white group-hover:text-[#C5A059] transition-colors">
                            {d.nome}
                          </td>
                          <td className="py-4 text-right font-semibold text-[#C5A059]">
                            {formatDonationValue(d.valor)}
                          </td>
                          <td className="py-4 text-right">
                            {donationLink ? (
                              <a
                                href={donationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold uppercase tracking-wide text-white/70 underline-offset-2 hover:text-[#C5A059] hover:underline"
                              >
                                Abrir arquivo
                              </a>
                            ) : (
                              <span className="text-white/40">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-white/40 italic">
                        Ainda não há doações registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          * Atualizamos automaticamente a cada 30 segundos.
        </p>
      </div>
    </section>
  );
}
