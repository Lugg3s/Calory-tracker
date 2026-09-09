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
14. optional einen flexiblen/höheren Kalorientag innerhalb des Wochenbudgets verteilen
15. konkrete Tagesbudgets ausgeben

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

Beispiel:

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
```

Daraus folgt:

```text
C = (B - D) / 0,90
```

Da `M = B / 0,90`, kann dieselbe Formel auch so geschrieben werden:

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

Das ist weiterhin eine vereinfachte Planung, aber mathematisch konsistent mit der 10-%-TEF-Annahme.

## Sicherheits- und Plausibilitätsgrenzen für automatisch erzeugte Pläne

Für normale automatisch erzeugte Erwachsenen-Pläne wird die obere Defizitgrenze **vom geschätzten Erhaltungsbedarf abhängig gemacht** und nicht als fixer kcal-Wert definiert.

V1 setzt als automatische Obergrenze eine maximale Reduktion der Kalorienaufnahme von **25 % des Erhaltungsbedarfs**:

```text
maximale Kalorienreduktion R_max = 0,25 × Erhaltungsbedarf M
minimales Tagesziel aus dieser Grenze C_min = 0,75 × M
```

Da der 10-%-TEF im Defizitmodell separat berücksichtigt wird, entspricht dies intern einem maximalen geplanten Körperenergie-Defizit von:

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

Die 25-%-Grenze ist eine konservative Produktentscheidung innerhalb des in etablierten Gewichtsmanagement-Leitlinien verwendeten Bereichs von ungefähr 15–30 % reduzierter Energieaufnahme. Sie ist keine individuelle physiologische Grenze.

Zusätzlich soll die automatisch empfohlene Energieaufnahme ungefähr nicht unter **1.200 kcal/Tag** für die weibliche Mifflin-Kategorie und **1.500 kcal/Tag** für die männliche Mifflin-Kategorie fallen. Diese Werte sind pragmatische Planungsgrenzen und keine individuellen physiologischen Mindestwerte.

Wenn Ziel und Zeitraum entweder die maintenance-relative 25-%-Grenze oder die absolute Kalorien-Untergrenze verletzen, soll die App primär einen längeren Zeitraum bzw. eine Anpassung des Ziels vorschlagen.

Sehr niedrige Energiezufuhren um 800–1.000 kcal/Tag oder darunter gehören in medizinisch betreute Kontexte und sind nicht Teil der normalen automatischen MVP-Empfehlung.

## Wochenbudget

Das Wochenbudget wird aus dem durchschnittlichen täglichen Kalorienziel abgeleitet:

```text
Wochenbudget W = C × 7
```

Ohne flexiblen Tag gilt:

```text
Montag bis Sonntag ≈ C kcal/Tag
```

Die interne Berechnung kann Dezimalwerte enthalten; die UI zeigt ganze kcal-Werte. Rundungsreste werden so auf einzelne Tage verteilt, dass das Wochenbudget insgesamt exakt erhalten bleibt.

## Flexibler Tag / höheres Tagesbudget

Ein flexibler Tag **erhöht das Wochenbudget nicht**. Er verteilt dieselben Wochenkalorien anders.

### Ein flexibler Tag

Mit:

- `W` = Wochenbudget
- `H` = Kalorienbudget des flexiblen Tages
- `L` = Kalorienbudget der sechs normalen Tage

```text
L = (W - H) / 6
```

### Mehrere flexible Tage

Für `n` flexible Tage:

```text
L = (W - Summe(H_i)) / (7 - n)
```

### V1-Grenze des flexiblen Tages

Die automatische Planung setzt den **Erhaltungsbedarf als maximales Budget des flexiblen Tages**.

Damit kann ein Tag bis auf Maintenance-Niveau angehoben werden, aber die App plant in V1 keinen absichtlichen Kalorienüberschuss als Cheat Day ein.

Der Nutzer kann einen höheren Tag zwischen normalem Tagesziel und Erhaltungsbedarf wählen.

Wenn die dadurch erforderliche Reduktion der übrigen Tage gegen die automatischen Kalorien-Untergrenzen verstößt, muss die App:

1. den flexiblen Tag reduzieren oder
2. den Gesamtzeitraum verlängern.

## Beispiel: Tagesbudgets mit flexiblem Tag

Annahme:

```text
Erhaltungsbedarf M = 2.470 kcal
Ziel: 5 kg Gewichtsverlust
Zeitraum: 100 Tage
```

Statisches Gesamtdefizit:

```text
5 × 7.700 = 38.500 kcal
D = 38.500 / 100 = 385 kcal/Tag
```

Mit TEF:

```text
B = 2.470 × 0,90 = 2.223 kcal
C = (2.223 - 385) / 0,90
C ≈ 2.042 kcal/Tag
```

Wochenbudget:

```text
W ≈ 2.042,22 × 7
W ≈ 14.295,56 kcal
```

Ohne flexiblen Tag:

```text
≈ 2.042 kcal pro Tag
```

Mit einem flexiblen Tag auf Erhaltungsniveau:

```text
H = 2.470 kcal
L = (14.295,56 - 2.470) / 6
L ≈ 1.971 kcal
```

Eine mögliche gerundete Woche:

```text
Montag       1.971 kcal
Dienstag     1.971 kcal
Mittwoch     1.971 kcal
Donnerstag   1.971 kcal
Freitag      1.971 kcal
Samstag      2.470 kcal  ← flexibler Tag
Sonntag      1.971 kcal
--------------------------------
Woche       14.296 kcal
```

Die gerundete Wochenzahl kann um wenige kcal von der ungerundeten internen Rechnung abweichen. Die Implementierung soll den Rundungsrest deterministisch verteilen.

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

→ Verteilung auf normale und flexible Tage
```

## Manuelle Anpassung

Das automatisch berechnete Kalorienziel kann vom Nutzer in Einstellungen bzw. einem erweiterten Bereich manuell überschrieben werden. Diese Funktion bleibt getrennt von der automatischen Wochenbudget- und Flex-Day-Logik.

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