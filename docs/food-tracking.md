# Food Tracking

## MVP-Ansatz

Das initiale MVP soll noch **keine LLM-basierte Ernährungserkennung** benötigen.

Das Produkt soll trotzdem eine möglichst einfache Möglichkeit bieten, die Ernährung im Kontext des Kalorienziels einzuschätzen.

## Langfristige Idee

Der Nutzer soll nicht zwingend jede Mahlzeit exakt wiegen und jede Zutat manuell eintragen müssen.

Stattdessen soll er beispielsweise sagen können:

> „Heute hatte ich morgens zwei Brötchen mit Käse, mittags Pasta mit Tomatensoße und nachmittags einen Joghurt.“

Die App kann daraus eine ungefähre Einschätzung ableiten und anschließend anzeigen, was für den restlichen Tag noch sinnvoll sein könnte.

## Vor-LLM-Phase

Bis ein LLM integriert wird, müssen mögliche Food-Tracking-Funktionen auf deterministischen Regeln, Datenbanken und hinterlegten Kalorien-/Nährwertdaten basieren.

Dabei muss klar kommuniziert werden, dass Mengenangaben ohne exakte Gewichte nur Schätzungen erlauben.

## Ziel der späteren Funktion

Der Nutzer soll möglichst wenig Tracking-Aufwand haben und trotzdem eine brauchbare Orientierung erhalten:

1. Was habe ich ungefähr gegessen?
2. Wie viel meines Tagesbudgets ist vermutlich noch übrig?
3. Was könnte ich jetzt noch essen?
4. Gibt es eine ähnlich leckere, aber kalorienärmere bzw. nährstoffmäßig passendere Alternative?

## Keine harte Präzision

Wenn keine exakten Mengen bekannt sind, sollen Ergebnisse als ungefähre Bereiche oder Schätzungen dargestellt werden, nicht als scheinbar exakte Kalorienwerte.
