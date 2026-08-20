# AI & Voice

## Grundentscheidung für das MVP

Das MVP soll zunächst **ohne LLM** entwickelt werden.

Der Kernnutzen der ersten Version soll vollständig deterministisch funktionieren: Dateneingabe → Berechnung → nachvollziehbarer Abnehmplan.

## Spätere Voice-Funktion

Nach Erstellung des Plans soll der Nutzer Mahlzeiten per Sprachnachricht eingeben können.

Beispiel:

> „Ich habe gerade eine Pizza und zwei Bier gegessen.“

Die spätere KI kann daraus Lebensmittel und ungefähre Mengen erkennen, eine Kalorienschätzung erzeugen und den verbleibenden Tagesrahmen berechnen.

## Geplante KI-Funktionen

- Sprache → strukturierte Mahlzeit
- Schätzung von Kalorien und Makronährstoffen
- Erkennen fehlender Mengenangaben
- Rückfragen bei hoher Unsicherheit
- gesündere bzw. kalorienärmere Alternativen
- Vorschläge für den Rest des Tages
- Anpassung von Vorschlägen an das persönliche Ziel und Trainingsprofil

## Wichtig

LLM-Ausgaben dürfen nicht als exakte Messwerte behandelt werden. Unsicherheit und fehlende Informationen müssen berücksichtigt werden.

## Spätere Architektur

Noch offen:

- Modell / Anbieter
- On-device vs. Server
- Speech-to-Text
- strukturierte Ausgabe / JSON-Schema
- Validierung von LLM-Ergebnissen
- Lebensmittel-Datenbank
- Kosten und Latenz
- Datenschutz
