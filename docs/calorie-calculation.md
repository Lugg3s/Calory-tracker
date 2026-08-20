# Kalorienberechnung

## Produktanforderung

Die Berechnung des Kalorienbedarfs soll für den Nutzer nachvollziehbar sein. Die App soll nicht einfach einen einzelnen Wert präsentieren, sondern zeigen, **welche Eingabe welchen Einfluss auf das Ergebnis hat**.

Die Berechnung ist ausdrücklich eine Schätzung. Die App soll keine Genauigkeit suggerieren, die das Modell oder die verfügbaren Nutzerdaten nicht hergeben.

## Geplanter Rechenweg

Grundsätzlich soll der Rechenweg aus mehreren transparenten Komponenten bestehen:

1. Grundumsatz
2. Alltagsaktivität
3. Schritte
4. geplantes Training / Sport
5. Summe = geschätzter Erhaltungsbedarf
6. Bestimmung des für das Ziel erforderlichen Gesamtdefizits
7. Verteilung des Defizits auf den gewünschten Zeitraum
8. daraus resultierendes durchschnittliches tägliches Kalorienziel

Die konkrete Formel für den Grundumsatz, die TDEE-Methode und die Aktivitätsparameter sind noch festzulegen und wissenschaftlich zu recherchieren.

## Kostenrechnungs-ähnliche Darstellung

Die UI soll die Berechnung möglichst ähnlich einer einfachen Kostenrechnung darstellen:

```text
Grundumsatz                         1.650 kcal
+ Alltagsaktivität                    300 kcal
+ Schritte                            250 kcal
+ Training (Tagesdurchschnitt)        150 kcal
--------------------------------------------
= geschätzter Erhaltungsbedarf      2.350 kcal

- tägliches Defizit                   400 kcal
--------------------------------------------
= vorgeschlagenes Tagesziel         1.950 kcal
```

Die Zahlen sind ausschließlich illustrative Beispiele.

Der Nutzer soll beispielsweise erkennen können, dass eine Änderung von 5.000 auf 6.000 durchschnittliche Schritte den geschätzten Energieverbrauch verändert. Ebenso soll die App zeigen können, welchen ungefähren zusätzlichen Energieverbrauch regelmäßiges Krafttraining oder Joggen beiträgt.

## Erklärung der Gewichtsabnahme

Die App soll die Grundidee sehr einfach erklären können:

> Körperfett enthält gespeicherte Energie. Für eine grobe Planung kann man mit einer angenommenen Energiemenge pro Kilogramm Fettmasse rechnen. Diese Zahl ist eine Modellannahme und keine exakte biologische Konstante.

Im Gespräch wurde als Faustregel **7.000–7.700 kcal pro kg Fettmasse** diskutiert. Der endgültige Produktwert muss vor der Implementierung anhand wissenschaftlicher Literatur festgelegt werden.

Beispiel für die spätere Erklärung:

```text
Du möchtest 5 kg abnehmen.

5 kg × angenommene Energiedifferenz pro kg
= benötigtes Gesamtdefizit

Gesamtdefizit ÷ Anzahl der Tage
= durchschnittliches tägliches Defizit

Erhaltungsbedarf - tägliches Defizit
= vorgeschlagenes Kalorienziel
```

Die App muss dabei erklären, dass diese Rechnung eine Vereinfachung ist: Gewichtsverlust besteht nicht ausschließlich aus Fettverlust, die Energiebilanz verändert sich während einer Gewichtsabnahme und die tatsächliche Gewichtsabnahme verläuft nicht zwingend linear.

## Aktivität als Stellschraube

Ein wichtiger Bestandteil der UX ist die verständliche Darstellung zusätzlicher Aktivität.

Mögliche Beispiele:

- zusätzliche 1.000 Schritte → ungefähr X kcal zusätzlicher Verbrauch
- 1 Stunde Krafttraining → ungefähr X kcal zusätzlicher Verbrauch
- 5 km Joggen → ungefähr X kcal zusätzlicher Verbrauch

Die konkreten X-Werte müssen abhängig von Körpergewicht, Aktivität und wissenschaftlicher Grundlage berechnet werden. Sie dürfen nicht als universell konstante Werte implementiert werden, wenn das wissenschaftlich nicht gerechtfertigt ist.

## KFA und Energiebedarf

Der KFA ist optional.

Wenn der Nutzer einen aktuellen KFA angibt, soll dieser in die Berechnung des Energiebedarfs einfließen können. Der Hintergrund ist, dass zwei Personen mit gleichem Gewicht und gleicher Körpergröße aufgrund unterschiedlicher Körperzusammensetzung unterschiedliche Mengen an fettfreier Masse haben können und dadurch unterschiedliche Energiebedarfe plausibel sind.

Die konkrete mathematische Methode ist noch offen.

## KFA als zusätzliche Projektion

Der KFA muss nicht zwingend Bestandteil der Zielgewichtsberechnung sein.

Wenn ein aktueller KFA bekannt ist, kann die App zusätzlich eine informative Projektion anbieten. Beispiel:

```text
Aktuelles Gewicht:      80 kg
Aktueller KFA:          20 %

Angenommene fettfreie Masse:
80 kg × (1 - 0,20) = 64 kg

Wenn die fettfreie Masse konstant bleibt:
Zielgewicht 75 kg
→ geschätzter KFA ≈ 14,7 %
```

Das ist ausdrücklich eine **Modellrechnung unter der Annahme konstanter fettfreier Masse**, keine Vorhersage des tatsächlichen zukünftigen KFA.

## Ziel-KFA

Ein Ziel-KFA ist optional.

Wenn ein Ziel-KFA angeboten wird, muss ein aktueller KFA vorhanden sein. Der Ziel-KFA soll zunächst als Zielvariable bzw. zusätzliche Information dienen und nicht automatisch die gesamte Gewichtsverlustberechnung dominieren.

## Manuelle Anpassung

Das automatisch berechnete Kalorienziel kann vom Nutzer manuell überschrieben werden. Diese Funktion soll verfügbar sein, aber **nicht prominent auf dem Main Screen** dargestellt werden, sondern beispielsweise in Einstellungen oder einem erweiterten Bereich.

Beispiel:

```text
App-Vorschlag: 2.000 kcal
Nutzer passt an: 1.900 kcal
→ persönliches Kalorienziel: 1.900 kcal
```

Die App sollte den Nutzer dabei nicht daran hindern, einen anderen Wert zu wählen, kann aber bei wissenschaftlich bzw. sicherheitsrelevanten Grenzwerten Hinweise oder Warnungen anzeigen. Die konkrete Logik hierfür ist noch offen.

## Wichtiger Grundsatz

Alle Ergebnisse sind **Schätzwerte**. Die App soll diese Unsicherheit transparent kommunizieren und später idealerweise aus dem tatsächlichen Gewichtsverlauf lernen bzw. die Schätzung regelmäßig anpassen.
