# Product Decisions

This file records decisions made during product ideation. It is intentionally separate from open questions.

## D-001 — Transparency is a core product feature
**Status:** decided

The app should show how the calorie target is calculated instead of only displaying a final number. The presentation should resemble a cost calculation: base value, additions/subtractions, result.

## D-002 — KFA is optional
**Status:** decided

The user does not have to provide current KFA to use the basic weight-loss planning flow.

## D-003 — Target KFA requires current KFA
**Status:** decided

A target KFA should only be entered when current KFA is available. Otherwise the target KFA is not useful as a calculation target.

## D-004 — KFA can affect energy estimation when available
**Status:** decided direction

When current KFA is supplied, it should be usable in the energy-requirement calculation because body composition can differ substantially at the same height and body weight.

The mathematical implementation remains open.

## D-005 — KFA can provide an informational projection
**Status:** decided direction

If current KFA is known, the app may estimate a future KFA after a specified weight loss under an explicit constant-lean-mass assumption.

## D-006 — Calorie target is user-editable
**Status:** decided

The automatically calculated calorie target can be overridden by the user.

The control should live in settings/an advanced area and should not be prominent on the main screen.

## D-007 — Macro tracking is optional
**Status:** decided

The app provides a simple calorie-only mode and an advanced calorie + macro mode. Users are not forced to track macros.

## D-008 — Strength/performance training affects protein target
**Status:** decided

The onboarding should identify users who regularly strength train or participate in performance-oriented sport. This affects the recommended protein target.

## D-009 — Initial protein rules are provisional
**Status:** provisional

Current proposed defaults are 1.2 g/kg/day for users without regular strength training and 2.0 g/kg/day for regular strength/performance athletes.

These values require scientific validation before implementation as fixed product constants.

## D-010 — Initial fat rule is provisional
**Status:** provisional

0.8 g/kg/day was discussed as a provisional minimum fat target. This requires scientific validation.

## D-011 — Carbohydrates fill remaining calories
**Status:** provisional

In advanced macro mode, carbohydrates are initially planned as the remaining calories after protein and fat targets. This can be refined later.

## D-012 — MVP has no LLM dependency
**Status:** decided

The first MVP should function without an LLM. The deterministic calculation engine is the foundation.

## D-013 — Voice/LLM food tracking is a later feature
**Status:** decided direction

The longer-term product should let users describe what they ate, eventually by voice, and receive approximate intake estimates and suggestions for the remainder of the day.

## D-014 — AI is not the source of truth for core calculations
**Status:** decided direction

AI may interpret natural-language food input, but fundamental calorie and goal calculations should remain deterministic and traceable.

## D-015 — Future KFA visualization is not a measurement tool
**Status:** decided direction

Future image-based KFA visualizations are intended to help users understand possible target physiques, not to measure body-fat percentage accurately.

## D-016 — Onboarding should be short
**Status:** decided

The initial onboarding should not feel like a long questionnaire. The current UX target is that a normal first-time user can complete it in roughly two minutes.

This is a design target rather than a hard timing requirement; completeness of necessary inputs still takes priority.

## D-017 — One input parameter per onboarding screen
**Status:** decided

The onboarding should use one input parameter per screen rather than combining many fields on one page. The goal is to keep every screen visually simple and quick to complete.

Conditional screens are allowed, for example training type only when sport/training is relevant and target KFA only when current KFA is available.

## D-018 — Explanations are optional and hidden by default
**Status:** decided

Each relevant onboarding input should be able to expose a short explanation of why the value is requested and what it can influence.

The explanation should be hidden by default so the normal screen remains minimalistic and uncluttered.

## D-019 — Current onboarding sequence
**Status:** decided direction

The current intended sequence is:

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
11. goal type when current KFA is known: target weight or target KFA
12. goal value: target weight or target KFA, depending on the selected goal type
13. timeframe
14. planned cheat day / higher-calorie day — details still open
15. tracking mode
16. plan result

If no current KFA was entered, the KFA goal option is unavailable and the user proceeds directly with target weight.

Exact copy, controls, visual treatment, and micro-interactions may change during wireframing.

## D-020 — Show the first plan before advanced refinement
**Status:** decided

Once the required onboarding inputs are complete, the app should show the user's first plan rather than continuing with additional mandatory detail screens.

Further complexity should be offered after plan creation through calculation details, settings, or a "refine plan" area. This can include deeper explanations, additional activity/training details, manual calorie-target adjustment, macro-target adjustment, and later personalization options.

## D-021 — Current KFA can be estimated with a pre-generated reference-image library
**Status:** decided direction

On the optional current-KFA screen, the user may open visual examples to help estimate their body-fat percentage.

The reference images should be generated in advance rather than generated individually for each user at runtime. The library should be segmented by the previously entered sex / biological category, body-shape reference bucket, and KFA level. The current working direction is to use KFA levels in approximately five-percentage-point steps.

At runtime, the app selects the closest suitable reference group from the library based on the user's entered body data. The images are only shown when the user actively requests examples, so the default KFA screen remains minimalistic.

These images are an orientation aid for self-estimation, not a body-fat measurement or a claim that a specific appearance corresponds exactly to a specific KFA.

## D-022 — KFA reference-image body-shape bucket is derived automatically from height and weight
**Status:** decided direction

The user should not be asked an additional question about their body build just to select suitable KFA reference images.

Instead, the app should derive a coarse internal body-shape/reference bucket from the height and weight already entered by the user, for example using a BMI-like height-to-weight relationship. The reference library can then be indexed approximately by:

- sex / biological category
- derived body-shape/reference bucket
- KFA level

This reduces the required number of pre-generated reference images compared with storing a full grid for every height and weight combination.

The derived bucket is only an internal matching heuristic for choosing visual examples. It must not be presented as a KFA measurement or as a medical/health classification. The exact formula, number of buckets, and bucket thresholds remain open.

## D-023 — Target KFA can replace target weight as the primary goal
**Status:** decided direction

When the user has entered a current KFA, they may choose a **target KFA instead of a target weight** as their primary goal.

The target KFA should be selectable with visual reference images so the user can choose a desired body-fat level by appearance rather than needing to know a percentage precisely.

The app then derives the approximate target weight and required kilograms of weight loss from current weight, current KFA, and target KFA. The initial model direction is to assume constant fat-free mass:

```text
fat-free mass = current weight × (1 - current KFA)
target weight = fat-free mass ÷ (1 - target KFA)
required weight loss = current weight - target weight
```

This is a model estimate, not a prediction of actual body composition. The app must communicate that lean mass may change during weight loss and that KFA reference images are only approximate orientation aids.

If the user did not provide a current KFA, this goal mode is unavailable and target weight remains the required goal input.
