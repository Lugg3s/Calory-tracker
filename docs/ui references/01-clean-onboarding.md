# UI Reference 01 — Clean onboarding input screens

## Context

This reference comes from a user-provided onboarding UI example. It should be used as a visual and interaction reference when designing Calory Tracker's onboarding screens.

The reference is **not** a specification to copy literally. The important part is the user's stated preference for the visual hierarchy, density, whitespace, and progressive disclosure.

## What to preserve

### 1. Very clean, single-purpose screens

The strongest positive reference is that each onboarding screen contains essentially only the information request that matters for that step.

Desired direction:

- one clear primary question per screen;
- one primary input/control;
- generous whitespace;
- very little secondary UI competing with the input;
- clear visual hierarchy;
- calm, uncluttered presentation;
- obvious primary continue action.

This matches the existing Calory Tracker onboarding principle of one primary input parameter per screen.

### 2. Generous whitespace is important

The screens should feel intentionally sparse rather than packed with explanatory text, illustrations, badges, classifications, or secondary metrics.

Whitespace should be treated as a positive design element. The user should be able to understand immediately what they are supposed to answer.

## What to change compared with the reference

### 1. Explanatory subtitle should be hidden by default

The reference places a short explanatory sentence directly underneath the main question. For Calory Tracker, this information should **not** be permanently visible.

Instead, relevant input screens should provide a small information control/icon. Only after the user taps it should an explanation appear.

The explanation should answer two questions:

1. **Why is this information relevant?**
2. **How is this information used in the calculation or recommendation?**

The normal/default screen should therefore remain visually minimal.

This is especially important for inputs such as age, biological category, height, weight, KFA, activity, steps, training and goal data, where the user may reasonably want to know why the value is needed.

### 2. Do not add decorative person imagery to the height screen

The person illustration/image in the height example is **not desired**.

For Calory Tracker, the height screen should remain focused on the height input itself. A human figure should not be added merely to fill the available space or make the screen visually richer.

General implication: avoid decorative imagery on onboarding input screens unless it provides clear functional value. KFA reference imagery is a separate exception because it is explicitly functional and only shown when requested.

### 3. Avoid the density of the weight example

The weight example is considered too busy and does not leave enough whitespace.

The combination of weight input, BMI classification, colored category scale, labels and detailed ruler/graph-like treatment creates too many simultaneous information layers.

For Calory Tracker, the current-weight screen should therefore prioritize only the weight input in its default state.

Do **not** automatically add secondary elements such as:

- BMI category labels;
- colored BMI scales;
- health classifications;
- multiple explanatory metrics;
- dense ruler/chart decoration;
- extra interpretation that is not necessary to complete the input.

If secondary information is genuinely useful, prefer progressive disclosure behind an info control rather than placing it permanently on the screen.

## Design principles extracted from this reference

For future onboarding design work, this reference translates into the following rules:

- **Minimal by default.** Only show what is required to answer the current question.
- **One dominant task per screen.** Secondary information must not compete with the input.
- **Use whitespace deliberately.** Do not fill empty areas merely for visual interest.
- **Progressive disclosure for explanations.** Explanations live behind an information icon/control.
- **Explain relevance, not just definitions.** Optional help should say why the input matters and how Calory Tracker uses it.
- **Avoid decorative people/illustrations on data-entry screens.** Imagery needs a functional reason.
- **Avoid unnecessary health classifications during basic input.** The weight screen in particular should stay much simpler than the provided reference's third screen.
- **Clarity over feature density.** A user should immediately know what to do without scanning multiple visual elements.

## Relationship to implementation freedom

The exact typography, colors, spacing values, picker components, progress indicator and button styling are not fixed by this reference. The implementation AI/designer may choose them, as long as the resulting onboarding remains simple, understandable and visually sparse.

The core criterion is that the screen should feel closer to the clean first/second reference screens than to the denser third reference screen.
