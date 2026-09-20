import { Redirect, router } from "expo-router";
import { useStore } from "../src/state/store";
import { Page, Title, Body, Button } from "../src/components/ui";
import { Theo } from "../src/components/Theo";
export default function Welcome() {
  const store = useStore();
  if (store.plans.length) return <Redirect href="/today" />;
  return (
    <Page>
      <Title>Theo</Title>
      <Body>Dein Ziel. Dein Alltag. Dein Plan.</Body>
      <Theo
        help="Ich helfe dir, die Berechnung zu verstehen."
        intro={!store.introSeen}
        onIntroSeen={store.dismissIntro}
      />
      <Title>Ein Plan, der zu dir passt.</Title>
      <Body>
        Berechne dein Kalorienziel und deine Makros. Ohne Konto – deine Eingaben
        bleiben auf diesem Gerät.
      </Body>
      {store.error ? (
        <>
          <Body>{store.error}</Body>
          <Button
            title="Lokale Daten zurücksetzen"
            secondary
            onPress={() => void store.reset()}
          />
        </>
      ) : null}
      <Button
        title={store.ready ? "Als Gast starten" : "Daten werden geladen …"}
        disabled={!store.ready}
        onPress={() => router.push("/onboarding")}
      />
      <Body>
        Für Erwachsene, die ihr Gewicht reduzieren oder halten möchten. Die
        Werte sind Modellschätzungen.
      </Body>
    </Page>
  );
}
