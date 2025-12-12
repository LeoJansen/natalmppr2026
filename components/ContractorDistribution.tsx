"use client";

import { useEffect, useMemo, useState } from "react";
import { contractors } from "@/lib/contractors";
import { DONATIONS_API_URL } from "@/lib/api";

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
                const res = await fetch(DONATIONS_API_URL, { cache: "no-store" });
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
        <section className="w-full bg-[#020617] px-4 pb-24 pt-8 relative">
            {/* Separator */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/5"></div>

            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Rateio entre terceirizados</p>
                        <h2 className="font-playfair text-3xl font-medium text-white md:text-4xl">
                            Como garantimos que todos recebam o reconhecimento
                        </h2>
                        <p className="mt-4 text-[#94a3b8] leading-relaxed">
                            O total arrecadado é dividido igualmente entre todos os colaboradores listados abaixo.
                            O repasse é feito assim que a campanha for encerrada.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="glass-card rounded-2xl p-6 min-w-[200px]">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">Total</p>
                            <p className="mt-2 text-2xl font-bold text-[#EB9E50]">{loading && totalRaised === 0 ? "..." : formattedTotal}</p>
                        </div>
                        <div className="glass-panel rounded-2xl border border-[#EB9E50]/30 bg-[#D4AF37]/5 p-6 min-w-[200px]">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#EB9E50]">Por Pessoa (Estimado)</p>
                            <p className="mt-2 text-2xl font-bold text-white">{loading ? "—" : formattedShare}</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div className="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-[#0f172a]/40">
                    <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-[#0f172a] text-xs font-bold uppercase tracking-widest text-[#64748b] shadow-sm">
                                <tr>
                                    <th className="px-6 py-5 font-bold">Colaborador</th>
                                    <th className="px-6 py-5 font-bold">Função / Empresa</th>
                                    <th className="px-6 py-5 text-center font-bold">Cota Individual</th>
                                    <th className="px-6 py-5 text-center font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {contractors.map((contractor) => (
                                    <tr key={contractor.nome} className="group transition-colors hover:bg-white/[0.02]">
                                        <td className="px-6 py-4 font-medium text-white group-hover:text-[#EB9E50] transition-colors">
                                            {contractor.nome}
                                        </td>
                                        <td className="px-6 py-4 text-[#94a3b8]">
                                            <div>{contractor.funcao}</div>
                                            <div className="text-xs text-[#64748b]">{contractor.empresa} • {contractor.lotacao}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium text-[#EB9E50]">
                                            {loading && totalRaised === 0 ? "—" : formattedShare}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] group-hover:bg-[#EB9E50]/10 group-hover:text-[#EB9E50] group-hover:border-[#EB9E50]/20 transition-all">
                                                Aguardando
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
