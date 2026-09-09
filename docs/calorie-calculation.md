# Kalorienberechnung

## Produktanforderung

Die Berechnung des Kalorienbedarfs soll für den Nutzer nachvollziehbar sein. Die App soll nicht einfach einen einzelnen Wert präsentieren, sondern zeigen, **welche Eingabe welchen Einfluss auf das Ergebnis hat**.

Die Berechnung ist ausdrücklich eine Schätzung. Die App soll keine Genauigkeit suggerieren, die das Modell oder die verfügbaren Nutzerdaten nicht hergeben.

## Geplanter Rechenweg

Grundsätzlich soll der Rechenweg aus mehreren transparenten Komponenten bestehen:

1. Ruheenergiebedarf / Grundumsatz
2. Alltagsaktivität
3. Schritte
4. geplantes Training / Sport
5. thermischer Effekt der Nahrung, sofern im finalen Modell berücksichtigt
6. Summe = geschätzter Erhaltungsbedarf
7. Zielgewicht bestimmen: direkt aus Nutzereingabe oder, bei vorhandenem aktuellem KFA, modellhaft aus einem gewählten Ziel-KFA ableiten
8. Bestimmung des für das Zielgewicht erforderlichen Gesamtdefizits
9. Verteilung des Defizits auf den gewünschten Zeitraum
10. daraus resultierendes durchschnittliches tägliches Kalorienziel
11. optional Ableitung eines Wochenbudgets und Verteilung dieses Budgets auf unterschiedlich hohe Tagesziele, z. B. für einen geplanten Cheat Day

## Ruheenergiebedarf

Aktuell festgelegte Modellrichtung:

- **ohne aktuellen KFA:** Mifflin-St.-Jeor
- **mit aktuellem KFA:** Cunningham auf Basis der fettfreien Masse

Mifflin-St.-Jeor:

```text
Männer:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter + 5

Frauen:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter - 161
```

Cunningham:

```text
fettfreie Masse = Gewicht × (1 - KFA)
RMR = 500 + 22 × fettfreie Masse(kg)
```

Die Wahl Cunningham bei vorhandenem KFA bedeutet, dass die Genauigkeit des eingegebenen bzw. geschätzten KFA direkt die RMR-Schätzung beeinflusst. Diese Unsicherheit muss transparent kommuniziert werden. Die wissenschaftliche Validierung dieser Produktentscheidung vor Hard-Coding bleibt erforderlich.

## KFA-Eingabe und Bildstufen

Die Referenzbilder können beispielsweise in 5-Prozentpunkt-Schritten vorliegen, z. B. 10 %, 15 %, 20 %, 25 %.

Der Nutzer ist **nicht auf diese Bildstufen beschränkt**. Er kann einen numerischen KFA-Wert zwischen den Referenzstufen eingeben, z. B. 17 % oder 22 %. Für sämtliche Berechnungen wird der tatsächlich eingegebene numerische Wert verwendet, nicht die nächstgelegene Bildstufe.

Dasselbe Prinzip kann für den Ziel-KFA gelten: Bilder dienen als Orientierung, der numerische Zielwert kann feiner eingestellt werden.

## Vorläufiges Aktivitätsmodell

Für das MVP soll der Erhaltungsbedarf komponentenbasiert und transparent aufgebaut werden:

```text
Ruheenergiebedarf
+ Alltagskomponente
+ Schritt-Komponente
+ Training
+ ggf. thermischer Effekt der Nahrung
= geschätzter Erhaltungsbedarf
```

Ein klassischer pauschaler PAL-Faktor soll nicht gleichzeitig mit separat berechneten Schritten und Training verwendet werden, weil dadurch Aktivität leicht doppelt gezählt werden kann.

### Schritte als Hauptsignal für Gehaktivität

Die aktuelle Richtung ist, aus Körpergröße und durchschnittlichen Schritten zunächst eine geschätzte Gehstrecke abzuleiten.

Vorläufige Produktparameter:

```text
geschätzte Schrittlänge = Körpergröße × 0,414
Distanz(km) = Schritte × Schrittlänge(m) / 1.000
Netto-Schritt-kcal = Distanz(km) × Körpergewicht(kg) × 0,57 kcal/kg/km
```

Die Faktoren `0,414` und `0,57 kcal/kg/km` sind vorläufige Modellparameter und müssen vor finaler Implementierung wissenschaftlich validiert bzw. kalibriert werden.

Die Schritt-Komponente soll als **Netto-Zusatzverbrauch über den Ruheenergiebedarf hinaus** verstanden werden, damit der Ruheverbrauch nicht doppelt gezählt wird.

### Alltags-/Berufskomponente

Da Gehaktivität bereits über die Schritte abgebildet wird, soll der Alltagstyp primär Aktivität erfassen, die durch Schrittzahl allein schlecht beschrieben wird, z. B. langes Stehen, Heben, Tragen und manuelle Arbeit.

Aktuelle MVP-Richtung ist ein einfacher Zuschlag als Anteil des individuellen RMR:

| Alltagstyp | Beispiele | vorläufiger RMR-Zuschlag |
| --- | --- | ---: |
| überwiegend sitzend | Büro, Studium | 0,10 |
| überwiegend stehend | Verkauf, Friseur | 0,15 |
| leicht körperlich | Pflege, Lager, leichtes Handwerk | 0,25 |
| stark körperlich | Bau, schwere manuelle Arbeit | 0,35 |

```text
Alltags-kcal = RMR × Alltagsfaktor
```

Diese Faktoren sind **vorläufige Produktparameter**, keine final validierten wissenschaftlichen Konstanten. Sie müssen gegen geeignete Aktivitäts-/PAL-/MET-Daten kalibriert werden.

### Alternative: zeitbasiertes MET-Modell

Ein **zeitbasiertes MET-Modell wird ausdrücklich als Alternative hinterlegt** und soll nicht verworfen werden.

Bei diesem Ansatz wird der Alltag anhand geschätzter bzw. später genauer verfügbarer Zeitanteile modelliert, z. B. Stunden sitzend, stehend, gehend oder körperlich arbeitend. Die Aktivitätsabschnitte werden mit passenden MET-Werten bewertet.

Vorteile:

- feinere Abbildung verschiedener Tätigkeiten;
- kann mit späteren Health-/Wearable-Daten oder detaillierteren Nutzereingaben deutlich genauer werden;
- eignet sich als spätere Alternative oder Ausbau des vereinfachten RMR-Faktormodells.

Nachteil für das aktuelle Onboarding:

- ohne zusätzliche Angaben zur Tätigkeitsdauer müssten viele Zeitanteile angenommen werden;
- dadurch würde eine scheinbare Präzision entstehen und das Onboarding könnte deutlich länger werden.

Daher bleibt für die erste Version der einfache RMR-basierte Alltagszuschlag die aktuelle Richtung, während das zeitbasierte MET-Modell als dokumentierte Alternative für spätere Validierung und Weiterentwicklung erhalten bleibt.

## Kostenrechnungs-ähnliche Darstellung

Die UI soll die Berechnung möglichst ähnlich einer einfachen Kostenrechnung darstellen:

```text
Ruheenergiebedarf                  1.650 kcal
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

## Training / Sport

Training soll separat von Alltag und Schritten modelliert werden. Die konkrete Berechnung wird als nächster Teil des Berechnungsmodells festgelegt. Wichtig ist auch hier, dass nur der zusätzliche Energieverbrauch über den bereits enthaltenen Ruhe-/Alltagsverbrauch hinaus addiert wird und Aktivitäten nicht doppelt über Schritte und Training erfasst werden.

## Thermischer Effekt der Nahrung

Ob und wie der thermische Effekt der Nahrung (TEF / diet-induced thermogenesis) explizit in die MVP-Berechnung aufgenommen wird, wird als nächster Teil des Berechnungsmodells festgelegt. Dabei muss berücksichtigt werden, dass TEF von Energieaufnahme und Makronährstoffzusammensetzung abhängt.

## KFA und Energiebedarf

Der KFA ist optional.

Wenn der Nutzer einen aktuellen KFA angibt, wird nach aktueller Modellrichtung Cunningham zur Schätzung des Ruheenergiebedarfs genutzt. Der Hintergrund ist, dass zwei Personen mit gleichem Gewicht und gleicher Körpergröße aufgrund unterschiedlicher Körperzusammensetzung unterschiedliche Mengen an fettfreier Masse haben können und dadurch unterschiedliche Energiebedarfe plausibel sind.

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
