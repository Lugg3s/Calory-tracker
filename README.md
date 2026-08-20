# Calory Tracker

A transparent, explainable weight-loss planning and calorie-tracking app.

## Product status

Calory Tracker is currently in the product-definition / MVP-planning phase. The calculation model and scientific assumptions are not yet finalized.

## What the product does

The core idea is simple: the user enters their body data, everyday activity, exercise habits, and weight-loss goal. The app estimates their energy requirement and derives a calorie target for the requested timeframe.

The important product differentiator is **transparency**. Instead of only showing a number such as `2,000 kcal`, the app should show how the number was derived — similar to a cost calculation or payslip — and allow the user to understand the influence of their inputs.

## MVP direction

The first MVP is intended to include:

- onboarding and relevant body/activity data
- target weight and timeframe
- optional current KFA
- optional target KFA when current KFA is known
- energy-requirement calculation
- transparent calculation breakdown
- weight-loss deficit calculation
- activity and exercise contributions
- calorie target
- optional macro mode
- user-editable calorie target in settings

The MVP should **not depend on an LLM**.

## Documentation

Start with [`docs/PROJECT-CONTEXT.md`](docs/PROJECT-CONTEXT.md). It is the main briefing for understanding the product without the original planning conversation.

Then read:

1. [`docs/PRODUCT-DECISIONS.md`](docs/PRODUCT-DECISIONS.md) — decisions already made
2. [`docs/mvp-requirements.md`](docs/mvp-requirements.md) — MVP requirements
3. [`docs/calorie-calculation.md`](docs/calorie-calculation.md) — calculation concept
4. [`docs/nutrition-and-macros.md`](docs/nutrition-and-macros.md) — nutrition and macro concept
5. [`docs/open-questions.md`](docs/open-questions.md) — unresolved questions
6. the remaining documents for food tracking, AI, roadmap, onboarding, and future features

## Important documentation rule

This repository is intended to become the **source of truth for the product**. When a product decision is made, update the relevant Markdown documentation. Do not silently turn open questions or provisional scientific assumptions into fixed requirements.
