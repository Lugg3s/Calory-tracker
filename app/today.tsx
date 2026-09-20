import React, { useEffect, useState } from "react";
import { AppState, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useStore } from "../src/state/store";
import { localDate, macrosFor } from "../src/domain/plan";
import {
  Page,
  Title,
  Body,
  Card,
  Button,
  colors,
  styles,
} from "../src/components/ui";
import { Theo } from "../src/components/Theo";
import { Navigation } from "../src/components/Navigation";
export default function Today() {
  const store = useStore();
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const refresh = () => setDate(new Date());
    const id = setInterval(refresh, 30000);
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") refresh();
    });
    return () => {
      clearInterval(id);
      sub.remove();
    };
  }, []);
  if (!store.ready)
    return (
      <Page>
        <Body>Daten werden geladen …</Body>
      </Page>
    );
  const plan = store.plans.at(-1);
  if (!plan) return <Redirect href="/" />;
  const today = localDate(date);
  const ended = today > plan.end;
  const upcoming = today < plan.start;
  const kcal = plan.result.daily[date.getDay()];
  const macros = macrosFor(kcal, plan.input);
  return (
    <Page>
      <Navigation active="today" />
      <Text style={styles.small}>
        {date.toLocaleDateString("de-DE", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Text>
      <Title>Heute zählt.</Title>
      {ended || upcoming ? (
        <Card>
          <Title>
            {ended ? "Dein Zeitraum ist beendet." : "Dein Plan beginnt später."}
          </Title>
          <Body>
            {plan.start} bis {plan.end}
          </Body>
          <Button
            title="Plan anpassen"
            onPress={() => router.push("/profile")}
          />
        </Card>
      ) : (
        <>
          <Card>
            <View style={styles.row}>
              <Body>Dein Kalorienziel heute</Body>
              {plan.input.cheat?.weekday === date.getDay() && (
                <Text style={{ color: colors.peach }}>Cheat Day</Text>
              )}
            </View>
            <Text
              style={{ fontSize: 64, fontWeight: "300", color: colors.peach }}
            >
              {kcal.toLocaleString("de-DE")}
            </Text>
            <Body>kcal</Body>
          </Card>
          {plan.input.macros && (
            <Card>
              <View style={styles.row}>
                {(
                  [
                    ["Protein", macros.protein],
                    ["Fett", macros.fat],
                    ["Kohlenhydrate", macros.carbs],
                  ] as const
                ).map(([name, value]) => (
                  <View key={name} style={{ flex: 1, gap: 8 }}>
                    <Text style={{ fontSize: 23, color: colors.text }}>
                      {value} g
                    </Text>
                    <Text style={styles.small}>{name}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}
        </>
      )}
      <Theo
        help={`Dein geschätzter Erhaltungsbedarf beträgt ${Math.round(plan.result.maintenance)} kcal. Das Tagesziel berücksichtigt dein Ziel und deinen Zeitraum${plan.input.cheat ? " sowie die Verteilung für deinen Cheat Day" : ""}.`}
      />
      <Button
        title="Berechnung ansehen"
        secondary
        onPress={() => router.push("/calculation")}
      />
      <Body>
        {plan.input.weight} → {plan.result.targetWeight.toFixed(1)} kg · bis{" "}
        {plan.end.split("-").reverse().join(".")}
      </Body>
      <Body>Modellschätzung, keine gemessene Entwicklung.</Body>
    </Page>
  );
}
