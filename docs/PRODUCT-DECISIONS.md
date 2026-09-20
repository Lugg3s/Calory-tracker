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

Relevant screens can expose a short explanation of why an input is needed and what it influences, hidden by default. D-045 adds a one-time introductory speech bubble on Theo's first appearance; subsequent contextual help remains user-triggered.

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

The previous direction that automatically capped the Cheat Day at estimated maintenance is superseded by D-034 and later D-038.

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
**Status:** superseded by D-038

The former decision used a nominal `C + 1,000 kcal` Cheat-Day maximum and hard-limited the actual selectable maximum by the six regular-day guardrails. This historical decision is retained for traceability but is superseded by D-038.

## D-035 — V1 Cheat Day screen interaction and optional food examples
**Status:** partially superseded by D-039

The Cheat Day is configured after the user has seen the normal daily target and weekly budget. The screen offers one weekday, a numeric calorie control in 50-kcal steps, live redistribution and optional food examples. The earlier freedom to use wheel, slider or equivalent is superseded by D-039.

## D-036 — V1 KFA reference-image library structure
**Status:** partially superseded by D-042

The V1 library remains fixed at **80 images** with 2 sex/biological image categories × 5 internal body-shape buckets × 8 KFA anchors and one standardized front view per combination. The earlier identical 5–40% anchor series for both sexes is superseded by D-042.

The BMI-based V1 matching heuristic remains:

```text
BMI = weight(kg) / height(m)^2
A: BMI < 20
B: 20 to < 25
C: 25 to < 30
D: 30 to < 35
E: >= 35
```

The buckets are internal visual-reference matching aids only, not health classifications or KFA estimates.

## D-037 — V1 activity profiles are averaged as a 5-day workweek
**Status:** decided

The five 8-hour everyday-activity profiles in `activity-model-v1.md` are treated as typical **5-day workweek profiles** and averaged across the full week:

```text
net everyday activity per plan day
= net energy of selected 8-h profile × 5 / 7
```

Steps remain separate. V1 adds **no additional generic NEAT correction**. Known undercounting of non-step NEAT and possible activity/step overlap are accepted V1 model limitations to be validated later.

## D-038 — Cheat Day nominal limit is C + 1,500 kcal
**Status:** decided

The Cheat-Day nominal upper limit is now:

```text
H_max_nominal = C + 1,500 kcal
```

The value is selected in 50-kcal increments and the technical maximum is rounded down to the 50-kcal grid.

This supersedes the former `C + 1,000 kcal` limit.

If a high Cheat Day causes the six regular days to fall below automatic planning guardrails, the implementation must detect and treat that state transparently. **Whether it hard-blocks, warns or uses a soft recommendation is intentionally not pre-decided** and may be chosen during implementation.

## D-039 — Cheat Day uses a vertical wheel/number picker
**Status:** decided direction

The V1 Cheat-Day calorie control should use a **vertical wheel / number picker** in the style of the provided UI reference: the selected number is large and centered, adjacent values appear above and below with reduced emphasis, and the user scrolls vertically.

The control moves in **50-kcal increments** and the other six day budgets update live. Exact typography, spacing and animation remain implementation details.

## D-040 — Calculation explanations must be understandable to a seventh grader
**Status:** decided

The exact visual layout of the calculation/result explanation is intentionally left to implementation/design.

The hard requirement is understandability: the calculation must be explained step by step in normal language so that a typical seventh grader can follow it. Unexplained abbreviations and unnecessary jargon should be avoided. Formal equations may be available as optional deeper detail.

## D-041 — Manual calorie and macro overrides are allowed
**Status:** decided direction

Automatic guardrails control **automatically proposed plans**, but they do not silently overwrite a value the user intentionally enters manually.

- A manually entered calorie target may be saved even below the automatic guardrail.
- The app should mark the value as manually changed and preferably show a clear **non-blocking** warning/plausibility note for aggressive values.
- Manually set macro targets may remain even if their kcal total does not exactly match the calorie target.
- Any mismatch may be shown, but the app should not force an automatic correction.

Exact warning copy remains an implementation/content detail.

## D-042 — Sex-specific V1 KFA anchor ranges
**Status:** decided

The V1 KFA library still contains 8 anchors per sex and 80 total images, but the anchor ranges are now:

```text
male:   10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%
female: 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%
```

This supersedes the earlier identical 5–40% range.

The goal is not merely an evenly spaced visual scale; **physiological/medical plausibility is important**. The generated images should model plausible sex-specific fat-distribution changes while remaining clearly labeled as visual orientation anchors rather than medical measurements.

Bucket 3 is used as the 16-image pilot series before scaling the workflow to all 80 images. See `kfa-reference-images-v1.md` and `assets/kfa-reference-images/README.md`.

## D-043 — V1 training-category MET defaults
**Status:** decided direction

For the first implementation, training categories use these product defaults:

```text
strength training                3.5 MET
running / jogging                7.5 MET
cycling                          7.0 MET
swimming                         5.8 MET
HIIT / circuit                   7.0 MET
team / racket sports             7.0 MET
yoga / Pilates / mobility        2.5 MET
other sport                      5.0 MET
```

Zumba / dance fitness is currently mapped to `other sport = 5.0 MET` in manual V1 examples unless a dedicated category is added later.

These are pragmatic category defaults based on the Compendium-style MET approach, not exact energy costs for every individual session.

## D-044 — The product is named Theo (short for Theory)
**Status:** decided  
**Date:** 2026-09-19

The app is named **Theo**, short for **Theory**. This supersedes the former working title **Calory Tracker** and the earlier open product-name decision.

The name connects the product to its focus on understandable, transparent calculations and the reasoning behind the user's plan. Use **Theo** as the product name in current documentation and future interface copy.

App-store, domain and trademark availability have not been established by this decision and remain open tasks. The GitHub repository identifier is unchanged by this documentation update.

## D-045 — Nocturne direction and unobtrusive Theo guidance
**Status:** decided direction; mascot placement remains open  
**Date:** 2026-09-19

- Use **Theo** with a capital **T**, including the wordmark.
- The preferred visual direction is **04 · Nocturne**: dark plum/charcoal surfaces, restrained peach accents, generous whitespace and modest, consistent typography. Empty space should not cause text to scale up.
- Show the app name on the first/start screen. Repeating the name on every subsequent screen is unnecessary; it is not a mandatory persistent header.
- Theo is a small calculator mascot that opens contextual help when tapped: what the current screen asks, why the input matters, and its mathematical reasoning and effects. Keep deeper calculation details optional and understandable (D-040); this does not introduce an LLM dependency.
- The mascot's current onboarding position in the generated examples — near the lower-right above the main action — was explicitly **not approved**. Revisit placement; no replacement position has been chosen.
- On Theo's **first appearance**, show one short introductory speech bubble explaining that the user can tap him for information. This is the narrow exception to D-018's hidden-by-default explanations.
- After that introduction, do not automatically show persistent or repeated speech bubbles on each screen. The mascot remains available, and contextual explanations open on request.

Suggested introductory copy, not final wording: **“Tippe auf mich – ich erkläre dir diese Eingabe und wie sie deinen Plan beeinflusst.”**

The exact replacement position, first-appearance screen, bubble dismissal/timing and persistence mechanism remain design/implementation details. The introduction must not repeat merely because the user advances or returns to another onboarding screen.

See [Nocturne reference and feedback](ui%20references/02-theo-nocturne.md) for an existing example and explicit differences from these updated requirements. The example is retained unchanged as a visual reference, not as approval of every detail.

## D-046 — Expo, React Native, TypeScript and Supabase for iOS, Android and web
**Status:** decided for initial implementation  
**Date:** 2026-09-20

Theo targets **iOS, Android and web** using **Expo + React Native + TypeScript**, **Expo Router**, and Expo's React Native Web support. Build a small shared component library for Nocturne.

Keep the deterministic calculation engine in an independent TypeScript module, executed locally and tested against documented calculation examples. It does not depend on authentication, a server call or an LLM.

Use **Supabase Auth + PostgreSQL** for accounts and saved plans. No additional custom API backend is selected for V1. Implement and test user-scoped database access policies, synchronization and conflict handling.

Development will primarily be AI-assisted. First validate the Cheat-Day picker, Theo help/animation and guest-to-account save flow on all three platforms. This validation is not yet complete.

Exact versions, ancillary libraries, local persistence, login providers, hosting and release infrastructure remain open. See [Tech Stack](tech-stack.md).

## D-047 — Account-optional onboarding and local guest calculations
**Status:** decided  
**Date:** 2026-09-20

Users can complete onboarding and obtain a calculation without registration. Guest inputs and calculation remain local; do not create an anonymous backend account or upload body/activity inputs for a pure guest calculation.

After the result, offer **“Plan im Konto speichern”**. Successful registration carries the existing guest inputs and plan into the new account without repeated entry. Accounts enable saved plans and cross-device access.

Cancelled/failed registration must preserve the current guest plan. Failed saving must allow retry; do not report success before the save completes. Login into an existing account must not silently overwrite an existing plan; the specific conflict UX remains open.

Account flows supplement the existing 18-screen calculation flow. Guest-data persistence across restarts and specific login methods are not yet decided. See [Guest mode and accounts](guest-mode.md).

## D-048 — Theo animations are planned, not implemented
**Status:** documented design direction; implementation deferred by user  
**Date:** 2026-09-20

When the user changes their height, Theo should scale with that value, within restrained bounds and with his feet anchored. Other layout elements remain unchanged.

Record the discussed companion animations: walking for steps, exercise and unit markers for training frequency, a timer for training duration, an expanding calendar for the target timeframe, conserved-budget redistribution in Cheat-Day help, pointing through calculation steps, a checkmark after confirmed saving, and a neutral scale-reading action for weight.

Animations respond to interactions and then settle; no perpetual idle loops, automatic explanations, or body/emotion judgments based on weight, body fat or lower calorie targets. Respect reduced-motion settings and D-045's one-time help introduction. Final mascot position remains open.

A voice-responsive display waveform is reserved for the later voice-tracking version, not V1. Height, steps and Cheat-Day redistribution are suggested first candidates; detailed timing and prioritization remain design work.

The user explicitly requested documentation only. See [planned Theo animations](theo-animations.md). No animation implementation is included in this decision.
