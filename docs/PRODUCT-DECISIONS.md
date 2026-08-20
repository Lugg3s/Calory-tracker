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
