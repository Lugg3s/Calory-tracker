import React, { useState } from "react";
import { router } from "expo-router";
import { useStore } from "../src/state/store";
import { daysBetween, localDate } from "../src/domain/plan";
import { Page, Title, Body, Card, Button, Field } from "../src/components/ui";
import { Navigation } from "../src/components/Navigation";
export default function Profile() {
  const store = useStore();
  const plan = store.plans.at(-1);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  function edit() {
    if (plan)
      store.update({
        ...plan.input,
        days: Math.max(7, daysBetween(localDate(), plan.end) + 1),
      });
    router.push("/onboarding");
  }
  return (
    <Page>
      <Navigation active="profile" />
      <Title>Dein Profil</Title>
      <Card>
        <Body>Gastmodus · auf diesem Gerät</Body>
        <Body>
          Dein Plan funktioniert ohne Konto. Die Kontoanbindung ist in diesem
          Entwicklungsstand noch nicht verfügbar.
        </Body>
      </Card>
      {plan && (
        <Card>
          <Body>
            {plan.input.height} cm · {plan.input.weight} kg · {plan.input.age}{" "}
            Jahre
          </Body>
          <Body>Ziel: {plan.result.targetWeight.toFixed(1)} kg</Body>
          <Body>
            {plan.input.macros ? "Kalorien und Makros" : "Nur Kalorien"} ·{" "}
            {store.plans.length} gespeicherte Planversion(en)
          </Body>
          <Button title="Persönliche Daten und Plan ändern" onPress={edit} />
        </Card>
      )}
      <Card>
        <Body>Erweiterte Anpassung</Body>
        <Field
          label="Manuelles Tagesziel"
          suffix="kcal"
          optional
          value={store.draft.manualCalories}
          onChange={(manualCalories) =>
            store.update({ ...store.draft, manualCalories })
          }
        />
        <Body>
          Leer lassen, um die Berechnung zu verwenden. Manuelle Werte gelten
          erst, wenn du den Plan erneut prüfst und speicherst.
        </Body>
        <Button
          title="Entwurf prüfen"
          secondary
          onPress={() => router.push("/onboarding")}
        />
      </Card>
      {confirm ? (
        <>
          <Body>
            Alle lokal gespeicherten Eingaben und Planversionen löschen?
          </Body>
          <Button
            title="Lokale Daten endgültig löschen"
            onPress={() =>
              void store
                .reset()
                .then(() => router.replace("/"))
                .catch(() =>
                  setError("Die Daten konnten nicht gelöscht werden."),
                )
            }
          />
          <Button
            title="Abbrechen"
            secondary
            onPress={() => setConfirm(false)}
          />
        </>
      ) : (
        <Button
          title="Lokale Daten zurücksetzen"
          secondary
          onPress={() => setConfirm(true)}
        />
      )}
      <Body>{error || store.error}</Body>
    </Page>
  );
}
