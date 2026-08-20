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
- Zielgewicht
- Zeitraum bis zum Ziel

Der aktuelle KFA ist **optional**.

Das Ziel-KFA-Konzept ist ebenfalls optional. Ein Ziel-KFA soll nur verwendet werden, wenn ein aktueller KFA bekannt bzw. vom Nutzer angegeben wurde. Der KFA soll grundsätzlich nicht zwingend Bestandteil der Gewichtsverlust-Berechnung sein, sondern kann zusätzlich zur Information und für Projektionen verwendet werden. Wenn der aktuelle KFA angegeben ist, soll er jedoch bei der Berechnung des Energiebedarfs berücksichtigt werden können.

## Zielsetzung

Der Nutzer soll ein Ziel über mindestens folgende Größen definieren können:

- Zielgewicht
- Zeitraum
- optional Ziel-KFA, sofern aktueller KFA vorhanden ist

## Berechnung

Die App berechnet:

1. geschätzten Grundumsatz
2. geschätzten Erhaltungsbedarf / Gesamtenergieverbrauch
3. notwendiges Energiedefizit für das gewünschte Ziel
4. daraus abgeleitetes durchschnittliches Kalorienziel

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
