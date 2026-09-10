# MVP-Anforderungen

## Ziel

Das MVP soll einen nachvollziehbaren Abnehmplan aus den wichtigsten Angaben des Nutzers erzeugen.

## User Input

Der Nutzer soll mindestens relevante Körperdaten und Informationen zur Alltagsaktivität angeben können. Dazu gehören insbesondere:

- Körpergewicht
- Körpergröße
- Alter
- Geschlecht bzw. für die verwendete Berechnung notwendige biologische Kategorie
- Alltagsaktivität / Tätigkeit, z. B. überwiegend sitzend
- Schritte bzw. durchschnittliche tägliche Schritte
- Sport / Training
- Trainingshäufigkeit
- Trainingsart und typische Dauer, wenn Training angegeben wird
- Zielgewicht oder, sofern aktueller KFA vorhanden ist, Ziel-KFA zur Ableitung des Zielgewichts
- Zeitraum bis zum Ziel

Der aktuelle KFA ist **optional**.

Wenn kein aktueller KFA angegeben wurde, definiert der Nutzer sein Ziel über ein direkt eingegebenes Zielgewicht.

Wenn ein aktueller KFA angegeben wurde, darf der Nutzer alternativ einen **Ziel-KFA** auswählen, auch anhand visueller Referenzbilder. In diesem Fall berechnet die App näherungsweise, welches Zielgewicht und welche Gewichtsabnahme dem gewählten Ziel-KFA entsprechen. Dieses berechnete Zielgewicht wird anschließend für die eigentliche Gewichtsverlust- und Kalorienplanung verwendet.

## Zielsetzung

Der Nutzer benötigt für die Planung ein Zielgewicht. Dieses entsteht entweder:

- durch direkte Eingabe des Zielgewichts; oder
- bei vorhandenem aktuellem KFA durch Auswahl eines Ziel-KFA, aus dem die App ein Zielgewicht ableitet.

Zusätzlich definiert der Nutzer den gewünschten Zeitraum.

Bei Ziel-KFA ist die daraus abgeleitete Gewichtsabnahme eine Modellschätzung. Die erste Modellrichtung geht von konstanter fettfreier Masse aus.

## Berechnung

Die App berechnet:

1. geschätzten Ruheenergiebedarf
2. geschätzten Erhaltungsbedarf / Gesamtenergieverbrauch
3. bei Ziel-KFA: modellhaftes Zielgewicht und notwendige Gewichtsabnahme
4. notwendiges Energiedefizit auf Basis des Zielgewichts
5. daraus abgeleitetes durchschnittliches Kalorienziel
6. Wochenbudget aus dem Tagesziel
7. optional eine Umverteilung auf **genau einen Cheat Day** und sechs reguläre Tage
8. im erweiterten Tracking-Modus zusätzlich Protein-, Fett- und Kohlenhydratziele

Die Details der Kalorienberechnung stehen in `calorie-calculation.md`, die Cheat-Day-Spezifikation in `cheat-day-v1.md` und die Makrologik in `nutrition-and-macros.md`.

## Transparenz-Ansicht

Ein zentraler MVP-Bestandteil ist eine detaillierte Berechnungsansicht, die wie eine einfache Kostenrechnung aufgebaut sein kann:

```text
Ruheenergiebedarf                   XXXX kcal
+ Alltagsaktivität                  XXXX kcal
+ Schritte                          XXXX kcal
+ Training                          XXXX kcal
--------------------------------------------
= geschätzter Erhaltungsbedarf     XXXX kcal

- geplantes Defizit                 XXX kcal
--------------------------------------------
= Kalorienziel                      XXXX kcal

× 7
= Wochenbudget                     XXXXX kcal
```

Die einzelnen Positionen sollen erklärbar sein.

Wenn Ziel-KFA zur Zieldefinition verwendet wird, soll zusätzlich nachvollziehbar dargestellt werden, wie aus aktuellem Gewicht, aktuellem KFA und Ziel-KFA das modellhafte Zielgewicht und die erforderliche Gewichtsabnahme abgeleitet wurden.

## Cheat Day

Der Nutzer sieht zunächst sein normales Tagesziel und Wochenbudget. Erst danach kann er optional einen **Cheat Day** konfigurieren.

V1-Anforderungen:

- maximal **ein** Cheat Day pro Woche;
- Auswahl eines Wochentags Montag bis Sonntag;
- Auswahl des gesamten Cheat-Day-Kalorienbudgets über einen Zahlenregler / Wheel / Slider;
- **50-kcal-Schritte**;
- Live-Neuberechnung der übrigen sechs Tagesbudgets;
- Wochenbudget bleibt unverändert;
- nominale Obergrenze `normales Tagesziel + 1.000 kcal`, auf das 50-kcal-Raster nach unten gerundet;
- tatsächliche Obergrenze kann niedriger sein, wenn die sechs regulären Tage sonst die automatischen Planungsgrenzen verletzen;
- optionaler Info-Button mit groben Kalorienbeispielen typischer Cheat-Day-Lebensmittel.

Die konkreten Lebensmittel, Portionsdefinitionen und kcal-Bereiche für den Info-Bereich sind noch nicht final festgelegt.

## Änderbare Werte

Der Nutzer darf das vorgeschlagene Kalorienziel manuell anpassen. Diese Einstellung soll **nicht prominent auf dem Main Screen** erscheinen, sondern beispielsweise in Einstellungen oder einem erweiterten Bereich.

Das gleiche Prinzip gilt für manuell anpassbare Makronährstoffziele.

## Trainingsprofil und Protein-Klassifizierung

Für V1 ist **keine zusätzliche Frage nach Muskelaufbau oder Muskelerhalt** erforderlich.

Die bereits erfasste Sporthäufigkeit bestimmt den Protein-Tier:

```text
weniger als 3 Sporteinheiten/Woche → 1,4 g Protein/kg aktuelles Körpergewicht
3 oder mehr Sporteinheiten/Woche   → 2,0 g Protein/kg aktuelles Körpergewicht
```

Für diese V1-Grenze zählt jede regelmäßige Sportart. Das aktuelle tatsächliche Körpergewicht wird direkt verwendet; eine KFA-/FFM- oder Idealgewichts-Korrektur ist nicht Teil des MVP.

## Tracking-Modi

### Einfach

- Kalorienziel
- keine verpflichtende Makroverfolgung

### Erweitert

- Kalorienziel
- Protein
- Fett
- Kohlenhydrate

Makronährstofftracking ist optional.

## V1-Makrologik

Im erweiterten Modus gilt:

```text
Protein = 1,4 oder 2,0 g/kg aktuelles Körpergewicht gemäß Sporthäufigkeit
Fett = 30 % des jeweiligen Tageskalorienbudgets
Kohlenhydrate = verbleibende Kalorien
```

Auf dem Cheat Day bleibt die Proteinmenge bei unverändertem Gewicht/Sportstatus gleich, Fett bleibt bei 30 % des höheren Tagesbudgets, Kohlenhydrate erhalten den Rest.

Protein und Fett werden in ganzen Gramm angezeigt; Kohlenhydrate werden aus den verbleibenden Kalorien berechnet und ebenfalls in ganzen Gramm dargestellt. Kleine kcal-Abweichungen durch diese Rundung sind für V1 akzeptiert.

Wenn ein sehr niedriges Kalorienziel zu einer offensichtlich unplausiblen Makroverteilung führt, soll primär das Kalorienziel bzw. die Sicherheitslogik geprüft werden, statt die Makroregeln still zu verändern.

Nicht Teil der V1-Makro-Engine sind separate Zielwerte für Ballaststoffe, gesättigte Fettsäuren oder Omega-3 sowie eine eigene Muskelaufbau-/Muskelerhalt-Logik.

## Nicht zwingend im initialen MVP

- LLM-basierte Mahlzeitenerkennung
- Sprachverarbeitung
- KI-basierte Alternativvorschläge
- Bildgenerierung des zukünftigen Körpers
- dynamische KFA-/FFM-basierte Proteinoptimierung

Diese Funktionen gehören zur späteren Produktentwicklung.
