# Product Decisions

This file records product decisions made during ideation. Later decisions supersede earlier ones where explicitly stated.

## D-001 — Transparency is a core product feature
**Status:** decided

The app should show how the calorie target is calculated instead of only presenting a final number. The presentation should resemble a cost calculation with understandable components.

## D-002 — KFA is optional
**Status:** decided

The user does not need to provide current KFA to use the basic weight-loss planning flow.

## D-003 — Target KFA requires current KFA
**Status:** decided

Target KFA is only available when current KFA is known.

## D-004 — KFA affects RMR estimation when available
**Status:** decided

With current KFA, V1 uses a fat-free-mass-based RMR equation; without KFA it uses Mifflin-St. Jeor. See D-024.

## D-005 — KFA can provide an informational projection
**Status:** decided direction

If current KFA is known, the app may estimate future KFA after a specified weight change under an explicit constant-fat-free-mass assumption.

## D-006 — Calorie target is user-editable
**Status:** decided

The automatically calculated calorie target can be overridden in settings/an advanced area, not prominently on the main screen.

## D-007 — Macro tracking is optional
**Status:** decided

The app provides a calorie-only mode and an advanced calorie + protein + fat + carbohydrate mode.

## D-008 — Sport frequency determines the V1 protein tier
**Status:** decided

The already collected sport/training frequency is used for the protein recommendation. V1 does not require an additional question about muscle gain, muscle retention or a similar muscle-specific goal.

For the V1 threshold, **all regularly performed sports count**, not only strength training.

## D-009 — V1 protein rules
**Status:** decided

Protein is based on the user's **current actual body weight**:

```text
< 3 sport sessions/week  → 1.4 g protein/kg/day
>= 3 sport sessions/week → 2.0 g protein/kg/day
```

V1 deliberately does not introduce an adjusted reference weight, ideal weight, target-weight cap or KFA/FFM-based protein calculation. Such refinements can be reconsidered later.

## D-010 — V1 fat rule is 30% of daily calories
**Status:** decided

Fat is set to **30% of the applicable daily calorie budget**:

```text
fat kcal = daily calories × 0.30
fat grams = fat kcal / 9
```

This supersedes the earlier provisional `0.8 g/kg` fat rule.

## D-011 — Carbohydrates fill remaining calories
**Status:** decided

After protein and fat are calculated, carbohydrates receive the remaining calories:

```text
carb kcal = daily calories - protein kcal - fat kcal
carb grams = carb kcal / 4
```

If an unusually low calorie target makes the resulting macro distribution implausible, the app should review the calorie target/safety constraints rather than silently changing the macro rules.

## D-012 — MVP has no LLM dependency
**Status:** decided

The first MVP functions without an LLM. The deterministic calculation engine is the foundation.

## D-013 — Voice/LLM food tracking is a later feature
**Status:** decided direction

Longer term, users should be able to describe food, eventually by voice, and receive approximate intake estimates and suggestions.

## D-014 — AI is not the source of truth for core calculations
**Status:** decided direction

AI may interpret natural-language food input, but core calorie and goal calculations remain deterministic and traceable.

## D-015 — Future KFA visualization is not a measurement tool
**Status:** decided direction

Image-based KFA visualizations are orientation aids, not measurements.

## D-016 — Onboarding should be short
**Status:** decided

The current design target is roughly two minutes for a normal first-time user, without sacrificing required inputs.

## D-017 — One input parameter per onboarding screen
**Status:** decided

Each onboarding input screen should contain one primary parameter. Conditional screens are allowed.

## D-018 — Explanations are optional and hidden by default
**Status:** decided

Relevant screens can expose a short explanation of why an input is needed and what it influences, hidden by default.

## D-019 — Current onboarding sequence
**Status:** decided direction

1. start
2. sex / biological category
3. age
4. height
5. current weight
6. optional current KFA
7. everyday activity type
8. average daily steps
9. sport/training frequency
10. training type when relevant
11. typical training duration when relevant
12. target definition
13. target value / derived target weight confirmation
14. timeframe
15. initial calorie-plan / weekly-budget preview without Cheat Day
16. optional Cheat Day configuration
17. tracking mode
18. final plan result

If no current KFA is entered, target KFA is unavailable and target weight is entered directly.

The Cheat Day decision is intentionally made **after** the user has seen the baseline daily target and weekly budget so the effect of redistributing calories is understandable.

## D-020 — Show the first plan before advanced refinement
**Status:** decided

After required onboarding inputs, show the first plan. Additional complexity belongs in calculation details, settings or a "refine plan" area.

## D-021 — Current KFA can be estimated with a pre-generated reference-image library
**Status:** decided direction

Current-KFA visual examples are pre-generated, shown only on request and selected by sex/biological category, body-shape reference bucket and KFA level. They are orientation aids only.

## D-022 — KFA reference-image body-shape bucket is derived automatically
**Status:** decided direction

The user should not answer an extra body-build question. A coarse internal reference bucket is derived from height and weight for image matching only. Exact formula, bucket count and thresholds remain open.

## D-023 — Target KFA can derive target weight
**Status:** decided direction

When current KFA is known, target KFA can be used to derive the operative target weight under a constant-fat-free-mass assumption:

```text
fat-free mass = current weight × (1 - current KFA)
target weight = fat-free mass / (1 - target KFA)
required weight loss = current weight - target weight
```

Target KFA does not replace target weight downstream; it derives it.

## D-024 — Resting-energy equation routing
**Status:** decided

```text
no current KFA → Mifflin-St. Jeor
current KFA    → Cunningham 1980
```

Cunningham 1980:

```text
fat-free mass = weight × (1 - KFA)
RMR = 500 + 22 × fat-free mass(kg)
```

A visually estimated KFA may still be used. Added uncertainty is documented internally; no separate user warning is required solely because the KFA came from reference images.

## D-025 — KFA image intervals do not constrain numeric KFA values
**Status:** decided

Reference images may use coarse anchors such as 10%, 15%, 20%, 25%, while the numeric current or target KFA can be fine-adjusted between anchors. Calculations use the exact numeric value.

## D-026 — Everyday activity uses a time-based MET model
**Status:** decided direction

Everyday activity is MET-based with time exposure, not based on the previously discussed fixed RMR percentage add-ons. Walking/steps remain separate to reduce double counting. Current reference profiles are documented in `activity-model-v1.md`.

## D-027 — Training energy uses MET plus duration
**Status:** decided direction

Training energy uses training type/MET, body weight and duration. Resting energy for the same time is subtracted. Typical training duration is therefore a conditional onboarding input.

## D-028 — TEF uses a 10% MVP approximation
**Status:** decided direction

V1 models TEF as approximately 10% of food intake. The deficit calculation uses the lower TEF implied by lower intake.

## D-029 — V1 uses a static 7,700 kcal/kg deficit model
**Status:** decided

```text
required weight loss = current weight - target weight
total required deficit = required weight loss(kg) × 7,700 kcal
average daily body-energy deficit = total required deficit / plan days
```

V1 does not simulate weight, RMR, TDEE, metabolic adaptation or body composition day by day. The 7,700 kcal/kg value is a planning simplification, not an exact biological constant.

## D-030 — Daily calorie target accounts for lower TEF during the deficit
**Status:** decided direction

Let `B` be expenditure before TEF, `D` planned daily body-energy deficit and `C` target intake:

```text
maintenance M = B / 0.90
D = B - 0.90 × C
C = (B - D) / 0.90
C = M - D / 0.90
```

## D-031 — Automatic plans use maintenance-relative guardrails
**Status:** decided direction

Automatic V1 plans should normally reduce intake by no more than **25% of estimated maintenance**:

```text
maximum intake reduction = 0.25 × M
minimum target from this rule = 0.75 × M
maximum body-energy deficit D_max = 0.225 × M
```

Additional approximate automatic-plan floors remain 1,200 kcal/day for the female Mifflin equation category and 1,500 kcal/day for the male category. These are pragmatic product guardrails, not physiological minimums.

## D-032 — Weekly budget redistributes calories rather than adding a Cheat Day on top
**Status:** decided

```text
weekly budget W = average daily target C × 7
```

A Cheat Day redistributes the same weekly budget rather than adding calories to it. V1 permits only **one Cheat Day per week**.

For Cheat-Day budget `H`:

```text
regular-day budget L = (W - H) / 6
```

The previous direction that automatically capped the Cheat Day at estimated maintenance is superseded by D-034.

## D-033 — V1 macro rounding, Cheat-Day behavior and scope
**Status:** decided

Macro rules are applied to each day's actual calorie budget.

- Protein grams remain fixed for unchanged current weight and sport-frequency tier.
- Fat remains 30% of that day's calories.
- Carbohydrates receive the remaining calories.
- Protein and fat are displayed as whole grams; carbohydrates are calculated from the remaining calories and displayed as whole grams.
- Small visible kcal differences caused by whole-gram rounding are explicitly accepted for V1 and do not require artificial correction.
- Fiber, saturated-fat targets, omega-3 targets and separate muscle-gain/muscle-retention macro logic are not part of the V1 macro engine.

See `nutrition-and-macros.md` for formulas and examples.

## D-034 — V1 Cheat Day amount, limit and live redistribution
**Status:** decided

The user can choose the **total calorie budget** for one Cheat Day rather than being forced to use maintenance calories.

The baseline is the normal average daily target:

```text
C = W / 7
nominal Cheat-Day maximum = C + 1,000 kcal
```

The Cheat-Day amount is selected in **50-kcal increments**. The technical maximum is rounded down to the allowed 50-kcal grid so the nominal +1,000-kcal limit is not exceeded.

The six regular days must still satisfy the automatic-plan guardrails. Therefore the actual selectable maximum is the lower of:

- the 50-kcal-grid value at or below `C + 1,000`; and
- the highest value that still leaves all six regular days within the automatic-plan guardrails.

If `F` is the minimum allowed regular-day budget:

```text
H <= W - 6 × F
```

As the user changes `H`, the six regular-day budgets update **live** while the weekly total stays unchanged.

## D-035 — V1 Cheat Day screen interaction and optional food examples
**Status:** decided direction

The Cheat Day is configured after the user has seen the normal daily target and weekly budget.

V1 interaction:

1. ask whether the user wants a Cheat Day;
2. if yes, show Monday through Sunday;
3. allow exactly one day to be selected;
4. show a numeric wheel/slider-style control for the Cheat-Day calorie total in 50-kcal steps;
5. update the other six daily budgets live;
6. keep the unchanged weekly budget visible/understandable.

The final control implementation may be a wheel, slider or equivalent numeric selector; exact visual design remains a wireframe task.

The screen should also offer the same kind of optional **Info button** used elsewhere in onboarding. It can show approximate calorie examples for typical Cheat-Day foods such as pizza, beer, cake, burgers and fries so users can estimate an appropriate budget. These values should be presented as rough ranges/benchmarks, not precise nutrition facts, because recipes and portions vary.

The exact example foods, serving definitions and kcal ranges remain a content task. See `cheat-day-v1.md` for the detailed specification.
