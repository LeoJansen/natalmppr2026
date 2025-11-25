import { calculateProgressPct } from "@/lib/campaignData";

type GoalSectionProps = {
  goal: number;
  raised: number;
};

export function GoalSection({ goal, raised }: GoalSectionProps) {
  const progressPct = calculateProgressPct(raised, goal);

  return (
    <section className=" bg-white px-8 py-12 ">
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
              <rect width={progressPct} height="12" fill="#C5A059" rx="6" />
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
