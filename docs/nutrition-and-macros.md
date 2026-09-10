# Ernährung & Makronährstoffe

## Grundidee

Makronährstofftracking ist optional. Nutzer sollen die App vollständig im einfachen Kalorienmodus verwenden können.

## Tracking-Modi

### Kalorien-only

Der Nutzer bekommt ausschließlich sein Kalorienziel bzw. seine Tages-/Wochenbudgets.

### Kalorien + Makros

Der Nutzer bekommt zusätzlich Ziele für:

- Protein
- Fett
- Kohlenhydrate

## V1-Methodenentscheidung

Für V1 wird eine einfache, deterministische Mischmethode verwendet:

1. Protein wird in Gramm pro Kilogramm **aktuellem Körpergewicht** berechnet.
2. Fett wird als fester Anteil des täglichen Kalorienbudgets berechnet.
3. Kohlenhydrate erhalten die verbleibenden Kalorien.

Im Produktgespräch wurden drei grundsätzliche Ansätze verglichen:

- reine prozentuale Makroverteilung;
- Protein pro kg Körpergewicht + Fett als Kalorienanteil + Kohlenhydrate als Rest;
- Protein auf Basis fettfreier Masse/KFA.

Für V1 wurde der zweite Ansatz gewählt. Eine reine Prozentverteilung würde Protein bei sinkendem Kalorienziel automatisch mit absenken. Ein FFM-/KFA-basierter Ansatz wurde für V1 verworfen, weil KFA optional und teilweise nur visuell geschätzt ist und damit unnötige Zusatzkomplexität erzeugt.

Die gewählten Werte sind **Produktregeln für V1**, keine Aussage, dass exakt diese Verteilung für jeden Menschen physiologisch optimal ist.

## Protein

Die Proteinmenge richtet sich in V1 ausschließlich nach der bereits im Onboarding erfassten Sporthäufigkeit:

```text
weniger als 3 Sporteinheiten pro Woche:
Protein = 1,4 g × aktuelles Körpergewicht(kg)

3 oder mehr Sporteinheiten pro Woche:
Protein = 2,0 g × aktuelles Körpergewicht(kg)
```

Für die V1-Grenze zählt **jede regelmäßig ausgeübte Sportart**, nicht nur Kraftsport.

Eine zusätzliche Frage nach „Muskelaufbau“, „Muskelerhalt“ oder einem vergleichbaren Muskelziel wird im initialen MVP **nicht** ergänzt. Die vorhandene Sporthäufigkeit reicht für die Protein-Klassifizierung aus.

V1 verwendet bewusst das **aktuelle tatsächliche Körpergewicht** als Bezugsgewicht. Es gibt zunächst keine Korrektur für hohen KFA, kein Idealgewicht und kein Zielgewichts-Cap für die Proteinberechnung. Eine solche Bezugsgewichtsregel kann später geprüft werden.

## Fett

Fett wird in V1 auf **30 % des jeweiligen täglichen Kalorienbudgets** gesetzt.

```text
Fett-kcal = Tageskalorien × 0,30
Fett(g) = Fett-kcal / 9
```

Die 30-%-Regel ist eine einfache V1-Produktentscheidung. Sie ersetzt den früher diskutierten Ansatz von `0,8 g/kg Körpergewicht`.

## Kohlenhydrate

Kohlenhydrate erhalten alle verbleibenden Kalorien nach Protein und Fett:

```text
Protein-kcal = Protein(g) × 4
Fett-kcal = Fett(g) × 9
Kohlenhydrat-kcal = Tageskalorien - Protein-kcal - Fett-kcal
Kohlenhydrate(g) = Kohlenhydrat-kcal / 4
```

Es gibt für V1 keinen separaten Kohlenhydrat-Mindestwert in der Makro-Engine.

Wenn ein sehr niedriges Kalorienziel dazu führt, dass die Kombination aus Proteinregel und 30-%-Fettregel kaum oder keinen sinnvollen Spielraum für Kohlenhydrate lässt, soll nicht still die Makroregel verbogen werden. Stattdessen ist das **Kalorienziel selbst zu prüfen** bzw. die bestehende Kalorien-Sicherheitslogik anzuwenden.

## Beispiele

### 75 kg, 1.800 kcal, weniger als 3 Sporteinheiten/Woche

```text
Protein:
75 × 1,4 = 105 g
105 × 4 = 420 kcal

Fett:
1.800 × 0,30 = 540 kcal
540 / 9 = 60 g

Kohlenhydrate:
1.800 - 420 - 540 = 840 kcal
840 / 4 = 210 g
```

Ergebnis:

- Protein: **105 g**
- Fett: **60 g**
- Kohlenhydrate: **210 g**

### 75 kg, 1.800 kcal, mindestens 3 Sporteinheiten/Woche

```text
Protein:
75 × 2,0 = 150 g
150 × 4 = 600 kcal

Fett:
1.800 × 0,30 = 540 kcal
540 / 9 = 60 g

Kohlenhydrate:
1.800 - 600 - 540 = 660 kcal
660 / 4 = 165 g
```

Ergebnis:

- Protein: **150 g**
- Fett: **60 g**
- Kohlenhydrate: **165 g**

## Flexible Tage / höheres Tagesbudget

Die Makroregeln werden auf das jeweilige Tagesbudget angewendet.

Für einen flexiblen Tag gilt:

- die Proteinmenge in Gramm bleibt bei unverändertem Körpergewicht und Sportstatus gleich;
- Fett bleibt bei **30 % der Kalorien dieses Tages**;
- Kohlenhydrate erhalten anschließend die verbleibenden Kalorien.

Dadurch steigt an einem höheren Kalorientag die Fettmenge proportional mit dem Tagesbudget; der verbleibende zusätzliche Spielraum landet bei den Kohlenhydraten.

## Rundung

V1 soll nutzerfreundlich auf ganze Gramm darstellen:

1. Protein auf ganze Gramm runden;
2. Fett auf ganze Gramm runden;
3. Kohlenhydrate aus den danach verbleibenden Kalorien berechnen und auf ganze Gramm runden.

Intern können ungerundete Werte weitergeführt werden. Durch die Darstellung in ganzen Gramm kann die sichtbare Makrosumme um wenige kcal vom exakten Tagesbudget abweichen.

## Anpassbarkeit

Der Nutzer soll Makronährstoffziele grundsätzlich manuell anpassen können. Diese Einstellung soll nicht prominent auf dem Main Screen liegen, sondern in Einstellungen oder einem erweiterten Bereich.

## Nicht Teil der V1-Makro-Engine

Für V1 werden keine zusätzlichen Zielgrößen in die eigentliche Makroberechnung aufgenommen, insbesondere nicht:

- Ballaststoffziel;
- gesättigte Fettsäuren;
- Omega-3-Ziel;
- automatische FFM-/KFA-basierte Proteinkorrektur;
- separate Makrologik für Muskelaufbau oder Muskelerhalt.

Diese Punkte können später als Ernährungsqualitäts- oder Personalisierungsfunktionen ergänzt werden.

## Spätere Validierung / Verbesserung

Trotz der festgelegten V1-Produktregeln bleiben folgende Verbesserungen denkbar:

- Prüfung einer Bezugsgewichtsregel bei sehr hohem Körpergewicht/KFA;
- sportartspezifischere Proteinempfehlungen;
- Anpassung der Makros an Trainingsvolumen oder Leistungsziele;
- zusätzliche Ernährungsqualitätsziele;
- Validierung der Regeln gegen unterschiedliche Nutzergruppen und Kalorienbereiche.
