import React, { useState } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useStore } from "../src/state/store";
import { calculate, Input, Sport } from "../src/domain/plan";
import {
  Page,
  Title,
  Body,
  Card,
  Button,
  Choice,
  Field,
  styles,
} from "../src/components/ui";
import { Theo } from "../src/components/Theo";
const names = [
  "Berechnungskategorie",
  "Wie alt bist du?",
  "Wie groß bist du?",
  "Dein aktuelles Gewicht",
  "Körperfettanteil",
  "Dein Alltag",
  "Deine täglichen Schritte",
  "Training pro Woche",
  "Deine Sportart",
  "Dauer pro Einheit",
  "Was ist dein Ziel?",
  "Dein Zielwert",
  "Dein Zeitraum",
  "Dein berechnetes Budget",
  "Ein Cheat Day?",
  "Kalorien oder auch Makros?",
  "Dein Plan",
];
const activity = [
  "Überwiegend sitzend",
  "Sitzen und Stehen",
  "Überwiegend stehend",
  "Körperlich aktiv",
  "Schwere körperliche Arbeit",
];
const sportNames: Record<Sport, string> = {
  strength: "Krafttraining",
  running: "Laufen",
  cycling: "Radfahren",
  swimming: "Schwimmen",
  hiit: "HIIT",
  team: "Teamsport",
  yoga: "Yoga",
  other: "Andere Sportart",
};
const weekdays = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
export default function Onboarding() {
  const store = useStore();
  const d = store.draft;
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (patch: Partial<Input>) => store.update({ ...d, ...patch });
  const training = d.training[0] ?? {
    sport: "strength" as Sport,
    sessions: 0,
    minutes: 60,
  };
  const train = (patch: Partial<typeof training>) =>
    set({ training: [{ ...training, ...patch }] });
  let result: ReturnType<typeof calculate> | undefined;
  let calcError = "";
  try {
    result = calculate(d);
  } catch (e) {
    calcError = (e as Error).message;
  }
  const field = (
    label: string,
    key: "age" | "height" | "weight" | "steps" | "goal" | "days",
    suffix: string,
  ) => (
    <Field
      label={label}
      value={d[key]}
      suffix={suffix}
      onChange={(value) => set({ [key]: value ?? NaN })}
    />
  );
  const go = (direction: number) => {
    if (direction > 0) {
      const bounds: Record<number, [number, number, number, string]> = {
        1: [d.age, 18, 100, "Alter"],
        2: [d.height, 120, 230, "Größe"],
        3: [d.weight, 35, 300, "Gewicht"],
        6: [d.steps, 0, 50000, "Schritte"],
        7: [training.sessions, 0, 14, "Einheiten"],
        9: [training.minutes, 5, 300, "Dauer"],
        11: [
          d.goal,
          d.goalKind === "weight" ? 35 : 3,
          d.goalKind === "weight" ? d.weight : (d.bodyFat ?? 0),
          "Ziel",
        ],
        12: [d.days, 7, 730, "Zeitraum"],
      };
      const b = bounds[step];
      if (b && (!Number.isFinite(b[0]) || b[0] < b[1] || b[0] > b[2])) {
        setError(
          `${b[3]}: Bitte einen Wert zwischen ${b[1]} und ${b[2]} eingeben.`,
        );
        return;
      }
      if (
        step === 4 &&
        d.bodyFat !== undefined &&
        (!Number.isFinite(d.bodyFat) || d.bodyFat < 3 || d.bodyFat > 65)
      ) {
        setError("Körperfettanteil: 3 bis 65 % oder leer lassen.");
        return;
      }
      if (step === 12 && !Number.isInteger(d.days)) {
        setError("Bitte ganze Tage eingeben.");
        return;
      }
    }
    let next = step + direction;
    if (!training.sessions && next === 8) next = 10;
    if (!training.sessions && next === 9) next = 7;
    setStep(next);
    setError("");
  };
  async function save() {
    setBusy(true);
    try {
      await store.accept();
      router.replace("/today");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <View style={styles.row}>
        <Text style={styles.small}>DEIN PLAN · {step + 1} / 17</Text>
        <Button
          title="Schließen"
          secondary
          onPress={() => router.replace(store.plans.length ? "/profile" : "/")}
        />
      </View>
      <Theo
        key={step}
        height={step === 2 && Number.isFinite(d.height) ? d.height : 170}
        hair={step === 0 ? d.sex : undefined}
        intro={!store.introSeen}
        onIntroSeen={store.dismissIntro}
        help={
          step === 0
            ? "Die Auswahl bestimmt den geschlechtsspezifischen Term der Ruheumsatzformel. Mit Körperfettanteil wird die fettfreie Masse verwendet."
            : step === 13
              ? "Dein Tagesziel berücksichtigt Ruheumsatz, Alltag, Schritte, Sport und den Energieaufwand der Verdauung. Es ist eine Schätzung."
              : step === 14
                ? "Ein höheres Ziel an einem Tag wird auf die übrigen sechs Tage verteilt. Das Wochenbudget bleibt gleich."
                : "Deine Angaben fließen in die Modellberechnung ein. Du kannst sie später im Profil ändern."
        }
      />
      <Title>{names[step]}</Title>
      {step === 0 && (
        <>
          <Body>Welche Kategorie soll die Berechnung verwenden?</Body>
          <Choice
            title="Weiblich"
            selected={d.sex === "female"}
            onPress={() => set({ sex: "female" })}
          />
          <Choice
            title="Männlich"
            selected={d.sex === "male"}
            onPress={() => set({ sex: "male" })}
          />
        </>
      )}
      {step === 1 && field("Alter", "age", "Jahre")}
      {step === 2 && field("Größe", "height", "cm")}
      {step === 3 && field("Gewicht", "weight", "kg")}
      {step === 4 && (
        <>
          <Body>
            Wenn du deinen Körperfettanteil kennst, kann die Berechnung deine
            fettfreie Masse berücksichtigen. Du kannst diese Angabe weglassen.
          </Body>
          <Field
            label="Körperfettanteil"
            value={d.bodyFat}
            suffix="%"
            optional
            onChange={(bodyFat) =>
              set({
                bodyFat,
                ...(bodyFat === undefined && d.goalKind === "bodyFat"
                  ? { goalKind: "weight", goal: d.weight }
                  : {}),
              })
            }
          />
        </>
      )}
      {step === 5 &&
        activity.map((label, i) => (
          <Choice
            key={label}
            title={label}
            selected={d.activity === i}
            onPress={() => set({ activity: i })}
          />
        ))}
      {step === 6 && (
        <>
          {field("Schritte im Tagesdurchschnitt", "steps", "Schritte")}
          <Body>
            Verwende möglichst deinen Durchschnitt aus mehreren typischen Tagen.
          </Body>
        </>
      )}
      {step === 7 && (
        <Field
          label="Einheiten pro Woche"
          value={training.sessions}
          onChange={(sessions) =>
            set({
              training:
                sessions === 0
                  ? []
                  : [{ ...training, sessions: sessions ?? NaN }],
            })
          }
        />
      )}
      {step === 8 &&
        (Object.keys(sportNames) as Sport[]).map((s) => (
          <Choice
            key={s}
            title={sportNames[s]}
            selected={training.sport === s}
            onPress={() => train({ sport: s })}
          />
        ))}
      {step === 9 && (
        <Field
          label="Durchschnittliche Dauer"
          suffix="Minuten"
          value={training.minutes}
          onChange={(minutes) => train({ minutes: minutes ?? NaN })}
        />
      )}
      {step === 10 && (
        <>
          <Choice
            title="Zielgewicht"
            selected={d.goalKind === "weight"}
            onPress={() => set({ goalKind: "weight", goal: d.weight })}
          />
          {d.bodyFat !== undefined && (
            <Choice
              title="Ziel-Körperfettanteil"
              selected={d.goalKind === "bodyFat"}
              onPress={() => set({ goalKind: "bodyFat", goal: d.bodyFat! })}
            />
          )}
        </>
      )}
      {step === 11 &&
        field(
          d.goalKind === "weight" ? "Zielgewicht" : "Ziel-Körperfettanteil",
          "goal",
          d.goalKind === "weight" ? "kg" : "%",
        )}
      {step === 12 && field("Zeitraum ab heute", "days", "Tage")}
      {step === 13 && (
        <Card>
          <Body>Durchschnittliches Tagesziel vor Cheat-Day-Verteilung</Body>
          <Title>
            {result ? Math.round(result.calories).toLocaleString("de-DE") : "—"}{" "}
            kcal
          </Title>
          <Body>
            Erhaltungsbedarf: {result ? Math.round(result.maintenance) : "—"}{" "}
            kcal
          </Body>
          <Body>Du kannst den Zeitraum über „Zurück“ anpassen.</Body>
        </Card>
      )}
      {step === 14 && (
        <>
          <Choice
            title="Ohne Cheat Day"
            selected={!d.cheat}
            onPress={() => set({ cheat: undefined })}
          />
          <Choice
            title="Einen Tag einplanen"
            selected={!!d.cheat}
            onPress={() =>
              set({ cheat: d.cheat ?? { weekday: 6, calories: 2000 } })
            }
          />
          {d.cheat && (
            <>
              <Body>Wähle den Tag und sein gesamtes Kalorienziel.</Body>
              {weekdays.map((day, i) => (
                <Choice
                  key={day}
                  title={day}
                  selected={d.cheat?.weekday === i}
                  onPress={() => set({ cheat: { ...d.cheat!, weekday: i } })}
                />
              ))}
              <Field
                label="Kalorien am Cheat Day"
                suffix="kcal · 50er-Schritte"
                value={d.cheat.calories}
                onChange={(calories) =>
                  set({ cheat: { ...d.cheat!, calories: calories ?? NaN } })
                }
              />
              {result && (
                <Body>
                  Übrige Tage: etwa{" "}
                  {Math.round((result.weeklyBudget - d.cheat.calories) / 6)}{" "}
                  kcal
                </Body>
              )}
            </>
          )}
        </>
      )}
      {step === 15 && (
        <>
          <Choice
            title="Kalorien und Makros"
            selected={d.macros}
            onPress={() => set({ macros: true })}
          />
          <Choice
            title="Nur Kalorien"
            selected={!d.macros}
            onPress={() => set({ macros: false })}
          />
        </>
      )}
      {step === 16 && result && (
        <>
          <Card>
            <Body>Dein durchschnittliches Tagesziel</Body>
            <Title>
              {Math.round(result.calories).toLocaleString("de-DE")} kcal
            </Title>
            <Body>
              {d.weight} → {result.targetWeight.toFixed(1)} kg · {d.days} Tage
            </Body>
            <Body>Erhaltungsbedarf: {Math.round(result.maintenance)} kcal</Body>
            <Body>
              Geplantes Energiedefizit: {Math.round(result.deficit)} kcal/Tag
            </Body>
          </Card>
          <Body>
            Dein Plan wird auf diesem Gerät gespeichert. Im Profil kannst du
            alle Angaben erneut bearbeiten.
          </Body>
        </>
      )}
      {step >= 13 &&
        (calcError ? (
          <Body>{calcError}</Body>
        ) : (
          result?.warnings.map((w) => <Body key={w}>{w}</Body>)
        ))}
      {error && <Body>{error}</Body>}
      {store.error && <Body>{store.error}</Body>}
      {step === 16 ? (
        <Button
          title={
            busy ? "Wird gespeichert …" : "Plan auf diesem Gerät speichern"
          }
          disabled={busy || !result || result.blocked}
          onPress={() => void save()}
        />
      ) : (
        <Button title="Weiter" onPress={() => go(1)} />
      )}
      {step > 0 && <Button title="Zurück" secondary onPress={() => go(-1)} />}
    </Page>
  );
}
