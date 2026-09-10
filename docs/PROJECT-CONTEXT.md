# Calory Tracker — Project Context

> Primary briefing for anyone, including another AI, who needs to understand the product without the original planning conversation.

## Product

Calory Tracker is a mobile weight-loss planning app focused on **transparent, deterministic calorie calculations**. The user enters body data, everyday activity, exercise habits and a goal. The app estimates maintenance energy expenditure, derives a calorie target for the requested timeframe and shows the calculation line by line.

The MVP must work without an LLM. AI, voice food logging and advanced personalization are later layers.

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
15. planned flexible / higher-calorie day
16. tracking mode
17. plan result

Sport/training frequency is also sufficient to select the V1 protein tier. The MVP does **not** add a separate mandatory question for muscle gain, muscle retention or a similar muscle-specific goal.

The exact copy and controls remain a design task. Additional complexity belongs after the first plan under calculation details, settings or “refine plan”.

## KFA rules

Current KFA is optional. Target KFA is only available if current KFA is known.

Reference images are pre-generated, shown only on request and selected by:

- sex / biological category
- an internal body-shape/reference bucket derived from height and weight
- KFA level

The images may use coarse anchors such as approximately 5-percentage-point steps, but **numeric KFA values are not constrained to those anchors**. A user can enter e.g. 17 % between 15 % and 20 %, and calculations use the exact entered value. The same applies to target KFA.

A KFA estimated from reference images may carry higher internal model uncertainty. That uncertainty can be documented for developers/model validation; no separate user warning is required solely because the KFA was visually estimated.

The reference images are orientation aids, not measurements.

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

Everyday activity uses a **time-based MET model**, not the previously discussed fixed RMR percentage add-ons.

To keep onboarding short, one coarse everyday-activity choice maps to an internal 8-hour reference profile. Five provisional profiles are documented in [`activity-model-v1.md`](activity-model-v1.md): predominantly seated, mixed sitting/standing, predominantly standing, physically active and heavy physical work.

Known limitations: low-activity users may have some NEAT undercounted, while high occupational activity can partly overlap with step energy. V1 proceeds with this model for now and should be calibrated later against real data.

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

Weekly training energy is divided by 7 for the daily-average plan. Typical training duration is therefore a conditional onboarding input. A separate intensity question is not required for V1; standard MET values per sport can be used initially.

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

These are pragmatic product guardrails, not physiological minimums. Special populations and manual overrides remain open questions.

## Weekly budget and flexible day

```text
weekly budget W = average daily target C × 7
```

A planned higher-calorie/flexible day redistributes the same weekly budget rather than adding calories on top.

For one flexible day with budget `H`:

```text
regular-day budget L = (W - H) / 6
```

For multiple flexible days:

```text
L = (W - sum(H_i)) / (7 - n)
```

Automatic V1 planning uses estimated maintenance as the maximum flexible-day budget. If redistribution would push regular days below automatic-plan guardrails, reduce the flexible-day budget or propose a longer timeframe.

## Tracking modes and V1 macros

Simple mode: calories only.

Advanced mode: calories + protein + fat + carbohydrates.

The V1 macro method is now decided:

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

On a flexible/higher-calorie day, protein grams stay unchanged if body weight and sport tier are unchanged, fat remains 30 % of that day's calories, and carbohydrates receive the remainder.

Protein and fat are displayed as whole grams; carbohydrates are calculated from the remaining calories and displayed as whole grams. Internal values can remain unrounded.

If an unusually low calorie target makes the resulting macro allocation implausible, the app should review the calorie target/safety constraints rather than silently distort the macro rules.

Fiber, saturated-fat targets, omega-3 targets and separate muscle-goal macro logic are not part of the V1 macro engine.

See `nutrition-and-macros.md` for formulas, examples and rationale.

## Manual calorie/macro override

The automatically calculated calorie target is editable in settings/an advanced area, not prominently on the main screen. Macro targets may also be manually adjusted there. How to handle manual values below automatic-plan guardrails remains open.

## AI / future direction

The MVP has no LLM dependency. Later features may include voice meal logging, structured food interpretation, meal suggestions, adaptive calibration from actual weight trends and richer KFA visualizations.

AI must not silently replace deterministic core calculations.

## Source-of-truth documents

Read in this order when working on the product:

1. `PROJECT-CONTEXT.md`
2. `PRODUCT-DECISIONS.md`
3. `calorie-calculation.md`
4. `activity-model-v1.md`
5. `nutrition-and-macros.md`
6. `onboarding.md` / `app-flow.md`
7. `open-questions.md`

Never convert provisional scientific assumptions into fixed requirements without an explicit decision.
