export const pixKey = "45999211778";
export const goal = 1_000_000;
export const raised = 720_000;

export const calculateProgressPct = (amountRaised: number, target: number) =>
  Math.min(Math.round((amountRaised / target) * 100), 100);
