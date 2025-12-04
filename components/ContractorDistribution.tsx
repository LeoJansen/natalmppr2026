"use client";

import { useEffect, useMemo, useState } from "react";
import { contractors } from "@/lib/contractors";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/api";

const REFRESH_INTERVAL_MS = 30_000;

type DonationResponse = {
  total?: number | string;
};

export function ContractorDistribution() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currencyFormatter = useMemo(() => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }), []);

  const contractorCount = contractors.length;
  const perPersonShare = contractorCount > 0 ? totalRaised / contractorCount : 0;
  const formattedShare = perPersonShare > 0 ? currencyFormatter.format(perPersonShare) : "—";
  const formattedTotal = currencyFormatter.format(totalRaised || 0);

  useEffect(() => {
    let mounted = true;

    const fetchTotal = async () => {
      try {
        setError(null);
        const res = await fetch(GOOGLE_APPS_SCRIPT_URL, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Falha ao carregar o total arrecadado");
        }

        const data: DonationResponse = await res.json();
        if (!mounted) return;

        const normalizedTotal = typeof data.total === "string"
          ? Number(data.total.replace(/\./g, "").replace(",", "."))
          : Number(data.total ?? 0);

        setTotalRaised(Number.isFinite(normalizedTotal) ? normalizedTotal : 0);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Não foi possível calcular o rateio agora.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTotal();
    const intervalId = setInterval(fetchTotal, REFRESH_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#EBB550]/30 bg-[#070713] p-6 shadow-[0_30px_120px_rgba(27,38,49,0.10)] backdrop-blur lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059]">Rateio entre terceirizados</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#d3c19f]">Como cada colaborador será reconhecido</h2>
            <p className="mt-4 max-w-2xl text-base text-[#A1A1A1]/80">
              Atualizamos automaticamente o valor individual com base no total arrecadado. Cada pessoa receberá uma parte
              igualitária assim que os comprovantes de depósito forem anexados.
            </p>
          </div>
          <div className="grid w-full gap-4 sm:w-auto sm:min-w-[220px]">
            <div className="rounded-2xl border border-[#1B2631]/10 bg-[#0f0f29] p-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Total arrecadado</p>
              <p className="mt-2 text-2xl font-bold text-[#EBB550]">{loading && totalRaised === 0 ? "Calculando..." : formattedTotal}</p>
            </div>
            <div className="rounded-2xl border border-[#EBB550]/30 bg-[#0f0f29] p-4 text-[#d3d9df]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059]">Quota individual estimada</p>
              <p className="mt-2 text-2xl font-bold">{loading ? "—" : formattedShare}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-[#FFF9EF] p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#1B2631]/10">
          <div className="max-h-[520px] overflow-y-auto">
            <table className="min-w-full divide-y divide-[#E4E4E4] text-left text-sm text-[#1B2631]">
              <thead className="bg-[#0f0f29] text-xs font-semibold uppercase tracking-wider text-[#7A6A4C]">
                <tr>
                  <th className="px-4 py-4">Nome</th>
                  <th className="px-4 py-4">Função</th>
                  <th className="px-4 py-4 text-center">Valor estimado</th>
                  <th className="px-4 py-4 text-center">Comprovante de depósito</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0]">
                {contractors.map((contractor) => (
                  <tr key={contractor.nome} className="bg-[hsl(240,46%,15%)] backdrop-blur transition hover:bg-[#FFF9EF]">
                    <td className="px-4 py-4 font-semibold text-[#808c97]">
                      <div>{contractor.nome}</div>
                      <p className="text-xs font-normal text-[#6F6F6F]">{contractor.empresa} • {contractor.lotacao}</p>
                    </td>
                    <td className="px-4 py-4 text-[#8b8b8b]">{contractor.funcao}</td>
                    <td className="px-4 py-4 text-center font-bold text-[#697683]">
                      {loading && totalRaised === 0 ? "—" : formattedShare}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center rounded-full border border-dashed border-[#C5A059] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                        Aguardando envio
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
