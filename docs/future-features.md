# Zukünftige Features

## KFA-Visualisierung

Eine spätere Funktion soll Nutzern helfen, einen Ziel-KFA besser einzuschätzen.

Mögliche Varianten:

1. Nutzer lädt ein eigenes Bild hoch und erhält eine visualisierte Projektion mit einem gewünschten KFA.
2. Die App generiert mehrere KFA-Beispiele und der Nutzer wählt die Darstellung, die seinem Ziel am ehesten entspricht.

## Einschränkung

Eine solche Visualisierung wäre eine Schätzung bzw. Visualisierung und keine zuverlässige Messung des tatsächlichen Körperfettanteils.

## V2 — interaktiver Plan-Anpassungs-/Was-wäre-wenn-Screen

Nach der normalen Berechnung und Ergebnisanzeige soll V2 optional einen zusätzlichen Screen anbieten, sinngemäß z. B. **„Passt dein Plan so oder möchtest du noch etwas anpassen?“**.

Der Nutzer verändert dort **keine statischen Körperdaten** wie Größe, Alter oder aktuelles Gewicht. Stattdessen kann er gezielt veränderbare Verhaltensparameter ausprobieren, insbesondere:

- mehr oder weniger durchschnittliche Schritte pro Tag;
- mehr oder weniger Sporteinheiten pro Woche;
- andere Sportarten;
- längere oder kürzere Trainingsdauer.

Die Oberfläche soll als interaktiver **Was-wäre-wenn-Rechner** funktionieren. Änderungen werden unmittelbar mit der bestehenden deterministischen Berechnungslogik neu bewertet.

Wichtig ist, dass die App nicht nur das vollständig neu berechnete Kalorienziel zeigt, sondern vor allem den **direkten Kalorien-Effekt der Änderung als Delta**. Beispiel:

```text
+ 1.000 Schritte/Tag
→ + XX kcal/Tag zusätzlicher Spielraum
```

Der konkrete Wert wird aus den aktuellen Körperdaten und dem bestehenden Schritt-/Aktivitätsmodell berechnet und ist kein pauschaler allgemeiner Richtwert.

Analog soll die App bei zusätzlichen Sporteinheiten oder längerer Trainingsdauer direkt zeigen, wie viel zusätzlicher täglicher bzw. auf die Woche gemittelter Kalorienspielraum daraus nach dem aktuellen Modell entsteht.

Ziel des Features ist, dem Nutzer konkrete **Verhaltenshebel** zu zeigen, mit denen er seinen Plan beeinflussen kann, statt nur einen statischen Zielwert zu präsentieren.

**Scope:** ausdrücklich **Version 2**, nicht Teil des MVP/V1-Onboardings.

## Weitere mögliche Entwicklungen

- adaptive Kalorienziele auf Basis des tatsächlichen Gewichtsverlaufs
- automatische Anpassung des Plans
- Voice Food Tracking
- personalisierte Mahlzeitenvorschläge
- LLM-basierte Ernährungsberatung
- bessere Modellierung von Trainings- und Aktivitätsdaten
- Wenn ein Plan erstellt wurde, gibt die App feedback wie schwer das Ziel gesetzt ist (1kg pro woche abzunehmen benötogt mehr disziplin als 0,2kg). Dann kann die App dem uswr zb so ein Feedback geben: "Dein Ziel ist sehr ambitioniert gesetzt. Bist du Zielstrebig/Diszipliniert genug um den Plan wirklich durchzuziehen? Alternativ schlage ich vor, dass wir deine Ziele nochmal überarbeiten."
