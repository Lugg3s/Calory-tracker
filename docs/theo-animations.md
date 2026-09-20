# Theo — geplante Animationen

**Stand:** 20. September 2026  
**Status:** als Designrichtung festgehalten, **noch nicht implementiert**  
**Entscheidung:** D-048

Der Nutzer möchte die Animationen zunächst nur dokumentiert haben. Diese Spezifikation fügt weder Animationscode noch neue Screens hinzu.

## Grundprinzip

Theo reagiert kurz auf eine Eingabe oder eine bewusst ausgelöste Aktion und wird anschließend wieder ruhig. Animationen unterstützen das Verständnis, ohne Zahlen, Eingabefelder oder Aktionen zu verdrängen.

- Keine dauerhaften Idle-Schleifen oder automatisch aufspringenden Erklärungen.
- Bestehende Regel aus D-045: nur beim ersten Auftreten eine kurze Sprechblase zur antippbaren Hilfe; danach Erklärungen auf Wunsch.
- Die Animation legt keine neue Bildschirmposition für Theo fest; seine endgültige Position bleibt offen.
- Bei aktivierter Systemeinstellung „Bewegung reduzieren“ entfallen Bewegungsanimationen. Inhaltliche Zustände bleiben ohne Bewegung verständlich.
- Keine wertenden Reaktionen auf Gewicht, Körperfett oder niedrigere Kalorienwerte.
- Während schneller Eingaben folgt Theo dem aktuellen Wert, ohne Bewegungen für veraltete Werte abzuarbeiten. Screenwechsel beenden die zugehörige Bewegung.

## Animationen

| Anlass | Geplantes Verhalten | Auslöser und Ende |
| --- | --- | --- |
| **Körpergröße** | Theo wächst bei größerer Eingabe und wird bei kleinerer Eingabe kleiner. Nur die Figur skaliert; die Füße bleiben an derselben Stelle, das restliche Layout bleibt unverändert. Die Skalierung ist begrenzt, damit Theo dezent bleibt. | Während der Größenänderung; nach Loslassen des Pickers sanft zur Ruhe kommen. Die dem Wert entsprechende Größe bleibt bestehen. |
| **Schritte** | Theo geht auf der Stelle. Bei höheren Schrittzahlen wird der Gang etwas flotter. | Reaktion auf die Eingabe; nach Ende der Interaktion stoppt das Gehen. |
| **Trainingshäufigkeit** | Theo macht kleine Übungen. Dezente Punkte neben ihm veranschaulichen die ausgewählten Einheiten. | Kurze Reaktion auf Änderungen, keine dauerhafte Trainingsschleife. |
| **Trainingsdauer** | Theo dreht einen kleinen Timer auf. Ein Bogen wächst oder schrumpft mit der gewählten Dauer. | Bei Änderung der Dauer; danach bleibt der passende Timerzustand ruhig. |
| **Zielzeitraum** | Theo zieht einen kleinen Kalender auseinander oder schiebt ihn zusammen. | Beim Ändern des Zeitraums; mehr Zeit wird räumlich sichtbar, danach Stillstand. |
| **Cheat-Day-Budget** | Theo verschiebt kleine Elemente von sechs Stapeln auf einen siebten. Die Gesamtmenge bleibt gleich; beim Reduzieren erfolgt die Umverteilung entsprechend zurück. | Vorzugsweise in der bewusst geöffneten Erklärung; kurze Darstellung der Umverteilung. Keine zusätzliche permanente Wochenübersicht auf dem Main Screen. |
| **Berechnung öffnen** | Theo zeigt nacheinander auf die eingeblendeten Rechenschritte. | Beim Öffnen beziehungsweise Weitergehen in der Erklärung; jeder Schritt bleibt lesbar, danach Ruhe. |
| **Plan speichern** | Auf Theos Display erscheint kurz ein Häkchen. | Erst nach erfolgreich abgeschlossener Speicherung, nicht bereits beim Antippen des Speicherbuttons. |
| **Gewicht eingeben** | Theo liest eine kleine Waage ab; seine Körperform und emotionale Reaktion ändern sich nicht abhängig vom Gewicht. | Kurze neutrale Reaktion auf die Eingabe. Keine Darstellung „dicker/dünner“ oder „glücklicher/trauriger“. |
| **Spracheingabe — spätere Version** | Eine kleine Wellenform auf Theos Display reagiert während der Aufnahme auf die Stimme. | Nur bei aktiver Aufnahme; stoppt beim Beenden oder Abbrechen. Keine Mikrofonfunktion und kein Voice-Tracking in V1. |

Die Cheat-Day-Animation ist eine Erklärung der vorhandenen Budget-Umverteilung und verändert keine Berechnungsregeln. Die Gewichtsanimation betrifft die Eingabe; sie führt kein Gewichtsverlaufs-Tracking in V1 ein.

## Priorisierung und offene Ausarbeitung

Als erste Kandidaten für die spätere V1-Ausarbeitung wurden **Größe, Schritte und Cheat-Day-Umverteilung** vorgeschlagen. Die übrigen Animationen sind ebenfalls als Ideen festgehalten; daraus folgt keine bereits umgesetzte Funktion.

Noch festzulegen sind Skalierungsgrenzen, Dauer, Bewegungsstärke, genaue Requisiten und Übergänge. Die endgültige Position des Maskottchens sowie das Verhalten auf iOS, Android und Web werden im Feindesign geprüft. Die Voice-Animation gehört ausschließlich zur späteren Tracking-Version.

## Abnahme bei späterer Implementierung

- Die Größenanimation verändert weder die Position der Füße noch das übrige Layout.
- Bewegung endet nach der Interaktion; keine unendlichen Wiederholungen.
- Bei reduzierter Bewegung sind alle Informationen und Bedienfunktionen weiter verfügbar.
- Schnelle Eingabewechsel und Verlassen eines Screens hinterlassen keine laufenden Animationen.
- Gewicht und Körperfett lösen keine wertenden Körper-/Gefühlsänderungen aus.
- Der Speicher-Erfolg erscheint nur nach bestätigter Speicherung.
- In V1 gibt es durch diese Planung keine Sprachaufnahme oder LLM-Abhängigkeit.
