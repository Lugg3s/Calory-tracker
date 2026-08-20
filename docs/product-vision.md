# Produktvision

## Ausgangsidee

Calory Tracker soll einen möglichst einfachen, persönlichen und nachvollziehbaren Plan zum Abnehmen erstellen.

Der Nutzer gibt seine aktuellen Werte, Essgewohnheiten, Alltagsbewegung und sportliche Aktivität an. Die App berechnet daraus den geschätzten aktuellen Kalorienbedarf. Anschließend kann der Nutzer Zielgewicht, optional Ziel-KFA und den gewünschten Zeitraum festlegen. Daraus wird ein durchschnittliches Kaloriendefizit und ein tägliches Kalorienziel abgeleitet.

## Kernidee: nachvollziehbare Berechnung

Die App soll nicht nur sagen:

> „Dein Kalorienbedarf beträgt 2.100 kcal.“

Sondern zeigen, **warum** dieser Wert entsteht und wie die Angaben des Nutzers ihn verändern. Die Berechnung soll sich visuell ähnlich einer Kostenrechnung lesen lassen:

```text
Grundumsatz                    XXXX kcal
+ Alltagsaktivität             XXXX kcal
+ Schritte                     XXXX kcal
+ Training                     XXXX kcal
----------------------------------------
= Erhaltungsbedarf             XXXX kcal
- Defizit                      XXX kcal
----------------------------------------
= Kalorienziel                 XXXX kcal
```

Zusätzlich soll die App erklären können, was einzelne Positionen bedeuten und wie sie berechnet wurden.

## Abnehmen ohne unnötiges Tracking

Der langfristige Produktansatz soll nicht voraussetzen, dass der Nutzer jede Mahlzeit exakt wiegt und jede Kalorie manuell einträgt.

Später soll der Nutzer beispielsweise per Sprachnachricht sagen können, was er an diesem Tag gegessen hat. Die App schätzt daraus die bisherige Energieaufnahme und schlägt vor, was im verbleibenden Tagesbudget noch sinnvoll sein könnte.

## Aktivität als verständliche Stellschraube

Die App soll dem Nutzer anschaulich zeigen, welchen Unterschied zusätzliche Aktivität ungefähr machen kann, z. B.:

- zusätzliche Schritte → ungefähr X kcal mehr Spielraum
- 1 Stunde Krafttraining → ungefähr X kcal mehr
- 5 km Joggen → ungefähr X kcal mehr

Die Zahlen sollen nachvollziehbar sein, aber als Schätzungen gekennzeichnet werden.

## KFA

Der KFA ist optional. Er soll nicht zwingend notwendig sein, um einen Abnehmplan zu erstellen.

Wenn ein aktueller KFA vorhanden ist, kann er zur Verbesserung der Energiebedarfsberechnung verwendet werden. Das ist relevant, weil Menschen mit gleichem Gewicht und gleicher Körpergröße aufgrund unterschiedlicher Körperzusammensetzung unterschiedliche Energiebedarfe haben können.

Der KFA soll außerdem als zusätzliche Information dienen. Wenn aktueller KFA und Gewichtsverlust bekannt sind, kann die App beispielsweise unter der Annahme konstanter fettfreier Masse zeigen, welcher KFA bei einem bestimmten zukünftigen Gewicht ungefähr resultieren würde.

Ein Ziel-KFA soll nur angegeben werden können, wenn ein aktueller KFA vorhanden ist.

## Einfachheit und progressive Komplexität

Der Nutzer soll entscheiden können, ob er nur Kalorien oder zusätzlich Makronährstoffe verfolgen möchte.

### Einfacher Modus

- Kalorienziel
- keine verpflichtende Makroverfolgung

### Erweiterter Modus

- Kalorienziel
- Protein
- Fett
- Kohlenhydrate

## Manuelle Kontrolle

Die App darf einen Kalorienbedarf bzw. ein Kalorienziel vorschlagen, soll dem Nutzer aber nicht die Kontrolle entziehen. Der Nutzer kann den vorgeschlagenen Wert in Einstellungen bzw. einem weniger prominenten Bereich manuell anpassen.

Das gilt perspektivisch auch für Makronährstoffziele.

## MVP vs. Zukunft

Das initiale MVP soll **ohne LLM** funktionieren. Der Kern muss deterministisch und wissenschaftlich nachvollziehbar sein.

KI, Voice Food Tracking und Bildgenerierung sind spätere Ausbaustufen.

## Zukünftige KFA-Visualisierung

Langfristig könnte der Nutzer ein eigenes Bild hochladen und eine Visualisierung erhalten, wie ein Körper bei einem gewünschten KFA ungefähr aussehen könnte. Alternativ könnte die App mehrere KFA-Beispiele generieren, aus denen der Nutzer ein Ziel auswählt.

Das wäre ausschließlich eine Visualisierung bzw. Orientierung und keine verlässliche KFA-Messung.

## Produktprinzipien

1. **Nachvollziehbarkeit vor Black Box**
2. **Einfache Bedienung vor maximaler Tracking-Tiefe**
3. **Schätzungen als Schätzungen kommunizieren**
4. **Nutzer kann wichtige Werte kontrollieren**
5. **MVP ohne unnötige KI-Abhängigkeit**
6. **Wissenschaftliche Grundlagen vor finaler Implementierung validieren**
