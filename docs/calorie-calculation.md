# Kalorienberechnung

## Produktanforderung

Die Berechnung des Kalorienbedarfs soll für den Nutzer nachvollziehbar sein. Die App soll nicht einfach einen einzelnen Wert präsentieren, sondern zeigen, **welche Eingabe welchen Einfluss auf das Ergebnis hat**.

Alle Werte sind Schätzungen. Das Modell soll keine Genauigkeit suggerieren, die die zugrunde liegenden Formeln und Nutzerdaten nicht hergeben.

## V1-Rechenweg

1. Ruheenergiebedarf bestimmen
2. Alltagsaktivität ergänzen
3. Schritte ergänzen
4. Training ergänzen
5. TEF berücksichtigen
6. geschätzten Erhaltungsbedarf bestimmen
7. Zielgewicht direkt oder über Ziel-KFA bestimmen
8. erforderlichen Gewichtsverlust bestimmen
9. statisches Gesamtdefizit mit 7.700 kcal/kg berechnen
10. Gesamtdefizit auf den gewünschten Zeitraum verteilen
11. tägliches Kalorienziel unter Berücksichtigung des niedrigeren TEF bestimmen
12. Sicherheitsgrenzen prüfen
13. Wochenbudget ableiten
14. Ausgangsplan ohne Cheat Day anzeigen
15. optional einen Cheat Day innerhalb desselben Wochenbudgets konfigurieren
16. konkrete Tagesbudgets ausgeben

## Ruheenergiebedarf

### Ohne aktuellen KFA: Mifflin-St.-Jeor

```text
Männer:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter + 5

Frauen:
RMR = 10 × Gewicht(kg) + 6,25 × Größe(cm) - 5 × Alter - 161
```

### Mit aktuellem KFA: Cunningham 1980

```text
fettfreie Masse = Gewicht × (1 - KFA)
RMR = 500 + 22 × fettfreie Masse(kg)
```

Ein anhand der Referenzbilder geschätzter KFA darf für Cunningham verwendet werden. Die dadurch höhere Modellunsicherheit wird intern für Entwickler und spätere Validierung dokumentiert. Eine separate User-Warnung nur wegen der visuellen KFA-Schätzung ist nicht erforderlich.

## KFA-Eingabe und Referenzbilder

Die Referenzbilder können beispielsweise in 5-Prozentpunkt-Schritten vorliegen. Der Nutzer ist **nicht auf diese Bildstufen beschränkt**.

```text
Bilder: 10 %, 15 %, 20 %, 25 %
Nutzereingabe: 17 %
Berechnung verwendet: 17 %
```

Dasselbe Prinzip gilt für den Ziel-KFA.

## Erhaltungsbedarf

### Komponentenmodell

```text
RMR
+ Netto-Alltagsaktivität
+ Netto-Schritte
+ Netto-Training
= Basis B vor TEF

Erhaltungsbedarf M = B / 0,90
```

Der klassische PAL-Faktor wird nicht zusätzlich verwendet, weil Alltag, Schritte und Training bereits separat berücksichtigt werden.

## Schritte

V1-Fallback:

```text
geschätzte Schrittlänge = Körpergröße × 0,414
Distanz(km) = Schritte × Schrittlänge(m) / 1.000
Netto-Schritt-kcal = Distanz(km) × Körpergewicht(kg) × 0,57 kcal/kg/km
```

Einordnung:

- `0,57 kcal/kg/km` ist der aktuelle wissenschaftlich gut begründbare Netto-Arbeitswert für normales Gehen.
- `0,414 × Körpergröße` ist nur eine grobe Fallback-Schätzung der Schrittlänge.
- Gemessene Distanzdaten aus Smartphone/Health/Wearables sollen später bevorzugt werden.

## Alltagsaktivität

Die Alltagsaktivität wird zeitbasiert mit MET-Werten modelliert.

```text
Brutto-Aktivitäts-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Aktivitäts-kcal
= Brutto-Aktivitäts-kcal
- RMR / 1.440 × Minuten
```

Die MET-Werte sollen aus einem wissenschaftlich etablierten Aktivitätskompendium stammen, insbesondere dem aktuellen Adult Compendium of Physical Activities.

Die derzeitigen fünf vorläufigen 8-Stunden-Referenzprofile und bekannte Modellgrenzen sind in [`activity-model-v1.md`](activity-model-v1.md) dokumentiert.

### Doppelzählungsregel

Da Gehen bereits über die Schritt-Komponente berechnet wird, darf Gehaktivität nicht vollständig ein zweites Mal im Alltags-MET-Modell auftauchen.

Die Implementierung muss deshalb entweder nur nicht-lokomotorische Zusatzaktivität erfassen oder einen bereits über Schritte erfassten Gehanteil aus umfassenderen MET-Profilen herausrechnen.

## Training / Sport

Training wird separat modelliert:

```text
Brutto-Training-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Training-kcal
= Brutto-Training-kcal
- RMR / 1.440 × Minuten
```

Der Wochenumfang wird für den Plan auf einen Tagesdurchschnitt umgelegt:

```text
Training-kcal pro Tag
= Summe Netto-Training-kcal pro Woche / 7
```

Benötigte Eingaben:

- Trainings-/Sportart
- Trainingshäufigkeit
- typische Dauer pro Einheit

Eine separate Intensitätsfrage ist für V1 nicht zwingend. Genauere sportartspezifische Modelle können später den generischen MET-Ansatz ersetzen.

## Thermischer Effekt der Nahrung (TEF)

Für V1 wird TEF mit ungefähr **10 % der Energieaufnahme** modelliert.

Bei Erhaltung:

```text
B = RMR + Netto-Alltag + Netto-Schritte + Netto-Training
M = B / 0,90
```

Dabei ist `M` der geschätzte Erhaltungsbedarf.

## Zielgewicht

Das Zielgewicht wird entweder direkt eingegeben oder bei vorhandenem aktuellem KFA aus dem Ziel-KFA abgeleitet.

```text
fettfreie Masse = aktuelles Gewicht × (1 - aktueller KFA)
Zielgewicht = fettfreie Masse ÷ (1 - Ziel-KFA)
notwendige Gewichtsabnahme = aktuelles Gewicht - Zielgewicht
```

Diese Ziel-KFA-Berechnung nimmt konstante fettfreie Masse an und ist eine Modellschätzung.

## V1-Defizitmodell

V1 verwendet bewusst ein statisches Planungsmodell mit **7.700 kcal pro kg beabsichtigtem Gewichtsverlust**.

```text
Gewichtsverlust ΔW = aktuelles Gewicht - Zielgewicht
Gesamtdefizit E = ΔW × 7.700 kcal
Tagesdefizit D = E / Anzahl Plan-Tage
```

Das Modell simuliert nicht täglich ein neues Gewicht, einen neuen RMR, metabolische Anpassungen oder eine veränderte Körperzusammensetzung.

Wenn der Nutzer später ein neues aktuelles Gewicht einträgt, kann der Plan von diesem neuen Ausgangspunkt vollständig neu berechnet werden.

## Tägliches Kalorienziel mit TEF

Da TEF ungefähr 10 % der tatsächlichen Energieaufnahme ausmacht, ist der TEF bei einem Kaloriendefizit niedriger als bei Erhaltung.

Mit:

```text
B = Verbrauch vor TEF
C = tägliche Kalorienaufnahme
D = gewünschtes durchschnittliches Tagesdefizit
```

gilt:

```text
D = B + 0,10 × C - C
D = B - 0,90 × C
C = (B - D) / 0,90
```

Da `M = B / 0,90`, gilt äquivalent:

```text
C = M - D / 0,90
```

Beispiel:

```text
Erhaltungsbedarf M = 2.470 kcal
Basis vor TEF B = 2.223 kcal
gewünschtes Tagesdefizit D = 385 kcal

C = (2.223 - 385) / 0,90
C ≈ 2.042 kcal/Tag
```

## Sicherheits- und Plausibilitätsgrenzen für automatisch erzeugte Pläne

Für normale automatisch erzeugte Erwachsenen-Pläne wird die obere Defizitgrenze **vom geschätzten Erhaltungsbedarf abhängig gemacht** und nicht als fixer kcal-Wert definiert.

V1 setzt als automatische Obergrenze eine maximale Reduktion der Kalorienaufnahme von **25 % des Erhaltungsbedarfs**:

```text
maximale Kalorienreduktion R_max = 0,25 × Erhaltungsbedarf M
minimales Tagesziel aus dieser Grenze C_min = 0,75 × M
```

Da der 10-%-TEF separat berücksichtigt wird:

```text
D_max = 0,90 × R_max
D_max = 0,225 × M
```

Beispiele:

```text
M = 2.000 kcal → max. Kalorienreduktion 500 kcal → C >= 1.500 kcal
M = 2.500 kcal → max. Kalorienreduktion 625 kcal → C >= 1.875 kcal
M = 3.000 kcal → max. Kalorienreduktion 750 kcal → C >= 2.250 kcal
M = 3.500 kcal → max. Kalorienreduktion 875 kcal → C >= 2.625 kcal
```

Zusätzlich soll die automatisch empfohlene Energieaufnahme ungefähr nicht unter **1.200 kcal/Tag** für die weibliche Mifflin-Kategorie und **1.500 kcal/Tag** für die männliche Mifflin-Kategorie fallen. Diese Werte sind pragmatische Planungsgrenzen und keine individuellen physiologischen Mindestwerte.

Wenn Ziel und Zeitraum entweder die maintenance-relative 25-%-Grenze oder die absolute Kalorien-Untergrenze verletzen, soll die App primär einen längeren Zeitraum bzw. eine Anpassung des Ziels vorschlagen.

## Wochenbudget

Das Wochenbudget wird aus dem durchschnittlichen täglichen Kalorienziel abgeleitet:

```text
Wochenbudget W = C × 7
```

Ohne Cheat Day gilt:

```text
Montag bis Sonntag ≈ C kcal/Tag
```

Die interne Berechnung kann Dezimalwerte enthalten; die UI zeigt ganze kcal-Werte. Rundungsreste werden so auf einzelne Tage verteilt, dass das Wochenbudget insgesamt erhalten bleibt.

## Cheat Day V1

V1 erlaubt **maximal einen Cheat Day pro Woche**.

Ein Cheat Day erhöht das Wochenbudget **nicht**. Er verteilt dieselben Wochenkalorien anders.

Mit:

- `W` = Wochenbudget
- `H` = Kalorienbudget des Cheat Days
- `L` = Kalorienbudget der sechs regulären Tage

```text
L = (W - H) / 6
```

### Position im Nutzer-Flow

Der Nutzer sieht zuerst den normalen Ausgangsplan ohne Cheat Day:

- durchschnittliches Tagesziel `C`;
- Wochenbudget `W`;
- normales Tagesbudget.

Erst danach entscheidet er, ob er einen Cheat Day nutzen möchte. Dadurch ist die Umverteilung nachvollziehbar.

### Cheat-Day-Obergrenze

Die frühere Richtung „Cheat Day maximal bis zum Erhaltungsbedarf“ ist **ersetzt**.

Nominale Obergrenze:

```text
Basis = W / 7 = C
H_max_nominal = C + 1.000 kcal
```

Die Auswahl erfolgt in **50-kcal-Schritten**. Da es sich um eine Obergrenze handelt, wird der technische Maximalwert auf das 50-kcal-Raster nach unten gerundet.

Zusätzlich müssen die sechs regulären Tage weiterhin die automatischen Planungsgrenzen einhalten. Sei `F` das niedrigste zulässige reguläre Tagesbudget, dann gilt:

```text
H <= W - 6 × F
```

Damit ist die tatsächlich auswählbare Obergrenze konzeptionell:

```text
H_max = min(
  floor_to_50(C + 1.000),
  floor_to_50(W - 6 × F)
)
```

Wenn dadurch kein sinnvoll höherer Cheat-Day-Wert möglich ist, soll die App dies transparent anzeigen bzw. einen längeren Zielzeitraum vorschlagen.

### Cheat-Day-UI

Wenn der Nutzer einen Cheat Day aktiviert:

1. Montag bis Sonntag werden angezeigt.
2. Genau ein Wochentag kann ausgewählt werden.
3. Danach wählt der Nutzer das **gesamte Cheat-Day-Kalorienbudget** über einen Zahlenregler / Wheel / Slider.
4. Der Regler arbeitet in **50-kcal-Schritten**.
5. Während der Nutzer den Wert verändert, werden die sechs anderen Tagesbudgets **live** aktualisiert.
6. Das unveränderte Wochenbudget bleibt sichtbar bzw. nachvollziehbar.

Die konkrete UI-Komponente kann in der Wireframe-Phase optimiert werden.

### Info-Hilfe mit Lebensmittelbeispielen

Der Cheat-Day-Screen soll einen optionalen Info-Button analog zu anderen erklärungsbedürftigen Screens erhalten.

Dort können typische Cheat-Day-Lebensmittel mit groben Kaloriengrößenordnungen gezeigt werden, z. B.:

- Pizza
- Bier
- Kuchen
- Burger
- Pommes

Die Werte sollen als grobe Richtwerte/Bereiche und nicht als scheinbar exakte Nährwerte dargestellt werden. Konkrete Portionsdefinitionen und kcal-Bereiche sind noch als Content-Aufgabe festzulegen.

Weitere Details stehen in [`cheat-day-v1.md`](cheat-day-v1.md).

## Makros und Rundung am Cheat Day

Im erweiterten Makro-Modus gelten für jedes konkrete Tagesbudget die allgemeinen V1-Regeln:

- Protein bleibt bei unverändertem Gewicht und Sport-Tier in Gramm gleich;
- Fett = 30 % der jeweiligen Tageskalorien;
- Kohlenhydrate = verbleibende Kalorien.

Protein und Fett werden als ganze Gramm dargestellt; Kohlenhydrate werden aus den verbleibenden Kalorien berechnet und ebenfalls auf ganze Gramm dargestellt.

**Kleine Rundungsabweichungen der sichtbaren Makro-kcal vom exakten Tagesbudget sind für V1 akzeptiert und kein Fehlerzustand.**

## Manuelle Plausibilitätschecks

Mehrere manuelle End-to-End-Rechenbeispiele wurden für normale Aktivitäts-/Sportprofile, beide Protein-Tiers, die 25-%-Defizitgrenze, absolute Kalorien-Untergrenzen und die Wochenumverteilung geprüft.

Die Kernlogik verhielt sich dabei grundsätzlich wie vorgesehen. Als relevanter Sonderfall zeigte sich, dass ein Cheat Day ohne eigene Obergrenze mathematisch sehr hoch werden könnte, solange die sechs anderen Tage noch innerhalb der Sicherheitsgrenzen bleiben. Daraus wurde die zusätzliche Obergrenze `C + 1.000 kcal` abgeleitet.

Diese Rechenchecks sind **keine wissenschaftliche End-to-End-Validierung** des gesamten TDEE-Modells.

## Transparente Darstellung

Die UI soll die Berechnung kostenrechnungsartig zeigen können:

```text
Ruheenergiebedarf                     XXXX kcal
+ Alltagsaktivität                     XXX kcal
+ Schritte                             XXX kcal
+ Training                             XXX kcal
-----------------------------------------------
= Basis vor TEF                       XXXX kcal
+ TEF                                  XXX kcal
-----------------------------------------------
= geschätzter Erhaltungsbedarf        XXXX kcal

- geplantes Defizit                    XXX kcal
+ TEF-Anpassung im Defizitmodell       XXX kcal
-----------------------------------------------
= durchschnittliches Tagesziel        XXXX kcal

× 7
= Wochenbudget                        XXXXX kcal

→ optional: Umverteilung auf 1 Cheat Day + 6 reguläre Tage
```

## Manuelle Anpassung

Das automatisch berechnete Kalorienziel kann vom Nutzer in Einstellungen bzw. einem erweiterten Bereich manuell überschrieben werden. Diese Funktion bleibt getrennt von der automatischen Wochenbudget- und Cheat-Day-Logik.

Wie aggressive manuelle Unterschreitungen der automatischen Planungsgrenzen behandelt werden, bleibt als UX-/Safety-Frage offen.

## Wissenschaftliche Arbeitsgrundlagen

Für die aktuell gewählten Parameter und Modelle sind insbesondere relevant:

- Mifflin et al. (1990), Mifflin-St.-Jeor — PubMed PMID 2305711
- Cunningham (1980), RMR und fettfreie Masse — PubMed PMID 7435418
- 2024 Adult Compendium of Physical Activities — PubMed PMID 38242596
- Meta-Analyse zu Netto-Energiekosten des Gehens — PubMed PMID 31292471
- Review zur nahrungsinduzierten Thermogenese — PubMed PMID 15507147
- Einschränkungen des Standardwerts `1 MET = 3,5 ml O₂/kg/min` — PubMed PMID 15831804

Für die maintenance-relative Defizitgrenze ist relevant, dass etablierte europäische Adipositas-Leitlinien eine Reduktion der Energieaufnahme um ungefähr **15–30 %** gegenüber der stabilen Ausgangsaufnahme als ausreichend und angemessen beschreiben. Die gewählten 25 % liegen innerhalb dieses Bereichs. Andere Leitlinien verwenden alternativ feste Defizite wie 500–750 kcal/Tag oder relative Reduktionen bis etwa 30 %.

Die verwendeten Grenzwerte bleiben Produkt-Sicherheitsparameter und ersetzen keine individuelle medizinische Beurteilung.

## Wichtiger Grundsatz

Das V1-Modell ist bewusst transparent und deterministisch, aber nicht vollständig physiologisch dynamisch. Langfristig kann es durch tatsächliche Gewichtsverläufe und ein adaptiveres Modell kalibriert werden.
