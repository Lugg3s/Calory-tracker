# App Flow

## Ziel

Der erste Produkt-Flow soll den Nutzer möglichst schnell von der ersten App-Öffnung zu einem verständlichen Abnehmplan führen. Das Onboarding soll alle für den ersten Plan notwendigen Informationen erfassen, aber nicht wie ein langes Formular wirken.

Als UX-Ziel soll der erste Durchlauf ungefähr in zwei Minuten machbar sein. Entscheidend ist weniger eine harte Zeitgrenze als ein schneller, leichter und klarer Flow.

## Designprinzip für Eingabe-Screens

Die Eingabe-Screens sollen standardmäßig sehr minimalistisch und aufgeräumt sein.

Grundregel:

- pro Screen grundsätzlich nur **ein Eingabeparameter**
- kurze, klare Frage bzw. Bezeichnung
- möglichst wenig zusätzliche UI
- der Nutzer kann bei Bedarf eine kleine Zusatzinformation einblenden

Die optionale Zusatzinformation erklärt kurz:

1. warum die Angabe benötigt wird;
2. welchen Einfluss sie auf Berechnung, Empfehlung oder Personalisierung haben kann.

Diese Erklärung ist standardmäßig ausgeblendet, damit der normale Screen visuell ruhig bleibt.

## Vorgesehener MVP-Onboarding-Flow

### Screen 1 — Start

**Parameter:** keiner

Kurze Einführung und primäre Aktion, z. B. **„Plan erstellen“**.

### Screen 2 — Geschlecht / biologische Kategorie

**Parameter:** Geschlecht bzw. die für die gewählte Berechnung erforderliche biologische Kategorie

### Screen 3 — Alter

**Parameter:** Alter

### Screen 4 — Größe

**Parameter:** Körpergröße

### Screen 5 — Aktuelles Gewicht

**Parameter:** aktuelles Körpergewicht

### Screen 6 — Aktueller KFA

**Parameter:** aktueller Körperfettanteil

Der aktuelle KFA ist optional. Der Nutzer kann diesen Screen überspringen.

Wenn der Nutzer seinen KFA nicht kennt, kann er aktiv eine visuelle Hilfsansicht öffnen, z. B. über **„Beispiele anzeigen“**. Die App wählt dafür aus einer vorab generierten Referenzbibliothek Bilder aus, die möglichst gut zu den bereits eingegebenen Daten passen.

Damit dafür keine zusätzliche Körperbau-Frage nötig ist, leitet die App intern aus Größe und Gewicht eine grobe Körperform-/Referenzkategorie ab, beispielsweise über eine BMI-ähnliche Größen-Gewichts-Relation. Die Referenzbibliothek kann dadurch ungefähr nach folgenden Merkmalen organisiert werden:

- Geschlecht / biologische Kategorie
- abgeleitete Körperform-/Referenzkategorie
- KFA-Stufe

Die aktuelle Richtung ist, KFA-Stufen ungefähr in 5-Prozentpunkt-Schritten abzubilden. Die Referenzbilder werden nicht live für den einzelnen Nutzer generiert, sondern im Voraus für eine begrenzte Anzahl typischer Kategorien erstellt. Ein vollständiges Raster für jede Größen- und Gewichtskombination ist damit nicht erforderlich.

Die intern abgeleitete Referenzkategorie dient ausschließlich der Auswahl geeigneter Vergleichsbilder und ist keine medizinische Klassifikation. Die visuelle Hilfe ist insgesamt nur eine grobe Orientierung zur Selbsteinschätzung und keine KFA-Messung. Der Nutzer sieht die Bilder nur, wenn er diese Hilfe ausdrücklich öffnet; der normale Screen bleibt minimalistisch.

### Screen 7 — Alltagstyp

**Parameter:** Alltagsaktivität / Tätigkeit, z. B. überwiegend sitzend

### Screen 8 — Schritte

**Parameter:** durchschnittliche tägliche Schritte

### Screen 9 — Sporthäufigkeit

**Parameter:** Trainings-/Sporthäufigkeit

### Screen 10 — Trainingsart

**Parameter:** Trainingsart / Sportart

Dieser Screen wird nur gezeigt, wenn der Nutzer regelmäßigen Sport bzw. Training angegeben hat. Die genaue Granularität der auswählbaren Trainingsarten wird später im UX- und Berechnungsmodell festgelegt.

### Screen 11 — Zielgewicht

**Parameter:** Zielgewicht

### Screen 12 — Ziel-KFA

**Parameter:** Ziel-KFA

Dieser Screen wird nur angeboten, wenn der Nutzer zuvor einen aktuellen KFA angegeben hat. Ziel-KFA bleibt optional.

### Screen 13 — Zeitraum

**Parameter:** gewünschter Zeitraum bis zum Ziel

### Screen 14 — Cheat Day / höheres Tagesbudget

**Parameter:** geplante Verteilung des Kalorienbudgets über die Woche

Für das Onboarding ist ein eigener Screen vorgesehen, über den der Nutzer einen geplanten Cheat Day bzw. einen Tag mit höherem Kalorienbudget berücksichtigen kann.

Die Funktion ist als offener Produktpunkt dokumentiert. Noch festzulegen sind insbesondere:

- ob der Screen nur eine Ja/Nein-Auswahl oder direkt einen Wochentag enthält;
- ob und wie der Nutzer die Höhe des zusätzlichen Tagesbudgets festlegt;
- wie viele Kalorien an den übrigen Tagen abgezogen werden;
- welche Grenzen für eine sichere und sinnvolle Umverteilung gelten;
- ob im finalen Produkt eine neutralere Bezeichnung als „Cheat Day“ verwendet wird.

Die zentrale Anforderung ist, dass ein höheres Budget an einem Tag **innerhalb des Wochenbudgets berücksichtigt** wird. Der Cheat Day darf also nicht einfach zusätzliche Kalorien oberhalb des geplanten Wochenbudgets hinzufügen, wenn dadurch das vorgesehene durchschnittliche Defizit verändert würde.

### Screen 15 — Tracking-Modus

**Parameter:** Tracking-Präferenz

Auswahl:

- nur Kalorien
- Kalorien + Makronährstoffe

### Screen 16 — Plan-Ergebnis

**Parameter:** keiner

Nach Abschluss der Eingaben wird direkt der erste Plan gezeigt. Die Ergebnisansicht soll mindestens enthalten:

- vorgeschlagenes Kalorienziel bzw. die geplante Wochenverteilung
- geschätzten Erhaltungsbedarf
- geplantes durchschnittliches Defizit
- kurze Einschätzung des Plans
- Zugang zur detaillierten, nachvollziehbaren Berechnung

## Nach dem Onboarding

Nach dem ersten Plan soll der Nutzer nicht mit weiteren Pflichtfragen blockiert werden. Zusätzliche Komplexität wird nachgelagert angeboten, z. B. über **„Plan verfeinern“**, Berechnungsdetails oder Einstellungen.

Dort können später insbesondere liegen:

- detailliertere Erklärungen und Formeln
- zusätzliche Trainings-/Aktivitätsdetails, sofern für die Berechnung sinnvoll
- manuelle Anpassung des Kalorienziels
- manuelle Anpassung von Makrozielen
- weitere Personalisierungsoptionen

Die bereits getroffene Produktentscheidung bleibt bestehen: Die manuelle Anpassung des Kalorienziels gehört nicht prominent auf den Main Screen.

## Status

Der grundsätzliche Flow und das Prinzip „ein Parameter pro Eingabe-Screen“ sind festgelegt. Exakte Texte, Controls, visuelle Gestaltung und mögliche Mikro-Interaktionen werden in der Wireframe-/Designphase iteriert.

Der Cheat-Day-/Wochenbudget-Screen ist als notwendiger zusätzlicher Onboarding-Punkt aufgenommen, seine konkrete UX und Berechnungslogik sind jedoch noch offen.

Für die KFA-Referenzbibliothek sind insbesondere die genaue Ableitung der Körperform-/Referenzkategorien, die Anzahl der Kategorien, deren Grenzwerte, die KFA-Spanne und die benötigten Bildvarianten noch festzulegen.
