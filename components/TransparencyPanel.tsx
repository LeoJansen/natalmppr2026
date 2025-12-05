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
        if (Number.isNaN(parsed.getTime())) return value;
        return dateFormatter.format(parsed);
    };

    const formatDonationValue = (value: Doador["valor"]) => {
        if (value === undefined || value === null || value === "") return "—";

        const normalized = typeof value === "number"
            ? value
            : Number(String(value).replace(/\./g, "").replace(",", "."));

        if (!Number.isFinite(normalized) || normalized <= 0) return "—";

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
        <>
            <section className="w-full px-4 py-12 md:hidden">
                <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 text-center shadow-lg">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        Transparência
                    </p>
                    <p className="text-sm text-[#94a3b8]">
                        Para consultar o extrato detalhado, acesse via desktop.
                    </p>
                </div>
            </section>

            <section className="hidden w-full px-4 py-24 md:block bg-[#020617] relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#020617] opacity-60"></div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#EB9E50]">
                                Transparência
                            </p>
                            <h2 className="font-playfair text-4xl font-medium text-white">
                                Quem já garantiu um lugar à mesa
                            </h2>
                        </div>
                        <button
                            onClick={fetchStats}
                            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-[#EB9E50]/50"
                            disabled={loading}
                        >
                            <span className={`h-2 w-2 rounded-full bg-[#EB9E50] ${loading ? 'animate-pulse' : ''}`} />
                            {loading ? "Atualizando..." : "Atualizar Dados"}
                        </button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                        {/* Total Card */}
                        <div className="glass-card h-fit rounded-3xl p-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">Total Arrecadado</p>
                            <p className="mt-4 font-playfair text-5xl font-medium text-[#EB9E50]">{formattedTotal}</p>
                            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
                                <div className="h-full w-24 rounded-full bg-[#EB9E50]/50" />
                            </div>
                            <p className="mt-4 text-sm text-[#64748b]">
                                * Valores atualizados em tempo real.
                            </p>
                        </div>

                        {/* Table Card */}
                        <div className="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-[#0f172a]/40">
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-[#0f172a] text-xs font-bold uppercase tracking-widest text-[#64748b] shadow-sm">
                                        <tr>
                                            <th className="px-6 py-5 font-bold">Data</th>
                                            <th className="px-6 py-5 font-bold">Doador</th>
                                            <th className="px-6 py-5 text-right font-bold">Valor</th>
                                            <th className="px-6 py-5 text-right font-bold">Comprovante</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {loading && stats.doadores.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-[#94a3b8]">
                                                    Carregando lista de doadores...
                                                </td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-red-400">
                                                    {error}
                                                </td>
                                            </tr>
                                        ) : stats.doadores.length > 0 ? (
                                            stats.doadores.map((d, i) => {
                                                const donationLink = resolveDonationLink(d);
                                                return (
                                                    <tr key={`${d.nome}-${i}`} className="group transition-colors hover:bg-white/[0.02]">
                                                        <td className="px-6 py-4 text-[#94a3b8] group-hover:text-white transition-colors">
                                                            {formatDonationDate(d.data)}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-white">
                                                            {d.nome}
                                                        </td>
                                                        <td className="px-6 py-4 text-right font-medium text-[#EB9E50]">
                                                            {formatDonationValue(d.valor)}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            {donationLink ? (
                                                                <a
                                                                    href={donationLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#94a3b8] transition-colors hover:border-[#D4AF37]/30 hover:text-[#D4AF37]"
                                                                >
                                                                    Ver Arquivo
                                                                </a>
                                                            ) : (
                                                                <span className="text-white/10">—</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-[#64748b] italic">
                                                    Ainda não há doações registradas.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
