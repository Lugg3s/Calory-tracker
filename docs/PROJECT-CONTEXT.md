# Theo — Project Context

> Primary briefing for anyone, including another AI, who needs to understand the product without the original planning conversation.

## Product

**Theo** (short for **Theory**) is the decided product name for a mobile weight-loss planning app focused on **transparent, deterministic calorie calculations**. The user enters body data, everyday activity, exercise habits and a goal. The app estimates maintenance energy expenditure, derives a calorie target for the requested timeframe and shows the calculation line by line.

The MVP must work without an LLM. AI, voice food logging and advanced personalization are later layers.

The name **Theo**, derived from **Theory**, was selected on 19 September 2026 (D-044). It replaces the former working title **Calory Tracker** and reflects the product's focus on explaining the reasoning behind its calculations. App-store, domain and trademark availability checks remain open; the naming decision does not imply clearance.

## Platforms, stack and guest access

Decided, not yet implemented (D-046/D-047): **iOS, Android and web**, using **Expo + React Native + TypeScript**, **Expo Router** and a small Nocturne component library. Use an independent, locally executed TypeScript calculation module with tests against documented examples. **Supabase Auth + PostgreSQL** provide accounts and saved plans; no additional custom API backend is selected for V1.

Onboarding and the first result are accessible without registration. Guest inputs/calculations stay local, with no automatic anonymous backend account or upload of body/activity inputs. After the result, “Plan im Konto speichern” offers registration and transfer of existing inputs and plan. Accounts enable cross-device access. Failed registration or saving must not discard the current guest plan. Guest persistence across restarts and conflicts with existing account plans remain open.

Development will primarily be AI-assisted. Validate the picker, Theo help/animation and guest-to-account flow on all platforms. See [Tech Stack](tech-stack.md) and [Guest mode and accounts](guest-mode.md).

## Current visual direction and mascot guidance

The user prefers **04 · Nocturne**, with generous whitespace and modest typography. Write **Theo** with a capital T. Use the app name on the start screen; do not require it in every subsequent header. The calculator mascot opens contextual explanations and calculation reasoning on tap. Its current lower-right onboarding placement above the primary action was rejected; the replacement position is still open. On its first appearance, show one short speech bubble explaining the tap-for-help interaction. Afterwards, explanations remain hidden until requested; do not repeat the introduction at every screen change.

See [D-045](PRODUCT-DECISIONS.md#d-045--nocturne-direction-and-unobtrusive-theo-guidance) and the [existing Nocturne example with updated feedback](ui%20references/02-theo-nocturne.md). The old image is a visual reference and does not override the newer written feedback.

## Core UX principle

The main calculation should resemble a cost calculation:

```text
Resting energy requirement           XXXX kcal
+ everyday activity                  XXXX kcal
+ steps                              XXXX kcal
+ exercise (daily average)           XXXX kcal
--------------------------------------------
= base before TEF                    XXXX kcal
+ thermic effect of food              XXX kcal
--------------------------------------------
= estimated maintenance need        XXXX kcal

- planned deficit                    XXX kcal
--------------------------------------------
= suggested calorie target           XXXX kcal

× 7
= weekly budget                     XXXXX kcal
```

Every major component should be explainable. All outputs are estimates; the UI should avoid false precision.

The exact visual presentation is intentionally not fixed yet. The hard rule is **understandability**: the calculation must be explainable step by step in normal language so that a typical seventh grader can follow it. Unexplained abbreviations and unnecessary jargon should be avoided; formulas may be optional deeper detail.

## Current onboarding UX

Design target: roughly two minutes for a normal first-time user, with **one input parameter per screen** and optional explanations hidden by default.

Current intended sequence:

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
12. target definition: direct target weight or target KFA when current KFA is known
13. target value / confirmation of derived target weight
14. timeframe
15. initial daily-target / weekly-budget preview without Cheat Day
16. optional Cheat Day configuration
17. tracking mode
18. final plan result

The Cheat Day is intentionally configured **after** the baseline daily target and weekly budget have been shown, so the user can understand the redistribution.

Sport/training frequency is also sufficient to select the V1 protein tier. The MVP does **not** add a separate mandatory question for muscle gain, muscle retention or a similar muscle-specific goal.

Additional complexity belongs after the first plan under calculation details, settings or “refine plan”.

## KFA rules and reference-image library

Current KFA is optional. Target KFA is only available if current KFA is known.

The KFA reference images are optional orientation aids only. The user does **not** have to select the closest-looking image. Current KFA and target KFA remain free numeric inputs, and calculations always use the exact numeric value entered.

V1 uses a pre-generated library of **80 front-view images**:

```text
2 sex/biological image categories × 5 internal body-shape buckets × 8 KFA anchors = 80 images
```

The current sex-specific image anchors are:

```text
male:   10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%
female: 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%
```

This supersedes the earlier identical 5–40% anchor range.

### Internal body-shape matching

The user is not asked for a body-build category. The image-matching bucket is derived from height and weight using a simple BMI-based V1 heuristic:

```text
BMI = weight(kg) / height(m)^2

A: BMI < 20
B: 20 to < 25
C: 25 to < 30
D: 30 to < 35
E: >= 35
```

These buckets are never shown as user classifications and are **not** KFA estimates or medical labels. They are only a visual-reference matching heuristic. V1 accepts that very muscular or otherwise atypical body compositions may be matched imperfectly.

Reference images are shown only on request. V1 uses one standardized front view per combination, with consistent pose, framing, clothing, lighting and background. The same library is reused for current-KFA and target-KFA visual help.

Physiological/medical plausibility of the visual scale is an explicit quality target. The images should model plausible sex-specific fat-distribution changes, but they remain orientation anchors rather than medically exact KFA measurements.

### Current production status

Bucket 3 is the 16-image pilot series:

```text
male:   10–45% in 5-point steps
female: 15–50% in 5-point steps
```

The pilot images and production metadata are stored under `assets/kfa-reference-images/`. Their validation status remains pending until the visual KFA spacing and consistency are sufficiently reviewed.

See `kfa-reference-images-v1.md` for the detailed specification.

## Resting-energy model

V1 routing is decided:

```text
without current KFA → Mifflin-St. Jeor
with current KFA    → Cunningham 1980
```

Mifflin-St. Jeor:

```text
male:
RMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5

female:
RMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
```

Cunningham 1980:

```text
fat-free mass = weight × (1 - KFA)
RMR = 500 + 22 × fat-free mass(kg)
```

## Maintenance-energy model

The MVP uses a component model rather than a single PAL multiplier:

```text
RMR
+ net everyday activity
+ net step energy
+ net training energy
= base B before TEF

maintenance M = B / 0.90
```

### Everyday activity

Everyday activity uses a **time-based MET model**, not fixed RMR percentage add-ons.

One coarse everyday-activity choice maps to an internal 8-hour reference profile. Five V1 profiles are documented in [`activity-model-v1.md`](activity-model-v1.md): predominantly seated, mixed sitting/standing, predominantly standing, physically active and heavy physical work.

For V1 these profiles are treated as typical **5-day workweek profiles** and averaged across all seven plan days:

```text
net everyday activity per plan day
= net energy of selected 8-h profile × 5 / 7
```

Steps remain separate. V1 adds **no additional generic NEAT correction**. Known limitations are accepted for V1: some non-step NEAT may be undercounted, while high occupational activity can partly overlap with step energy. These points should be validated later against real data.

### Steps

Current V1 fallback:

```text
estimated step length = height × 0.414
distance(km) = steps × step length(m) / 1,000
net step kcal = distance(km) × body weight(kg) × 0.57 kcal/kg/km
```

`0.57 kcal/kg/km` is the current working value for net walking cost. `0.414 × height` is only a fallback estimate; measured distance from phone/Health/wearable data should later take precedence.

### Training

Training uses activity type/MET, body weight and duration:

```text
gross training kcal = MET × 3.5 × weight(kg) / 200 × minutes
net training kcal = gross training kcal - RMR / 1,440 × minutes
```

Weekly training energy is divided by 7 for the daily-average plan. Typical training duration is therefore a conditional onboarding input. A separate intensity question is not required for V1.

Current V1 category defaults:

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

Zumba / dance fitness is currently mapped to `other sport = 5.0 MET` in manual V1 examples.

### TEF

V1 uses an approximate **10 % thermic effect of food** for a mixed diet:

```text
maintenance M = B / 0.90
```

When intake is below maintenance, the lower TEF at lower intake is handled explicitly in the target-calorie equation.

## Target KFA → target weight

Target KFA does not replace target weight in the downstream calculation. It is an alternative way to derive target weight when current KFA is known:

```text
fat-free mass = current weight × (1 - current KFA)
target weight = fat-free mass ÷ (1 - target KFA)
required weight loss = current weight - target weight
```

This assumes constant fat-free mass and is a model estimate, not a prediction.

## V1 weight-loss / deficit model

V1 deliberately uses a **static** planning model rather than a day-by-day physiological simulation:

```text
required weight loss = current weight - target weight
total required deficit = required weight loss(kg) × 7,700 kcal
average daily body-energy deficit D = total required deficit ÷ plan days
```

The factor **7,700 kcal/kg** is an explicit planning simplification, not an exact biological constant.

V1 does not dynamically recalculate weight, RMR, TDEE, metabolic adaptation or body composition throughout the plan. If the user later enters a new measured current weight, the plan can be recalculated from that new state.

## Daily calorie target with TEF

Let `B` be expenditure before TEF, `C` calorie intake and `D` the planned daily body-energy deficit:

```text
D = B + 0.10 × C - C
D = B - 0.90 × C
C = (B - D) / 0.90
```

Equivalent form:

```text
C = maintenance M - D / 0.90
```

## Automatic-plan guardrails

Automatic plans should normally reduce calorie intake by no more than **25 % of estimated maintenance**:

```text
maximum intake reduction R_max = 0.25 × M
minimum target from this rule = 0.75 × M
D_max = 0.225 × M
```

If the requested goal/timeframe exceeds this, the app should propose a longer timeframe.

Additional approximate automatic-plan floors remain:

- 1,200 kcal/day for the female Mifflin equation category
- 1,500 kcal/day for the male Mifflin equation category

These are pragmatic product guardrails, not physiological minimums.

## Weekly budget and Cheat Day

```text
weekly budget W = average daily target C × 7
```

The user first sees this baseline weekly budget and normal daily target. Only afterwards can an optional Cheat Day be configured.

V1 uses the term **Cheat Day** and permits **one Cheat Day per week**.

A Cheat Day redistributes the same weekly budget rather than adding calories on top:

```text
regular-day budget L = (W - Cheat-Day budget H) / 6
```

The user selects one weekday and then chooses the **total Cheat-Day calories** with a **vertical wheel / number picker** in **50-kcal increments**. The selected number is centered and emphasized, adjacent values appear above and below with lower emphasis, and the other six day budgets update live.

The nominal V1 limit is:

```text
H_max_nominal = C + 1,500 kcal
```

The technical maximum is rounded down to the 50-kcal grid. This supersedes the former `C + 1,000 kcal` limit.

A high Cheat Day can push the six regular days below automatic-plan guardrails. The implementation must recognize and surface that state, but **whether it hard-blocks, warns or uses a soft recommendation is intentionally left open for implementation**.

The Cheat-Day screen also has an optional info/help control. It can show rough calorie ranges for typical foods such as pizza, beer/alcohol, cake, burgers, fries, snacks such as Flips and chocolate. Exact foods, serving sizes and kcal ranges remain a content task.

See [`cheat-day-v1.md`](cheat-day-v1.md) for the detailed specification.

## Tracking modes and V1 macros

Simple mode: calories only.

Advanced mode: calories + protein + fat + carbohydrates.

The V1 macro method is decided:

```text
< 3 sport sessions/week:
protein = 1.4 g × current body weight(kg)

>= 3 sport sessions/week:
protein = 2.0 g × current body weight(kg)

fat kcal = daily calorie budget × 0.30
fat grams = fat kcal / 9

carb kcal = daily calories - protein kcal - fat kcal
carb grams = carb kcal / 4
```

For the threshold, every regularly performed sport counts; V1 does not require a separate muscle-gain or muscle-retention goal.

Protein uses **current actual body weight** without a KFA/FFM correction, ideal-weight rule or target-weight cap in V1.

On a Cheat Day, protein grams stay unchanged if body weight and sport tier are unchanged, fat remains 30 % of that day's calories, and carbohydrates receive the remainder.

Protein and fat are displayed as whole grams; carbohydrates are calculated from the remaining calories and displayed as whole grams. **Small visible kcal differences caused by rounding are accepted in V1.**

Fiber, saturated-fat targets, omega-3 targets and separate muscle-goal macro logic are not part of the V1 macro engine.

See `nutrition-and-macros.md` for formulas, examples and rationale.

## Manual calorie/macro override

The automatically calculated calorie target is editable in settings/an advanced area, not prominently on the main screen. Macro targets may also be manually adjusted there.

Automatic guardrails apply to **automatically proposed plans**. A user may intentionally enter and save a calorie value below the automatic guardrail; the app should not silently reset it. The value should be marked as manually changed and a clear **non-blocking** warning/plausibility note is the preferred V1 direction.

Manual macro values may likewise remain even when their kcal total no longer exactly matches the calorie target. The mismatch may be displayed but should not be force-corrected.

This direct manual-override behavior is separate from the still-open implementation decision for Cheat-Day redistribution that drives the six other days below automatic guardrails.

## Manual calculation example

A dated V1 example for a 25-year-old, 162-cm, 66-kg female-category user with 5,000 steps/day, predominantly seated activity, one weekly Zumba session and one weekly strength session is documented in [`calculation-examples.md`](calculation-examples.md).

The example is a reproducibility check, not a product requirement or scientific validation.

## AI / future direction

The MVP has no LLM dependency. Later features may include voice meal logging, structured food interpretation, meal suggestions, adaptive calibration from actual weight trends and richer KFA visualizations.

AI must not silently replace deterministic core calculations.

## Source-of-truth documents

Read in this order when working on the product:

1. `PROJECT-CONTEXT.md`
2. `PRODUCT-DECISIONS.md`
3. `calorie-calculation.md`
4. `activity-model-v1.md`
5. `cheat-day-v1.md`
6. `nutrition-and-macros.md`
7. `kfa-reference-images-v1.md`
8. `calculation-examples.md`
9. `onboarding.md` / `app-flow.md`
10. `open-questions.md`

Never convert provisional scientific assumptions into fixed requirements without an explicit decision.
