import { router } from "expo-router";
import { Text, View } from "react-native";
import { useStore } from "../src/state/store";
import { Page, Title, Body, Card, Button, styles } from "../src/components/ui";
export default function Calculation() {
  const plan = useStore().plans.at(-1);
  if (!plan)
    return (
      <Page>
        <Body>Noch kein gespeicherter Plan.</Body>
        <Button title="Zur Startseite" onPress={() => router.replace("/")} />
      </Page>
    );
  const r = plan.result;
  const rows: [string, number][] = [
    ["Ruheumsatz", r.rmr],
    ["Alltagsaktivität (netto)", r.activity],
    ["Schritte (netto)", r.steps],
    ["Training (Tagesdurchschnitt, netto)", r.training],
    ["Erhaltungsbedarf inkl. Verdauung", r.maintenance],
    ["Geplantes Energiedefizit", r.deficit],
    ["Berechnetes Tagesziel", r.calculatedCalories],
  ];
  return (
    <Page>
      <Title>So entsteht dein Ziel</Title>
      <Body>
        Alle Angaben in kcal pro Tag. Die Werte sind Schätzungen aus deinen
        Eingaben.
      </Body>
      <Card>
        {rows.map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={[styles.body, { flex: 1 }]}>{label}</Text>
            <Text style={styles.label}>{Math.round(value)}</Text>
          </View>
        ))}
      </Card>
      <Body>
        Der Verdauungsaufwand beträgt im Modell 10 % der aufgenommenen Energie.
        Deshalb wird das Ziel als (Grundbedarf − Defizit) ÷ 0,9 berechnet.
      </Body>
      <Body>
        {plan.input.bodyFat === undefined
          ? "Ruheumsatz: Mifflin-St Jeor aus Gewicht, Größe, Alter und Berechnungskategorie."
          : "Ruheumsatz: Cunningham aus der fettfreien Masse."}
      </Body>
      {plan.input.manualCalories !== undefined && (
        <Body>
          Du verwendest stattdessen ein manuelles Tagesziel von{" "}
          {plan.input.manualCalories} kcal.
        </Body>
      )}
      {plan.input.cheat && (
        <Body>
          Für deinen Cheat Day wird das Budget umverteilt; die Summe der sieben
          Tagesziele bleibt gleich.
        </Body>
      )}
      {r.warnings.map((w) => (
        <Body key={w}>{w}</Body>
      ))}
      <Button
        title="Zurück zu Heute"
        onPress={() => router.replace("/today")}
      />
    </Page>
  );
}
