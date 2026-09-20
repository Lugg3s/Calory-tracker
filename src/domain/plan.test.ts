import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculate,
  initialInput,
  macrosFor,
  makePlan,
  addDays,
  daysBetween,
} from "./plan";
const example = {
  ...initialInput,
  training: [
    { sport: "other" as const, sessions: 1, minutes: 60 },
    { sport: "strength" as const, sessions: 1, minutes: 60 },
  ],
};
const near = (value: number, expected: number, tolerance = 1) =>
  assert.ok(Math.abs(value - expected) < tolerance, `${value} ≈ ${expected}`);
test("documented calculation, including intake-dependent TEF", () => {
  const r = calculate(example);
  near(r.rmr, 1386.5);
  near(r.activity, 209.4);
  near(r.steps, 126.2);
  near(r.training, 67.6);
  near(r.maintenance, 1988.6);
  near(r.calories, 1617);
  assert.equal(r.blocked, false);
});
test("Cunningham uses lean mass", () =>
  near(calculate({ ...example, bodyFat: 25 }).rmr, 1589, 0.01));
test("budget survives integer rounding and cheat allocation", () => {
  for (let d = 0; d < 7; d++) {
    const r = calculate({ ...example, cheat: { weekday: d, calories: 2350 } });
    assert.equal(r.daily[d], 2350);
    assert.equal(
      r.daily.reduce((a, b) => a + b, 0),
      r.weeklyBudget,
    );
    assert.ok(
      Math.max(...r.daily.filter((_, i) => i !== d)) -
        Math.min(...r.daily.filter((_, i) => i !== d)) <=
        1,
    );
  }
});
test("automatic aggressive plan blocked; explicit manual choice warns", () => {
  assert.equal(calculate({ ...example, goal: 58 }).blocked, true);
  assert.throws(() => makePlan({ ...example, goal: 58 }));
  const manual = calculate({ ...example, manualCalories: 1400 });
  assert.equal(manual.blocked, false);
  assert.ok(manual.warnings.length);
});
test("macros match documented examples", () => {
  assert.deepEqual(macrosFor(1800, { ...initialInput, weight: 75 }), {
    protein: 105,
    fat: 60,
    carbs: 210,
  });
  assert.deepEqual(
    macrosFor(1800, {
      ...initialInput,
      weight: 75,
      training: [{ sport: "strength", sessions: 3, minutes: 60 }],
    }),
    { protein: 150, fat: 60, carbs: 165 },
  );
});
test("invalid data and stale body fat goal rejected", () => {
  for (const v of [NaN, Infinity, 0, 400])
    assert.throws(() => calculate({ ...example, weight: v }));
  assert.throws(() => calculate({ ...example, goalKind: "bodyFat", goal: 20 }));
  assert.throws(() =>
    calculate({ ...example, cheat: { weekday: 7, calories: 2300 } }),
  );
});
test("calendar arithmetic across DST and year boundary", () => {
  assert.equal(addDays("2026-03-28", 2), "2026-03-30");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(daysBetween("2026-03-28", "2026-03-30"), 2);
});
test("body fat target conserves lean mass", () =>
  near(
    calculate({ ...example, bodyFat: 30, goalKind: "bodyFat", goal: 25 })
      .targetWeight,
    61.6,
    0.01,
  ));
