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

Der Nutzer verändert dort **keine statischen Körperdaten** wie Größe, Alter oder aktuelles Gewicht. Stattdessen kann er gezielt veränderbare Verhaltens- und Planparameter ausprobieren, insbesondere:

- mehr oder weniger durchschnittliche Schritte pro Tag;
- mehr oder weniger Sporteinheiten pro Woche;
- andere Sportarten;
- längere oder kürzere Trainingsdauer;
- ein früheres oder späteres Zieldatum.

Die Oberfläche soll als interaktiver **Was-wäre-wenn-Rechner** funktionieren. Änderungen werden unmittelbar mit der bestehenden deterministischen Berechnungslogik neu bewertet.

Wichtig ist, dass die App nicht nur das vollständig neu berechnete Kalorienziel zeigt, sondern bei Verhaltensänderungen vor allem den **direkten Kalorien-Effekt der Änderung als Delta**. Beispiel:

```text
+ 1.000 Schritte/Tag
→ + XX kcal/Tag zusätzlicher Spielraum
```

Der konkrete Wert wird aus den aktuellen Körperdaten und dem bestehenden Schritt-/Aktivitätsmodell berechnet und ist kein pauschaler allgemeiner Richtwert.

Analog soll die App bei zusätzlichen Sporteinheiten oder längerer Trainingsdauer direkt zeigen, wie viel zusätzlicher täglicher bzw. auf die Woche gemittelter Kalorienspielraum daraus nach dem aktuellen Modell entsteht.

Bei einer Veränderung des Zieldatums soll die App unmittelbar zeigen, wie sich das erforderliche tägliche Defizit und damit das Kalorienziel verändern.

Ziel des Features ist, dem Nutzer konkrete **Verhaltens- und Planhebel** zu zeigen, mit denen er seinen Plan beeinflussen kann, statt nur einen statischen Zielwert zu präsentieren.

**Scope:** ausdrücklich **Version 2**, nicht Teil des MVP/V1-Onboardings.

## V2 — flexible Zielplanung mit drei Größen

Version 2 soll die Zielplanung flexibler machen. Die drei zentralen Planungsgrößen sind:

1. **Zielgewicht**
2. **Zieldatum / Zeitraum**
3. **gewünschte tägliche Kalorienaufnahme**

Der Nutzer soll jeweils **zwei dieser drei Größen vorgeben** können. Die App berechnet daraus deterministisch die dritte Größe.

### Modus A — Zielgewicht + Zieldatum

Dies entspricht der bisherigen V1-Logik:

```text
Zielgewicht + Zieldatum
→ erforderliches Defizit
→ tägliches Kalorienziel
```

### Modus B — Kalorienaufnahme + Zielgewicht

Der Nutzer gibt vor, wie viele Kalorien er durchschnittlich pro Tag essen möchte, und welches Zielgewicht er erreichen möchte.

Die App berechnet daraus den voraussichtlichen Zeitraum bzw. das Zieldatum:

```text
tägliche Kalorienaufnahme + Zielgewicht
→ erwartbares tägliches Defizit
→ benötigte Dauer
→ voraussichtliches Zieldatum
```

### Modus C — Kalorienaufnahme + Zieldatum

Der Nutzer gibt seine gewünschte tägliche Kalorienaufnahme und ein Zieldatum vor.

Die App berechnet daraus das modellhaft erreichbare Zielgewicht:

```text
tägliche Kalorienaufnahme + Zieldatum
→ erwartbares Gesamtdefizit
→ modellhaft erreichbarer Gewichtsverlust
→ Zielgewicht zum gewählten Datum
```

Alle drei Modi verwenden dieselbe transparente, deterministische Berechnungsbasis. Die Ergebnisse bleiben Modellschätzungen und unterliegen denselben Plausibilitäts-/Sicherheitsregeln wie die übrige Planungslogik.

Auch diese flexible Drei-Größen-Planung ist ausdrücklich **Version 2** und nicht Teil des MVP/V1-Onboardings.

## Später — Werbung und Feedback-Belohnung

Theo kann in einer späteren Produktstufe Werbung enthalten und einen integrierten Feedback-Kanal anbieten.

Beim **ersten erfolgreich abgegebenen Feedback** erhält der Nutzer **einmalig 24 Stunden Werbefreiheit**. Weitere Feedbacks bleiben möglich, lösen aber keine erneute Belohnung aus. Die Belohnung wird erst nach erfolgreicher Übermittlung aktiviert und muss dauerhaft als bereits genutzt gespeichert werden.

Welche Mindestanforderung ein Feedback erfüllen muss, um die einmalige Belohnung auszulösen, ist noch offen. Ziel ist, bedeutungslose Einträge nur für die Belohnung zu erschweren, ohne ehrliches kurzes Feedback unnötig zu blockieren.

Details und offene technische/produktseitige Fragen stehen in [`ads-and-feedback.md`](ads-and-feedback.md).

## Weitere mögliche Entwicklungen

- adaptive Kalorienziele auf Basis des tatsächlichen Gewichtsverlaufs
- automatische Anpassung des Plans
- Voice Food Tracking
- personalisierte Mahlzeitenvorschläge
- LLM-basierte Ernährungsberatung
- bessere Modellierung von Trainings- und Aktivitätsdaten
- Wenn ein Plan erstellt wurde, gibt die App feedback wie schwer das Ziel gesetzt ist (1kg pro woche abzunehmen benötogt mehr disziplin als 0,2kg). Dann kann die App dem uswr zb so ein Feedback geben: "Dein Ziel ist sehr ambitioniert gesetzt. Bist du Zielstrebig/Diszipliniert genug um den Plan wirklich durchzuziehen? Alternativ schlage ich vor, dass wir deine Ziele nochmal überarbeiten."
