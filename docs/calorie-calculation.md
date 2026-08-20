# Kalorienberechnung

## Produktanforderung

Die Berechnung des Kalorienbedarfs soll für den Nutzer nachvollziehbar sein. Die App soll nicht einfach einen einzelnen Wert präsentieren, sondern zeigen, welche Eingaben welchen Einfluss auf das Ergebnis haben.

## Geplanter Rechenweg

Grundsätzlich soll der Rechenweg aus mehreren transparenten Komponenten bestehen:

1. Grundumsatz
2. Alltagsaktivität
3. Schritte
4. geplantes Training / Sport
5. Summe = geschätzter Erhaltungsbedarf
6. Berechnung des erforderlichen Defizits
7. Verteilung des Defizits auf den gewünschten Zeitraum
8. daraus resultierendes Kalorienziel

Die konkrete Formel für den Grundumsatz und die Methode zur Berechnung des Gesamtenergieverbrauchs sind noch festzulegen und wissenschaftlich zu recherchieren.

## Kostenrechnungs-ähnliche Darstellung

Die UI soll beispielsweise so funktionieren:

```text
Grundumsatz                         1.650 kcal
+ Alltagsaktivität                    300 kcal
+ Schritte                            250 kcal
+ Training (Tagesdurchschnitt)        150 kcal
--------------------------------------------
= geschätzter Erhaltungsbedarf      2.350 kcal

- Defizit                             400 kcal
--------------------------------------------
= vorgeschlagenes Tagesziel         1.950 kcal
```

Die Zahlen sind nur illustrative Beispiele und keine festgelegten Modellparameter.

## Erklärung der Gewichtsabnahme

Die App soll die Grundidee sehr einfach erklären können:

> Körperfett enthält gespeicherte Energie. Für die Planung kann näherungsweise mit einer bestimmten Energiemenge pro Kilogramm Fettmasse gearbeitet werden. Diese Zahl ist eine Modellannahme und keine exakte biologische Konstante.

Als bisherige Produktidee wurde ungefähr **7.000–7.700 kcal pro kg Fettmasse** diskutiert. Der endgültige Wert und die Formulierung müssen vor der Implementierung anhand wissenschaftlicher Literatur festgelegt werden.

Beispiel für die spätere Erklärung:

```text
Du möchtest 5 kg abnehmen.

5 kg × angenommene Energiedifferenz pro kg
= benötigtes Gesamtdefizit

Dieses Defizit wird auf deinen gewünschten Zeitraum verteilt.
= durchschnittliches tägliches Defizit

Erhaltungsbedarf - tägliches Defizit
= vorgeschlagenes Kalorienziel
```

Dabei muss deutlich gemacht werden, dass die reale Gewichtsveränderung nicht linear ist und Körpergewicht nicht ausschließlich aus Fett besteht.

## Aktivität als zusätzliche Stellschraube

Die App soll verständlich darstellen können, wie zusätzliche Aktivität den geschätzten Energieverbrauch verändert.

Beispiele:

- zusätzliche Schritte
- Krafttraining
- Joggen / Laufen
- andere sportliche Aktivitäten

Die Darstellung soll eher erklären: „Diese Aktivität erhöht deinen geschätzten Energieverbrauch um ungefähr X kcal“ als eine falsche Präzision zu suggerieren.

## KFA

Der KFA kann, wenn vorhanden, in die Schätzung des Energiebedarfs einfließen. Dies ist insbesondere relevant, weil zwei Personen mit gleichem Gewicht und gleicher Größe aufgrund unterschiedlicher Körperzusammensetzung unterschiedliche fettfreie Masse und damit unterschiedliche Energiebedarfe haben können.

Der konkrete mathematische Umgang mit KFA ist noch offen.

## Manuelle Anpassung

Das automatisch berechnete Kalorienziel kann vom Nutzer manuell überschrieben werden. Diese Funktion soll verfügbar sein, aber nicht prominent auf dem Main Screen dargestellt werden.

## Wichtiger Grundsatz

Alle Ergebnisse sind **Schätzwerte**. Die App soll diese Unsicherheit transparent kommunizieren und später idealerweise aus dem tatsächlichen Gewichtsverlauf lernen bzw. die Schätzung regelmäßig anpassen.
