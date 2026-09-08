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
6. Zielgewicht bestimmen: direkt aus Nutzereingabe oder, bei vorhandenem aktuellem KFA, modellhaft aus einem gewählten Ziel-KFA ableiten
7. Bestimmung des für das Zielgewicht erforderlichen Gesamtdefizits
8. Verteilung des Defizits auf den gewünschten Zeitraum
9. daraus resultierendes durchschnittliches tägliches Kalorienziel
10. optional Ableitung eines Wochenbudgets und Verteilung dieses Budgets auf unterschiedlich hohe Tagesziele, z. B. für einen geplanten Cheat Day

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

## Wochenbudget und geplanter Cheat Day

Zusätzlich zum durchschnittlichen Tagesziel soll die App einen geplanten Cheat Day bzw. einen Tag mit höherem Kalorienbudget über ein **Wochenbudget** abbilden können.

Grundidee:

- Ausgangspunkt bleibt das durchschnittliche Kalorienziel, das sich aus Erhaltungsbedarf und geplantem Defizit ergibt.
- Daraus kann ein Wochenbudget abgeleitet werden.
- Wenn an einem ausgewählten Tag ein höheres Budget vorgesehen ist, müssen die übrigen Tage entsprechend angepasst werden, damit das geplante Wochenbudget und damit das durchschnittliche Defizit nicht unbeabsichtigt verändert werden.

Die konkrete Verteilungslogik ist noch offen. Insbesondere müssen festgelegt werden:

- wie hoch der Cheat-Day-Aufschlag maximal sein darf;
- wie die übrigen Tagesziele reduziert werden;
- welche Mindest- bzw. Sicherheitsgrenzen für einzelne Tage gelten;
- ob das Wochenbudget immer exakt eingehalten werden soll oder eine gewisse Flexibilität erlaubt wird;
- wie die Verteilung transparent und verständlich dargestellt wird.

Der Begriff „Cheat Day“ ist vorläufig. Für die finale UX kann eine neutralere Bezeichnung wie „flexibler Tag“ oder „höheres Tagesbudget“ sinnvoller sein.

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

## KFA als Projektion von Gewicht zu KFA

Wenn ein aktueller KFA bekannt ist und der Nutzer ein Zielgewicht vorgibt, kann die App zusätzlich eine informative KFA-Projektion anbieten. Beispiel:

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

## Ziel-KFA zur Ableitung des Zielgewichts

Wenn ein aktueller KFA angegeben wurde, kann der Nutzer einen **Ziel-KFA** auswählen, auch anhand visueller Referenzbilder.

Der Ziel-KFA ersetzt nicht das Zielgewicht in der eigentlichen Gewichtsverlustberechnung. Stattdessen leitet die App daraus zunächst ein ungefähres Zielgewicht und die erforderliche Gewichtsabnahme ab. Dieses abgeleitete Zielgewicht wird anschließend wie ein direkt eingegebenes Zielgewicht für die weitere Defizitberechnung verwendet.

Aktueller Modellansatz:

```text
fettfreie Masse = aktuelles Gewicht × (1 - aktueller KFA)

Zielgewicht = fettfreie Masse ÷ (1 - Ziel-KFA)

notwendige Gewichtsabnahme = aktuelles Gewicht - Zielgewicht
```

Beispiel:

```text
Aktuelles Gewicht:      80 kg
Aktueller KFA:          20 %
Ziel-KFA:               15 %

Fettfreie Masse:
80 kg × 0,80 = 64 kg

Modell-Zielgewicht:
64 kg ÷ 0,85 ≈ 75,3 kg

Geschätzte notwendige Gewichtsabnahme:
80 kg - 75,3 kg ≈ 4,7 kg
```

Diese Berechnung setzt konstante fettfreie Masse voraus. In der Realität kann sich fettfreie Masse während einer Gewichtsabnahme verändern. Deshalb müssen sowohl das abgeleitete Zielgewicht als auch die notwendige Gewichtsabnahme als **Schätzwerte** dargestellt werden.

Wenn kein aktueller KFA angegeben wurde, ist die Ziel-KFA-basierte Ableitung nicht verfügbar.

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
