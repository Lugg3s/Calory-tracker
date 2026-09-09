# Kalorienberechnung

## Produktanforderung

Die Berechnung des Kalorienbedarfs soll für den Nutzer nachvollziehbar sein. Die App soll nicht einfach einen einzelnen Wert präsentieren, sondern zeigen, **welche Eingabe welchen Einfluss auf das Ergebnis hat**.

Die Berechnung ist ausdrücklich eine Schätzung. Die App soll keine Genauigkeit suggerieren, die das Modell oder die verfügbaren Nutzerdaten nicht hergeben.

## Geplanter Rechenweg

Grundsätzlich soll der Rechenweg aus mehreren transparenten Komponenten bestehen:

1. Ruheenergiebedarf
2. Alltagsaktivität
3. Schritte
4. geplantes Training / Sport
5. thermischer Effekt der Nahrung
6. Summe = geschätzter Erhaltungsbedarf
7. Zielgewicht bestimmen: direkt aus Nutzereingabe oder, bei vorhandenem aktuellem KFA, modellhaft aus einem gewählten Ziel-KFA ableiten
8. Bestimmung des für das Zielgewicht erforderlichen Gesamtdefizits
9. Verteilung des Defizits auf den gewünschten Zeitraum
10. daraus resultierendes durchschnittliches tägliches Kalorienziel
11. optional Ableitung eines Wochenbudgets und Verteilung dieses Budgets auf unterschiedlich hohe Tagesziele, z. B. für einen geplanten Cheat Day

## Ruheenergiebedarf

Festgelegte Modellrichtung:

- **ohne aktuellen KFA:** Mifflin-St.-Jeor
- **mit aktuellem KFA:** Cunningham 1980 auf Basis der fettfreien Masse

Mifflin-St.-Jeor:

```text
Männer:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter + 5

Frauen:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter - 161
```

Cunningham 1980:

```text
fettfreie Masse = Gewicht × (1 - KFA)
RMR = 500 + 22 × fettfreie Masse(kg)
```

Ein anhand der Referenzbilder geschätzter KFA darf für Cunningham verwendet werden. Die dadurch höhere Modellunsicherheit soll für Entwickler und spätere Validierung intern dokumentiert werden. Eine zusätzliche, gesonderte Warnung im User Interface ist allein deshalb nicht erforderlich. Allgemein bleibt die gesamte Erhaltungsbedarfsberechnung als Schätzung zu kennzeichnen.

## KFA-Eingabe und Bildstufen

Die Referenzbilder können beispielsweise in 5-Prozentpunkt-Schritten vorliegen, z. B. 10 %, 15 %, 20 %, 25 %.

Der Nutzer ist **nicht auf diese Bildstufen beschränkt**. Er kann einen numerischen KFA-Wert zwischen den Referenzstufen eingeben, z. B. 17 % oder 22 %. Für sämtliche Berechnungen wird der tatsächlich eingegebene numerische Wert verwendet, nicht die nächstgelegene Bildstufe.

Dasselbe Prinzip gilt für den Ziel-KFA: Bilder dienen als Orientierung, der numerische Zielwert kann feiner eingestellt werden.

## Erhaltungsbedarf: Komponentenmodell

Für das MVP soll der Erhaltungsbedarf komponentenbasiert und transparent aufgebaut werden:

```text
Ruheenergiebedarf
+ Alltagsaktivität (MET-basiert)
+ Schritt-Komponente
+ Training (MET-basiert)
= Energieverbrauch vor TEF

+ thermischer Effekt der Nahrung
= geschätzter Erhaltungsbedarf
```

Ein klassischer pauschaler PAL-Faktor soll nicht gleichzeitig mit separat berechneten Schritten und Training verwendet werden, weil dadurch Aktivität leicht doppelt gezählt werden kann.

## Schritte

Schritte werden separat als Gehaktivität modelliert.

Aktuelle V1-Richtung:

```text
geschätzte Schrittlänge = Körpergröße × 0,414
Distanz(km) = Schritte × Schrittlänge(m) / 1.000
Netto-Schritt-kcal = Distanz(km) × Körpergewicht(kg) × 0,57 kcal/kg/km
```

Einordnung der Parameter:

- `0,57 kcal/kg/km` ist als Netto-Energiekosten des normalen Gehens wissenschaftlich gut begründbar und bleibt der aktuelle V1-Arbeitswert.
- `0,414 × Körpergröße` ist nur eine grobe Schätzung der Schrittlänge und soll als Fallback behandelt werden, nicht als präziser physiologischer Parameter.
- Sobald eine tatsächlich gemessene Distanz aus Smartphone oder Wearable verfügbar ist, ist diese der geschätzten Distanz vorzuziehen.

Die Schritt-Komponente ist als **Netto-Zusatzverbrauch über den Ruheenergiebedarf hinaus** zu verstehen.

## Alltagsaktivität: zeitbasiertes MET-Modell

Die zuvor diskutierten pauschalen RMR-Zuschläge für Alltagstypen werden **nicht** als primäres Modell verwendet.

Stattdessen wird die Alltagsaktivität über ein **zeitbasiertes MET-Modell** abgebildet. Relevante Tätigkeiten bzw. Aktivitätsprofile werden passenden MET-Werten zugeordnet und über ihre zeitliche Dauer gewichtet.

Grundstruktur:

```text
Brutto-Aktivitäts-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Aktivitäts-kcal
= Brutto-Aktivitäts-kcal
- Ruheenergie während derselben Zeit

Ruheenergie während derselben Zeit
= RMR / 1.440 × Minuten
```

Die MET-Werte sollen aus einem wissenschaftlich etablierten Aktivitätskompendium stammen, insbesondere dem aktuellen Adult Compendium of Physical Activities.

### Doppelzählungsregel

Da Gehen bereits über die Schritt-Komponente erfasst wird, darf der MET-Alltagsblock Gehaktivität nicht vollständig ein zweites Mal addieren.

Die Implementierung muss deshalb entweder:

- nur nicht-lokomotorische bzw. nicht bereits durch Schritte erfasste Aktivität über MET hinzufügen, z. B. Stehen, Heben, Tragen oder manuelle Arbeit; oder
- bei umfassenderen Aktivitätsprofilen den bereits über Schritte erfassten Anteil explizit herausrechnen.

Welche Zeitanteile im Onboarding direkt abgefragt, aus Alltagstypen abgeleitet oder später aus Health-/Wearable-Daten übernommen werden, ist noch festzulegen.

Die früher diskutierten RMR-Faktoren `0,10 / 0,15 / 0,25 / 0,35` sind damit **keine ausgewählten Produktparameter mehr**.

## Training / Sport

Training wird separat von Alltag und Schritten modelliert.

V1-Richtung:

```text
Brutto-Training-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Training-kcal
= Brutto-Training-kcal
- RMR / 1.440 × Minuten
```

Für den durchschnittlichen Tagesplan wird der Wochenumfang auf einen Tagesdurchschnitt umgelegt:

```text
Training-kcal pro Tag
= Summe Netto-Training-kcal pro Woche / 7
```

Dafür werden mindestens benötigt:

- Trainings-/Sportart
- Trainingshäufigkeit
- typische Dauer pro Einheit

Eine separate Intensitätsfrage soll im initialen Onboarding nicht zwingend erforderlich sein. Für V1 können sinnvolle Standard-MET-Werte pro Trainingsart verwendet werden; genauere Intensitätsangaben können später unter „Plan verfeinern“ ergänzt werden.

Sportartspezifische Modelle oder Wearable-Daten können den generischen MET-Ansatz später ersetzen, wenn sie belastbarer sind, z. B. Distanz und Pace beim Laufen oder Leistung/Watt beim Radfahren.

## Thermischer Effekt der Nahrung

Für das MVP wird der thermische Effekt der Nahrung (TEF / diet-induced thermogenesis) mit einer **10-%-Näherung für gemischte Ernährung** berücksichtigt.

Dabei gilt für die Erhaltungsrechnung:

```text
Basis = RMR + Netto-Alltag + Netto-Schritte + Netto-Training

Erhaltungsbedarf = Basis / 0,90
```

Die Division durch `0,90` folgt daraus, dass bei Erhaltung ungefähr 10 % der aufgenommenen Energie wieder für Verarbeitung, Aufnahme, Transport und Speicherung der Nahrung aufgewendet werden.

Die 10 % sind eine Modellnäherung und keine individuelle Messung. Später kann TEF makronährstoffabhängig berechnet werden, da Protein typischerweise einen höheren TEF als Kohlenhydrate und Fett verursacht.

Wichtig für die spätere Defizitberechnung: Wenn die Energieaufnahme sinkt, sinkt auch der TEF. Das Defizitmodell darf daher nicht so tun, als bliebe der Erhaltungs-TEF bei reduzierter Kalorienzufuhr unverändert.

## Kostenrechnungs-ähnliche Darstellung

Die UI soll die Berechnung möglichst ähnlich einer einfachen Kostenrechnung darstellen:

```text
Ruheenergiebedarf                  1.650 kcal
+ Alltagsaktivität                    300 kcal
+ Schritte                            250 kcal
+ Training (Tagesdurchschnitt)        150 kcal
--------------------------------------------
= Basis vor TEF                     2.350 kcal
+ thermischer Effekt der Nahrung      XXX kcal
--------------------------------------------
= geschätzter Erhaltungsbedarf      XXXX kcal

- geplantes Defizit                   XXX kcal
--------------------------------------------
= vorgeschlagenes Tagesziel         XXXX kcal
```

Die Zahlen sind ausschließlich illustrative Beispiele.

Der Nutzer soll erkennen können, welchen ungefähren Beitrag einzelne Eingaben zum Ergebnis leisten. Die interne Modellunsicherheit einzelner Komponenten muss jedoch nicht für jede Quelle separat im UI ausgewiesen werden.

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

## Wissenschaftliche Arbeitsgrundlagen

Für die aktuell gewählten Parameter und Modelle sind insbesondere relevant:

- Mifflin et al. (1990), Entwicklung der Mifflin-St.-Jeor-Gleichung — PubMed PMID 2305711
- Cunningham (1980), RMR in Beziehung zu fettfreier Masse — PubMed PMID 7435418
- 2024 Adult Compendium of Physical Activities — PubMed PMID 38242596
- Meta-Analyse zu Netto-Energiekosten des Gehens — PubMed PMID 31292471
- Review zur nahrungsinduzierten Thermogenese — PubMed PMID 15507147
- Untersuchung zur Einschränkung des Standardwerts `1 MET = 3,5 ml O₂/kg/min` — PubMed PMID 15831804

Diese Quellen begründen die Modellrichtung, ersetzen aber keine spätere End-to-End-Validierung des gesamten TDEE-Modells gegen reale Nutzerdaten.

## Wichtiger Grundsatz

Alle Ergebnisse sind **Schätzwerte**. Die App soll diese Unsicherheit grundsätzlich transparent kommunizieren und später idealerweise aus dem tatsächlichen Gewichtsverlauf lernen bzw. die Schätzung regelmäßig anpassen.
