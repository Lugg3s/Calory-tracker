# Onboarding

## Ziel des Onboardings

Das Onboarding sammelt nur Informationen, die für die Berechnung oder Personalisierung relevant sind. Die App soll den Nutzer nicht unnötig mit Fachbegriffen oder Detailfragen belasten.

Der erste Durchlauf soll bewusst kurz bleiben und ungefähr in zwei Minuten machbar sein. Entscheidend ist ein schneller, leichter Flow, nicht eine starre Zeitgrenze.

## UX-Prinzipien

Die Onboarding-Screens sollen standardmäßig sehr minimalistisch und aufgeräumt wirken.

Grundsätzlich gilt:

- pro Eingabe-Screen nur **ein Parameter**
- kurze, eindeutige Fragen
- möglichst wenig zusätzliche UI
- Erklärungen nur auf Wunsch einblenden

Jeder relevante Eingabe-Screen soll eine kleine optionale Information anbieten können. Diese erklärt knapp:

1. warum die Angabe benötigt wird;
2. welchen Einfluss sie auf Berechnung, Empfehlung oder Personalisierung haben kann.

Die Zusatzinformation ist standardmäßig ausgeblendet, damit der normale Screen visuell ruhig bleibt.

Komplexere Erklärungen, Formeln und Details werden nach der initialen Dateneingabe angeboten, nicht zwingend während des ersten Durchlaufs.

## Vorgesehene Angaben

### Körperdaten

- Alter
- Geschlecht / biologische Kategorie für die gewählte Berechnung
- Größe
- aktuelles Gewicht
- optional aktueller KFA

### Aktivität

- Alltagsaktivität, z. B. Bürojob / überwiegend sitzend
- durchschnittliche Schritte pro Tag
- Sportarten / Trainingsart
- Trainingshäufigkeit
- weitere Trainingsdetails nur soweit für die Berechnung relevant

### Ziel

- Zielgewicht
- gewünschter Zeitraum
- optional Ziel-KFA

**Regel:** Ein Ziel-KFA wird nur angeboten, wenn ein aktueller KFA angegeben wurde.

### Trainings-/Ernährungsprofil

Der Nutzer soll angeben können, ob er beispielsweise regelmäßig Kraftsport bzw. Leistungssport betreibt. Diese Information beeinflusst insbesondere die Proteinempfehlung.

## Tracking-Präferenz

Der Nutzer kann wählen:

- **Nur Kalorien tracken**
- **Kalorien + Makronährstoffe tracken**

Damit bleibt Makrotracking optional.

## Screen-Reihenfolge

Der aktuell vorgesehene Flow ist:

1. Start
2. Geschlecht / biologische Kategorie
3. Alter
4. Größe
5. aktuelles Gewicht
6. aktueller KFA, optional
7. Alltagstyp
8. durchschnittliche Schritte
9. Sporthäufigkeit
10. Trainingsart, nur wenn Sport/Training angegeben wurde
11. Zielgewicht
12. Ziel-KFA, nur wenn aktueller KFA vorhanden; optional
13. gewünschter Zeitraum
14. Tracking-Modus
15. Plan-Ergebnis

Die genaue Beschreibung der Screens und des anschließenden Flows steht in [`app-flow.md`](app-flow.md).

## Nach dem ersten Plan

Nach der Planerstellung soll der Nutzer nicht durch weitere Pflichtfragen aufgehalten werden. Zusätzliche Details werden nachgelagert angeboten, z. B. über „Plan verfeinern“, Berechnungsdetails oder Einstellungen.

Dazu können unter anderem gehören:

- detailliertere Erklärungen und Formeln
- zusätzliche Aktivitäts-/Trainingsdetails
- manuelle Anpassung des Kalorienziels
- manuelle Anpassung von Makrozielen
- weitere Personalisierung
