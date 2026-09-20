/** Deterministic implementation of docs/calorie-calculation.md. No network or UI dependencies. */
export type Sex = "male" | "female";
export const sports = {
  strength: 3.5,
  running: 7.5,
  cycling: 7,
  swimming: 5.8,
  hiit: 7,
  team: 7,
  yoga: 2.5,
  other: 5,
} as const;
export type Sport = keyof typeof sports;
export type Training = { sport: Sport; sessions: number; minutes: number };
export type Input = {
  sex: Sex;
  age: number;
  height: number;
  weight: number;
  bodyFat?: number;
  activity: number;
  steps: number;
  training: Training[];
  goalKind: "weight" | "bodyFat";
  goal: number;
  days: number;
  macros: boolean;
  cheat?: { weekday: number; calories: number };
  manualCalories?: number;
};
export type Calculation = {
  rmr: number;
  activity: number;
  steps: number;
  training: number;
  maintenance: number;
  targetWeight: number;
  deficit: number;
  calculatedCalories: number;
  calories: number;
  minimum: number;
  weeklyBudget: number;
  daily: number[];
  warnings: string[];
  blocked: boolean;
};
export const initialInput: Input = {
  sex: "female",
  age: 25,
  height: 162,
  weight: 66,
  activity: 0,
  steps: 5000,
  training: [],
  goalKind: "weight",
  goal: 62,
  days: 92,
  macros: true,
};
const activityProfiles = [
  [
    [7, 1.3],
    [1, 1.8],
  ],
  [
    [4, 1.3],
    [4, 1.8],
  ],
  [
    [1, 1.3],
    [6, 1.8],
    [1, 3.3],
  ],
  [
    [2, 1.3],
    [4, 1.8],
    [1.5, 3.3],
    [0.5, 4.5],
  ],
  [
    [1, 1.3],
    [3, 1.8],
    [2.5, 3.3],
    [1.5, 4.5],
  ],
];
function range(value: number, min: number, max: number, label: string) {
  if (!Number.isFinite(value) || value < min || value > max)
    throw new Error(
      `${label}: Bitte einen Wert zwischen ${min} und ${max} eingeben.`,
    );
}
export function validate(input: Input) {
  if (!["male", "female"].includes(input.sex))
    throw new Error("Bitte eine Berechnungskategorie wählen.");
  range(input.age, 18, 100, "Alter");
  range(input.height, 120, 230, "Größe");
  range(input.weight, 35, 300, "Gewicht");
  range(input.activity, 0, 4, "Alltag");
  if (!Number.isInteger(input.activity))
    throw new Error("Ungültiges Aktivitätsprofil.");
  range(input.steps, 0, 50000, "Schritte");
  range(input.days, 7, 730, "Zeitraum");
  if (!Number.isInteger(input.days))
    throw new Error("Bitte ganze Tage eingeben.");
  if (input.bodyFat !== undefined)
    range(input.bodyFat, 3, 65, "Körperfettanteil");
  if (input.goalKind === "bodyFat") {
    if (input.bodyFat === undefined)
      throw new Error("Für dieses Ziel fehlt dein aktueller Körperfettanteil.");
    range(input.goal, 3, input.bodyFat, "Ziel-Körperfettanteil");
  } else if (input.goalKind === "weight")
    range(input.goal, 35, input.weight, "Zielgewicht");
  else throw new Error("Ungültige Zielart.");
  if (!Array.isArray(input.training))
    throw new Error("Ungültige Trainingsdaten.");
  for (const t of input.training) {
    if (!(t.sport in sports)) throw new Error("Ungültige Sportart.");
    range(t.sessions, 0, 14, "Einheiten");
    range(t.minutes, 5, 300, "Trainingsdauer");
  }
  if (input.cheat) {
    range(input.cheat.weekday, 0, 6, "Wochentag");
    if (!Number.isInteger(input.cheat.weekday))
      throw new Error("Ungültiger Wochentag.");
    range(input.cheat.calories, 50, 10000, "Cheat-Day-Kalorien");
    if (input.cheat.calories % 50 !== 0)
      throw new Error("Cheat-Day-Kalorien in 50er-Schritten wählen.");
  }
  if (input.manualCalories !== undefined)
    range(input.manualCalories, 1, 10000, "Manuelles Kalorienziel");
}
export function calculate(input: Input): Calculation {
  validate(input);
  const { weight, height, age, bodyFat } = input;
  const rmr =
    bodyFat === undefined
      ? 10 * weight +
        6.25 * height -
        5 * age +
        (input.sex === "male" ? 5 : -161)
      : 500 + 22 * weight * (1 - bodyFat / 100);
  const net = (met: number, minutes: number) =>
    ((met * 3.5 * weight) / 200 - rmr / 1440) * minutes;
  const activity =
    (activityProfiles[input.activity].reduce(
      (total, [hours, met]) => total + net(met, hours * 60),
      0,
    ) *
      5) /
    7;
  const steps =
    ((input.steps * ((height / 100) * 0.414)) / 1000) * weight * 0.57;
  const training = input.training.reduce(
    (sum, t) => sum + (net(sports[t.sport], t.minutes) * t.sessions) / 7,
    0,
  );
  const base = rmr + activity + steps + training;
  const maintenance = base / 0.9;
  const targetWeight =
    input.goalKind === "bodyFat"
      ? (weight * (1 - bodyFat! / 100)) / (1 - input.goal / 100)
      : input.goal;
  const deficit = ((weight - targetWeight) * 7700) / input.days;
  const calculatedCalories = (base - deficit) / 0.9;
  const calories = input.manualCalories ?? calculatedCalories;
  const minimum = Math.max(
    maintenance * 0.75,
    input.sex === "female" ? 1200 : 1500,
  );
  const warnings: string[] = [];
  let blocked = false;
  if (calories < minimum) {
    warnings.push(
      `Das Ziel liegt unter der vorgesehenen Untergrenze von ${Math.round(minimum)} kcal. Verlängere den Zeitraum oder reduziere die gewünschte Abnahme.`,
    );
    blocked = input.manualCalories === undefined;
  }
  if (input.manualCalories !== undefined)
    warnings.push(
      "Manuelles Kalorienziel: Die berechnete Zielprognose passt möglicherweise nicht mehr zum Zeitraum.",
    );
  const weeklyBudget = Math.round(calories * 7);
  const daily = Array<number>(7).fill(0);
  const days = [0, 1, 2, 3, 4, 5, 6].filter((d) => d !== input.cheat?.weekday);
  let remaining = weeklyBudget;
  if (input.cheat) {
    const max = Math.floor((calories + 1500) / 50) * 50;
    if (input.cheat.calories > max) {
      warnings.push(`Der Cheat Day darf höchstens ${max} kcal enthalten.`);
      blocked = true;
    }
    daily[input.cheat.weekday] = input.cheat.calories;
    remaining -= input.cheat.calories;
  }
  const regular = Math.floor(remaining / days.length);
  const remainder = remaining - regular * days.length;
  days.forEach((d, i) => {
    daily[d] = regular + (i < remainder ? 1 : 0);
  });
  if (input.cheat && regular < minimum)
    warnings.push(
      "Durch den Cheat Day liegen reguläre Tage unter der vorgesehenen Untergrenze. Reduziere den Cheat Day oder passe den Plan an.",
    );
  if (daily.some((c) => c <= 0)) {
    warnings.push("Die Verteilung ergibt kein positives Tagesziel.");
    blocked = true;
  }
  if (input.macros && daily.some((c) => macrosFor(c, input).carbs < 0)) {
    warnings.push("Für diese Makroverteilung reichen die Kalorien nicht aus.");
    blocked = true;
  }
  return {
    rmr,
    activity,
    steps,
    training,
    maintenance,
    targetWeight,
    deficit,
    calculatedCalories,
    calories,
    minimum,
    weeklyBudget,
    daily,
    warnings,
    blocked,
  };
}
export function macrosFor(calories: number, input: Input) {
  const sessions = input.training.reduce((sum, t) => sum + t.sessions, 0);
  const protein = Math.round(input.weight * (sessions < 3 ? 1.4 : 2));
  const fat = Math.round((calories * 0.3) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  return { protein, fat, carbs };
}
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const result = new Date(Date.UTC(y, m - 1, d + days));
  return result.toISOString().slice(0, 10);
}
export function daysBetween(start: string, end: string): number {
  return Math.round(
    (Date.parse(end + "T00:00:00Z") - Date.parse(start + "T00:00:00Z")) /
      86400000,
  );
}
export type Plan = {
  id: string;
  createdAt: string;
  start: string;
  end: string;
  input: Input;
  result: Calculation;
};
export function makePlan(input: Input, start = localDate()): Plan {
  const result = calculate(input);
  if (result.blocked) throw new Error(result.warnings.join("\n"));
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
    start,
    end: addDays(start, input.days - 1),
    input: {
      ...input,
      training: input.training.map((t) => ({ ...t })),
      cheat: input.cheat ? { ...input.cheat } : undefined,
    },
    result,
  };
}
