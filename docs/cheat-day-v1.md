# Cheat Day V1

Dieses Dokument hält die aktuelle V1-Entscheidung für den **Cheat Day** fest. Der Begriff „Cheat Day“ ist für V1 bewusst gewählt.

## Produktprinzip

Der Cheat Day erhöht das Wochenbudget **nicht**. Der Nutzer verschiebt lediglich Kalorien innerhalb derselben Woche auf einen ausgewählten Tag.

V1 erlaubt **maximal einen Cheat Day pro Woche**.

## Position im Flow

Der Nutzer soll zuerst seinen berechneten Plan ohne Cheat Day sehen bzw. mindestens folgende Ausgangswerte kennen:

- durchschnittliches Tagesziel `C`;
- daraus abgeleitetes Wochenbudget `W`;
- normales Tagesbudget ohne Umverteilung.

Erst danach wird gefragt, ob der Nutzer einen Cheat Day einbauen möchte. Dadurch ist sichtbar, wovon die Cheat-Day-Kalorien abgezogen werden.

## Berechnung

```text
Wochenbudget W = C × 7
```

Wählt der Nutzer einen Cheat Day mit Tagesbudget `H`, werden die restlichen sechs Tage gleichmäßig reduziert:

```text
reguläres Tagesbudget L = (W - H) / 6
```

Das Wochenbudget bleibt unverändert.

Beispiel:

```text
normales Tagesziel C = 2.000 kcal
Wochenbudget W = 14.000 kcal
Cheat Day H = 2.500 kcal

L = (14.000 - 2.500) / 6
L ≈ 1.917 kcal
```

Der Cheat Day enthält damit 500 kcal mehr als das ursprüngliche Tagesziel; die anderen sechs Tage enthalten jeweils ungefähr 83 kcal weniger.

## Obergrenze

Die frühere V1-Richtung „Cheat Day maximal bis zum Erhaltungsbedarf“ ist **ersetzt**.

Die nutzerseitige Cheat-Day-Obergrenze basiert auf dem normalen durchschnittlichen Tagesziel:

```text
Basis = W / 7 = C
nominale Cheat-Day-Obergrenze = C + 1.000 kcal
```

Der auswählbare Wert liegt auf einem **50-kcal-Raster**. Da es sich um eine Obergrenze handelt, soll der technische Maximalwert auf den nächsten zulässigen 50-kcal-Wert **abgerundet** werden, damit die +1.000-kcal-Grenze nicht überschritten wird.

Zusätzlich bleiben die automatischen Sicherheitsgrenzen für die sechs regulären Tage aktiv. Die tatsächlich auswählbare Obergrenze ist deshalb der kleinere Wert aus:

1. `C + 1.000 kcal` auf dem 50-kcal-Raster;
2. dem höchsten Cheat-Day-Wert, bei dem die sechs übrigen Tage die automatischen Planungsgrenzen noch einhalten.

Formal mit `F` als niedrigstem zulässigem regulären Tagesbudget:

```text
H <= W - 6 × F
```

Damit ergibt sich konzeptionell:

```text
H_max = min(
  floor_to_50(C + 1.000),
  floor_to_50(W - 6 × F)
)
```

Wenn kein sinnvoll höherer Cheat-Day-Wert möglich ist, soll die App dies transparent anzeigen bzw. einen längeren Zielzeitraum vorschlagen.

## UI-Interaktion

Die genaue Microcopy kann später verfeinert werden. Die V1-Interaktion ist jedoch festgelegt:

1. Frage, ob der Nutzer einen Cheat Day einbauen möchte.
2. Bei „Ja“ werden **Montag bis Sonntag** als auswählbare Tage angezeigt.
3. Der Nutzer kann **genau einen** Wochentag auswählen.
4. Danach erscheint ein Zahlenregler / Wheel / Slider für das gewünschte **gesamte Kalorienbudget des Cheat Days**.
5. Der Regler arbeitet in **50-kcal-Schritten**.
6. Während der Nutzer den Cheat-Day-Wert verändert, aktualisieren sich die Kalorienbudgets der sechs anderen Tage **live**.
7. Das unveränderte Wochenbudget soll gleichzeitig sichtbar bzw. verständlich nachvollziehbar bleiben.

Die konkrete UI-Komponente (Wheel, Slider oder vergleichbarer Zahlenregler) darf in der Wireframe-Phase noch optimiert werden; die 50-kcal-Schrittweite und Live-Neuberechnung sind entschieden.

## Info-Button mit Lebensmittelbeispielen

Analog zu den optionalen Erklärungen auf anderen Onboarding-Screens soll der Cheat-Day-Screen einen kleinen **Info-Button** bzw. eine optionale Hilfsansicht anbieten.

Diese Hilfe soll typische Cheat-Day-Lebensmittel und grobe Kaloriengrößenordnungen zeigen, damit Nutzer besser einschätzen können, welches Tagesbudget zu ihrem geplanten Essen passt. Beispiele können sein:

- Pizza;
- Bier;
- Kuchen;
- Burger;
- Pommes.

Die Angaben sollen als **ungefähre Richtwerte bzw. Bereiche** dargestellt werden und keine falsche Präzision suggerieren, da Rezept, Portion und Produkt stark variieren können.

Die konkreten Lebensmittel, Portionsdefinitionen und kcal-Bereiche sind noch als Content-Aufgabe festzulegen.

## Makros am Cheat Day

Die allgemeinen V1-Makroregeln gelten auch am Cheat Day:

- Protein bleibt bei unverändertem Gewicht und Sport-Tier in Gramm gleich;
- Fett entspricht 30 % des Cheat-Day-Kalorienbudgets;
- Kohlenhydrate erhalten die verbleibenden Kalorien.

Kleine Rundungsabweichungen der sichtbaren Makro-kcal gegenüber dem Tagesbudget sind akzeptiert und müssen nicht künstlich ausgeglichen werden.

## Manuelle Plausibilitätschecks

Bei mehreren manuellen End-to-End-Beispielen funktionierten die Kernlogik, die Wochenumverteilung und die bestehenden Defizit-/Kalorien-Guardrails grundsätzlich wie vorgesehen. Dabei wurde als relevanter Sonderfall erkannt, dass ein nur durch die sechs übrigen Tage begrenzter Cheat Day mathematisch sehr hoch werden kann. Daraus entstand die zusätzliche Produktgrenze `C + 1.000 kcal`.

Diese manuellen Rechenchecks sind **keine wissenschaftliche End-to-End-Validierung** des gesamten Energieverbrauchsmodells.