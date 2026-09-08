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
- Zielgewicht oder, sofern aktueller KFA vorhanden ist, Ziel-KFA zur Ableitung des Zielgewichts
- Zeitraum bis zum Ziel

Der aktuelle KFA ist **optional**.

Wenn kein aktueller KFA angegeben wurde, definiert der Nutzer sein Ziel über ein direkt eingegebenes Zielgewicht.

Wenn ein aktueller KFA angegeben wurde, darf der Nutzer alternativ einen **Ziel-KFA** auswählen, auch anhand visueller Referenzbilder. In diesem Fall berechnet die App näherungsweise, welches Zielgewicht und welche Gewichtsabnahme dem gewählten Ziel-KFA entsprechen. Dieses berechnete Zielgewicht wird anschließend für die eigentliche Gewichtsverlust- und Kalorienplanung verwendet.

Der aktuelle KFA soll bei der Berechnung des Energiebedarfs berücksichtigt werden können.

## Zielsetzung

Der Nutzer benötigt für die Planung ein Zielgewicht. Dieses entsteht entweder:

- durch direkte Eingabe des Zielgewichts; oder
- bei vorhandenem aktuellem KFA durch Auswahl eines Ziel-KFA, aus dem die App ein Zielgewicht ableitet.

Zusätzlich definiert der Nutzer den gewünschten Zeitraum.

Bei Ziel-KFA ist die daraus abgeleitete Gewichtsabnahme eine Modellschätzung. Die erste Modellrichtung geht von konstanter fettfreier Masse aus.

## Berechnung

Die App berechnet:

1. geschätzten Grundumsatz
2. geschätzten Erhaltungsbedarf / Gesamtenergieverbrauch
3. bei Ziel-KFA: modellhaftes Zielgewicht und notwendige Gewichtsabnahme
4. notwendiges Energiedefizit auf Basis des Zielgewichts
5. daraus abgeleitetes durchschnittliches Kalorienziel
6. optional eine Wochenverteilung mit geplantem höherem Tagesbudget / Cheat Day

Die konkrete wissenschaftliche Methode und alle Parameter werden separat dokumentiert und vor Implementierung validiert.

## Transparenz-Ansicht

Ein zentraler MVP-Bestandteil ist eine detaillierte Berechnungsansicht, die wie eine einfache Kostenrechnung aufgebaut sein kann:

```text
Grundumsatz                         XXXX kcal
+ Alltagsaktivität                  XXXX kcal
+ Schritte                          XXXX kcal
+ Training                          XXXX kcal
--------------------------------------------
= geschätzter Erhaltungsbedarf     XXXX kcal

- tägliches Defizit                 XXX kcal
--------------------------------------------
= Kalorienziel                      XXXX kcal
```

Die einzelnen Positionen sollen anklickbar bzw. erklärbar sein.

Wenn Ziel-KFA zur Zieldefinition verwendet wird, soll zusätzlich nachvollziehbar dargestellt werden, wie aus aktuellem Gewicht, aktuellem KFA und Ziel-KFA das modellhafte Zielgewicht und die erforderliche Gewichtsabnahme abgeleitet wurden.

## Änderbare Werte

Der Nutzer darf das vorgeschlagene Kalorienziel manuell anpassen. Diese Einstellung soll **nicht prominent auf dem Main Screen** erscheinen, sondern beispielsweise in Einstellungen oder einem erweiterten Bereich.

Das gleiche Prinzip soll später für vom Nutzer anpassbare Makronährstoffziele gelten.

## Trainingsprofil

Im Onboarding soll die Trainingssituation bzw. das Zielprofil erfasst werden. Insbesondere soll unterschieden werden können, ob der Nutzer regelmäßig Kraftsport bzw. Leistungssport betreibt.

Diese Information wird unter anderem für Proteinempfehlungen verwendet.

## Tracking-Modi

Der Nutzer soll entscheiden können, wie detailliert er tracken möchte:

### Einfach

- Kalorienziel
- keine verpflichtende Makroverfolgung

### Erweitert

- Kalorienziel
- Protein
- Fett
- Kohlenhydrate

Makronährstofftracking darf optional sein und soll Einsteiger nicht unnötig belasten.

## Nicht zwingend im initialen MVP

- LLM-basierte Mahlzeitenerkennung
- Sprachverarbeitung
- KI-basierte Alternativvorschläge
- Bildgenerierung des zukünftigen Körpers

Diese Funktionen gehören zur späteren Produktentwicklung.
