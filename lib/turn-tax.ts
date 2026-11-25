import model from "../content/turn-tax-model.json" with { type: "json" };

export type PayMode = "annual" | "hourly";

export type TurnTaxInput = {
  positionIndex: number;
  pay: number;
  payMode: PayMode;
  headcount: number;
  departures: number;
};

export type CostLine = {
  name: string;
  weight: number;
  dollars: number;
};

export type TurnTaxResult = {
  position: string;
  annualSalary: number;
  turnoverPercent: number;
  perDeparture: number;
  perYear: number;
  perYearLow: number;
  perYearHigh: number;
  threeYear: number;
  midpointPercent: number;
  breakdown: CostLine[];
};

const roles: { label: string; match: (tier: string) => boolean }[] = [
  { label: "Frontline", match: (tier) => tier.startsWith("Frontline") },
  { label: "Mid-level manager", match: (tier) => tier === "Manager" },
  { label: "Executive", match: (tier) => tier === "Executive" },
];

export const roleOptions = roles.map((role) => role.label);

export const costCategories = model.categories;

function averageProfile(index: number) {
  const role = roles[index];
  if (!role) return null;
  const matched = model.profiles.filter((profile) => role.match(profile.tier));
  if (!matched.length) return null;
  const avg = (read: (profile: (typeof matched)[number]) => number) =>
    matched.reduce((sum, profile) => sum + read(profile), 0) / matched.length;
  return {
    position: role.label,
    low: avg((profile) => profile.low),
    high: avg((profile) => profile.high),
    weights: model.categories.map((_, index) => avg((profile) => profile.weights[index] ?? 0)),
  };
}

export function annualize(pay: number, mode: PayMode) {
  return mode === "hourly" ? pay * 40 * 52 : pay;
}

/** Same math as the live eip360.com calculator: 4 inputs, 13 categories, role-based. */
export function calculateTurnTax(input: TurnTaxInput): TurnTaxResult | null {
  const position = averageProfile(input.positionIndex);
  if (!position) return null;
  const annualSalary = annualize(input.pay, input.payMode);
  const { headcount, departures } = input;
  if (!(annualSalary > 0) || !(headcount > 0) || !(departures > 0)) return null;
  const perDeparture = annualSalary * ((position.low + position.high) / 2);
  const perYear = departures * perDeparture;
  const breakdown = model.categories
    .map((name, index) => ({
      name,
      weight: position.weights[index] ?? 0,
      dollars: perYear * (position.weights[index] ?? 0),
    }))
    .filter((line) => line.weight > 0)
    .sort((a, b) => b.dollars - a.dollars);
  return {
    position: position.position,
    annualSalary,
    turnoverPercent: (departures / headcount) * 100,
    perDeparture,
    perYear,
    perYearLow: departures * annualSalary * position.low,
    perYearHigh: departures * annualSalary * position.high,
    threeYear: perYear * 3,
    midpointPercent: Math.round(((position.low + position.high) / 2) * 100),
    breakdown,
  };
}

export function formatMoney(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}
