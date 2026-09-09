# Calory Tracker — Project Context

> Primary briefing for anyone, including another AI, who needs to understand the product without the original planning conversation.

## Product

Calory Tracker is a mobile app for weight loss that aims to make calorie planning understandable rather than opaque. The user enters body data, everyday activity, exercise habits, and a goal. The app estimates energy requirements, calculates a calorie target for the desired weight-loss timeframe, and shows the calculation line by line so the user can understand which inputs affect the result.

The MVP should work without an LLM. AI, voice food logging, and advanced personalization are later layers.

## Core problem

The product should answer:

- How many calories do I approximately need to maintain my weight?
- Why is that the estimate?
- How do my everyday activity, steps, and training affect it?
- What deficit is required for my target weight and timeframe?
- If I know my current KFA, what target weight approximately corresponds to a desired target KFA?
- What can I approximately eat today without perfect calorie tracking?

## Core UX: transparent calculation

The main calculation should resemble a cost calculation or payslip:

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

- planned average deficit             XXX kcal
--------------------------------------------
= suggested calorie target           XXXX kcal
```

Numbers above are illustrative only. Every major component should be explainable in simple language, while avoiding false precision.

## User inputs

### Body
- current weight
- height
- age
- sex / biological category required by the selected equation
- optional current KFA

### Activity
- everyday activity / occupation
- average daily steps
- sport / exercise
- training frequency
- typical training duration when training is present
- additional duration/intensity information only where useful

### Goal
- target weight, entered directly or derived from target KFA when current KFA is known
- timeframe
- optional target KFA as an input for deriving target weight when current KFA is known

### Training profile
The onboarding should identify regular strength training or other performance-oriented sport because this affects protein recommendations.

## Current onboarding UX

The onboarding should be short, lightweight, and visually minimal. The current design target is that a normal first-time user can complete it in roughly two minutes.

The decided interaction principle is **one input parameter per screen**. Relevant screens may expose a small optional explanation describing why the input is requested and what it can influence. That explanation is hidden by default so the normal screen remains uncluttered.

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
12. target definition: target weight directly, or target KFA when current KFA is known so the app can derive the corresponding target weight
13. target weight / derived target weight confirmation
14. timeframe
15. planned cheat day / higher-calorie day — details still open
16. tracking mode
17. plan result

If no current KFA was entered, target KFA is unavailable and the user enters a target weight directly.

The planned cheat-day screen should allow a higher-calorie day to be incorporated into a **weekly calorie budget** rather than simply adding calories on top of the plan. The exact UX, terminology, allowed increase, redistribution across the other days, and safety limits are still unresolved and belong in `open-questions.md`.

After the first plan is shown, additional complexity should be optional and moved into calculation details, settings, or a "refine plan" area rather than extending the mandatory onboarding.

See `app-flow.md` and `onboarding.md` for the detailed flow.

## KFA rules

Current KFA is optional.

Target KFA is also optional in the sense that the user does not need KFA to use the app. However, **target KFA can only be selected when current KFA is known**.

Reference images may use coarse KFA anchors such as approximately five-percentage-point steps, but **the numeric KFA value is not constrained to those image steps**. A user may enter or fine-adjust an in-between value such as 17 %, and calculations use that exact numeric value. The same rule applies to current and target KFA.

To make current-KFA self-estimation easier, the KFA screen may offer an optional visual reference view. The app should use a pre-generated image library. Rather than storing a full image grid for every height and weight combination or asking the user for an additional body-build input, the app should derive a coarse internal body-shape/reference bucket from the height and weight already entered, for example using a BMI-like height-to-weight relationship.

The reference library can then be indexed approximately by sex / biological category, the derived body-shape/reference bucket, and KFA level. At runtime, the app selects the closest suitable reference group and only displays it when the user actively opens the examples.

The derived bucket is only a matching heuristic for visual references. It must not be presented as a medical classification or KFA measurement. The reference images themselves are also an orientation aid only and must not imply that a specific appearance maps exactly to a specific KFA.

If a KFA is estimated from those images, the added uncertainty may be marked internally for developers/model validation. A separate user-facing warning is **not required solely because the KFA was visually estimated**. General model uncertainty can still be communicated at product level.

The exact bucket formula, number of buckets, thresholds, KFA range, and image variants remain open.

## Resting-energy model

The V1 equation routing is decided:

- no current KFA → **Mifflin-St. Jeor**
- current KFA available → **Cunningham 1980** based on fat-free mass

```text
Mifflin-St. Jeor, male:
RMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5

Mifflin-St. Jeor, female:
RMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161

Cunningham 1980:
fat-free mass = weight × (1 - KFA)
RMR = 500 + 22 × fat-free mass(kg)
```

## Maintenance-energy model

The maintenance estimate should be component-based rather than a single opaque PAL multiplier:

```text
RMR
+ net everyday activity
+ net step energy
+ net training energy
= base before TEF

+ TEF
= estimated maintenance expenditure
```

### Everyday activity

Everyday activity should use a **time-based MET model** rather than the previously discussed fixed RMR percentage add-ons.

Relevant activities/time profiles should be mapped to appropriate MET values, preferably from the current Adult Compendium of Physical Activities. The exact mapping of onboarding activity categories to MET values and time exposures is still open.

Because steps are calculated separately, walking must not be counted again in full inside the everyday MET block.

### Steps

V1 fallback direction:

```text
estimated step length = height × 0.414
distance(km) = steps × step length(m) / 1,000
net step kcal = distance(km) × body weight(kg) × 0.57 kcal/kg/km
```

`0.57 kcal/kg/km` is the current scientifically supported net walking-cost parameter. The `0.414 × height` step-length estimate is only a fallback and should be replaced by measured distance from phone/Health/wearable data when available.

### Training

Training uses activity type/MET, body weight, and duration. Resting energy during the same time is subtracted so only additional training expenditure is added.

```text
gross activity kcal = MET × 3.5 × weight(kg) / 200 × minutes
net activity kcal = gross activity kcal - RMR / 1,440 × minutes
```

Weekly training energy is divided by 7 for an average daily plan. This is why typical training duration is now a conditional onboarding input.

Sport-specific models or wearable data may later replace generic MET estimates when stronger measurements are available.

### Thermic effect of food

The MVP uses an approximate **10 % TEF assumption for a mixed diet**:

```text
base = RMR + net everyday activity + net steps + net training
maintenance expenditure = base / 0.90
```

This is a planning approximation. A later advanced model may calculate TEF from macronutrient composition.

When deriving a calorie target below maintenance, the lower TEF at lower intake must be handled consistently in the final target equation rather than assuming the maintenance-level TEF remains unchanged.

## Target KFA as an input for deriving target weight

When current KFA is known, the user may choose a **target KFA**, including via visual reference images and numeric fine adjustment.

Target KFA does not replace target weight in the actual weight-loss calculation. Instead, it provides an alternative way to define the desired body-composition outcome. The app derives the corresponding approximate target weight and required weight loss under an explicit constant-fat-free-mass assumption:

```text
fat-free mass = current weight × (1 - current KFA)
target weight = fat-free mass ÷ (1 - target KFA)
required weight loss = current weight - target weight
```

The derived target weight is then used as the target weight for the subsequent deficit and calorie-target calculation.

This is a model estimate, not a prediction. Actual fat-free mass can change during weight loss, and visual KFA references are approximate.

The reverse projection also remains useful: if current KFA is known and the user chooses a target weight directly, the app can estimate the resulting KFA under the same constant-fat-free-mass assumption.

## Weight-loss calculation concept

V1 deliberately uses a **static planning model** rather than a dynamic day-by-day body-weight simulation.

1. Estimate current maintenance energy expenditure.
2. Determine target weight directly from the user or derive it from target KFA when current KFA is known and that option is used.
3. Calculate required weight loss:

```text
required weight loss = current weight - target weight
```

4. Translate that intended loss into a total energy deficit using the selected V1 planning factor:

```text
total required deficit = required weight loss(kg) × 7,700 kcal
```

5. Spread the total deficit over the requested timeframe:

```text
average daily deficit = total required deficit ÷ number of plan days
```

6. Derive the suggested daily calorie target, while handling the lower TEF at lower food intake consistently.
7. Present the calorie target and the calculation steps transparently.
8. If a planned higher-calorie day is selected, derive a weekly calorie budget and redistribute calories across the week so the intended average deficit is preserved.

The V1 plan does **not** dynamically recalculate body weight, RMR, TDEE, metabolic adaptation, or body composition for every simulated day. The factor **7,700 kcal/kg** is an explicit product simplification for planning, not an exact biological constant.

A dynamic/adaptive model can be added later. If a user later enters a new measured current weight, the app may recalculate the plan from that new current state without requiring continuous weigh-ins.

The exact safety limits for the daily deficit, the mathematical treatment of TEF in the deficit target, and the weekly-budget/cheat-day redistribution logic are still open.

## Manual calorie override

The automatically calculated calorie target must be editable by the user. For example, a suggested 2,000 kcal target could be changed to 1,900 kcal by a user who deliberately prefers that value.

This control should not be prominent on the main screen. It belongs in settings or an advanced area. Macro targets may follow the same principle.

## Tracking modes

### Simple
- calorie target only
- no mandatory macro tracking

### Advanced
- calories
- protein
- fat
- carbohydrates

Macro tracking is optional and should not burden users who do not want it.

## Provisional macro rules

Current MVP proposal:

- no regular strength training: 1.2 g protein/kg body weight/day
- regular strength/performance training: 2.0 g/kg/day
- provisional fat floor: 0.8 g/kg/day
- carbohydrates: remaining calories after protein and fat

These are provisional product parameters, not final scientific conclusions. Validate them before hard-coding.

## Food tracking

Long term, users should not have to precisely weigh and log every meal. They should be able to tell the app approximately what they have eaten, eventually by voice. The app estimates intake, shows what may remain in the daily budget, and suggests suitable meals or healthier/lower-calorie alternatives.

Unknown quantities must produce estimates/ranges rather than false precision.

## AI strategy

The first MVP must not depend on an LLM. The deterministic calculation engine is the source of truth for energy targets.

Later AI/voice features may include:

- speech-to-text
- spoken meal → structured food entry
- approximate calories/macros
- clarification questions
- healthier/lower-calorie alternatives
- remainder-of-day suggestions
- personalization

LLM output must not silently replace deterministic nutrition calculations or be presented as exact measurement.

## Future KFA visualization

Possible later features:

1. user uploads an image and receives a visualization corresponding to a desired KFA;
2. the app generates several KFA examples and the user selects the closest desired target.

This is visualization, not reliable KFA measurement.

## MVP

### Include
- onboarding
- body/activity data
- target weight, entered directly or derived from target KFA
- target-KFA selection via reference images only when current KFA is known
- numeric KFA fine adjustment independent of image anchor spacing
- derived target weight / required weight loss when target KFA is used
- timeframe
- optional current KFA
- Mifflin/Cunningham resting-energy routing
- MET-based everyday activity
- separate step-energy component
- MET-based training with duration
- 10 % TEF approximation
- transparent calculation breakdown
- static 7,700 kcal/kg deficit planning model
- calorie target
- planned cheat-day / higher-calorie-day screen with weekly-budget handling, exact logic still open
- optional macro mode
- validated macro targets
- editable calorie target in settings

### Exclude initially
- dynamic day-by-day body-weight/TDEE simulation
- LLM
- voice food logging
- AI meal alternatives
- AI-generated body/KFA visualization generated uniquely for each user

## Development plan discussed

1. generate wireframes using Figma/Uizard/Motif or equivalent
2. decide how AI should eventually be developed
3. collect formulas and scientific/background knowledge
4. decide tech stack
5. develop the app

The order can change. Scientific validation should precede hard-coding health-related numerical assumptions.

## Instructions for another AI

1. Read this file first.
2. Read `PRODUCT-DECISIONS.md` before changing already-decided behavior.
3. Treat `open-questions.md` as unresolved.
4. Never present provisional numerical parameters as established scientific facts.
5. Separate scientific evidence from product simplifications.
6. Preserve transparent, traceable calculations as a core principle.
7. Do not introduce an LLM into the MVP unless scope is explicitly changed.
8. When a product decision is made, update the relevant Markdown documentation.
9. Prefer explicit assumptions over opaque heuristics.
10. Keep future AI features separate from the deterministic calculation core.
