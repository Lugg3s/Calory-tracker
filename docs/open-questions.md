# Offene Fragen

Diese Liste enthält nur noch Punkte, die nach aktuellem Stand nicht entschieden oder nicht ausreichend validiert sind.

## Berechnung

- Wie stark müssen die vorläufigen 8-Stunden-MET-Profile aus `activity-model-v1.md` vor dem Hard-Coding weiter kalibriert werden?
- Wie soll allgemeines NEAT außerhalb des 8-Stunden-Alltagsprofils berücksichtigt werden, damit besonders niedrige Aktivitätsstufen nicht systematisch unterschätzt werden?
- Wie wird bei körperlichen Berufen zuverlässig verhindert, dass Aktivität über MET-Profil und Schritte doppelt gezählt wird?
- Soll `0,414 × Körpergröße` als Fallback für die Schrittlänge bestehen bleiben oder durch eine besser validierte Schätzung ersetzt werden?
- Wie werden gemessene Distanzdaten aus Smartphone/Health/Wearables priorisiert und in das Schrittmodell übernommen?
- Welche Standard-MET-Werte verwenden wir für die einzelnen Trainingsarten?
- Wie werden unterschiedliche Trainingsintensitäten modelliert, ohne das initiale Onboarding unnötig zu verlängern?
- Wie wird mit stark variierender Trainingsdauer oder sehr unregelmäßigem Training umgegangen?
- Wann sollen sportartspezifische Modelle, z. B. Pace/Distanz beim Laufen oder Watt beim Radfahren, den generischen MET-Ansatz ersetzen?
- Soll TEF später im erweiterten Modus makronährstoffabhängig statt pauschal mit 10 % berechnet werden?
- Wann soll ein bestehender Plan neu berechnet werden, wenn der Nutzer später ein neues aktuelles Gewicht eingibt?
- Soll nach dem MVP ein dynamisches/adaptives Gewichtsverlaufsmodell ergänzt werden, das sinkenden Energiebedarf, metabolische Anpassungen und veränderte Körperzusammensetzung berücksichtigt?
- Wie wissenschaftlich belastbar ist die Annahme konstanter fettfreier Masse für die Ableitung eines Zielgewichts aus aktuellem KFA und Ziel-KFA, und wie soll das Modell gegebenenfalls verbessert werden?
- Wie gehen wir damit um, dass sich fettfreie Masse während einer Gewichtsabnahme verändern kann?
- Wie soll mit mehreren flexiblen Tagen pro Woche in der UX umgegangen werden, obwohl die Berechnungsformel bereits mehrere Tage unterstützt?

## Wissenschaft

- Welche Literatur und Einschränkungen sollen in der Entwicklerdokumentation zur gewählten V1-Modellannahme von 7.700 kcal pro kg Gewichtsverlust festgehalten werden?
- Wie soll das gesamte Erhaltungsbedarfsmodell später gegen reale Gewichts-/Energieverlaufsdaten kalibriert und validiert werden?
- Muss die maintenance-relative Obergrenze von 25 % reduzierter Kalorienaufnahme für bestimmte Zielgruppen angepasst werden?
- Müssen die vorläufigen automatischen Kalorien-Untergrenzen von 1.200 kcal/Tag für die weibliche und 1.500 kcal/Tag für die männliche Gleichungskategorie für bestimmte Zielgruppen angepasst werden?
- Welche Sonderregeln brauchen wir für Nutzergruppen, für die eine allgemeine selbstgesteuerte Gewichtsverlustplanung nicht geeignet ist?
- Welche Ziel-KFA-Bereiche sind für unterschiedliche Nutzergruppen sinnvoll bzw. sicher, und ab welchen Werten muss die App warnen oder Ziele ablehnen?
- Soll die V1-Proteinregel von 1,4 bzw. 2,0 g/kg später für unterschiedliche Sportarten, Trainingsvolumen, Energiedefizite oder Altersgruppen differenziert werden?
- Ab welchem Körpergewicht/KFA wäre eine spätere Bezugsgewichtsregel für Protein sinnvoller als die aktuelle V1-Regel mit tatsächlichem Körpergewicht?
- Soll der 30-%-Fettanteil später abhängig von Präferenzen, Kalorienhöhe oder individuellen Ernährungszielen flexibilisiert werden?
- Braucht die App später explizite Mindest- oder Zielwerte für Kohlenhydrate bei bestimmten Sportarten/Trainingsumfängen?

## Produkt / UX

- Wie detailliert soll die Berechnung standardmäßig sichtbar sein?
- Welche Werte dürfen Nutzer manuell überschreiben?
- Wie soll die App mit manuellen Kalorienwerten umgehen, die unter den automatischen Planungsgrenzen liegen?
- Wie werden allgemeine Schätzungen und Unsicherheit dargestellt, ohne jede interne Modellunsicherheit separat im UI auszuweisen?
- Wie genau soll der einfache vs. erweiterte Tracking-Modus aussehen?
- Wie genau soll die Zieldefinition dargestellt werden, wenn ein aktueller KFA vorhanden ist: Zielgewicht direkt eingeben oder Ziel-KFA auswählen und daraus das Zielgewicht ableiten?
- Soll der aus Ziel-KFA berechnete Zielgewichtswert dem Nutzer vor der Planerstellung noch einmal ausdrücklich zur Bestätigung gezeigt werden?
- Wie zeigen wir dem Nutzer nach Auswahl eines Ziel-KFA verständlich, dass das daraus berechnete Zielgewicht und die notwendige Gewichtsabnahme nur Modellschätzungen sind?
- Wie genau soll der flexible-Tag-/höheres-Tagesbudget-Screen im Onboarding aussehen?
- Wie wählt der Nutzer den Wochentag und die Höhe des flexiblen Tagesbudgets zwischen normalem Tagesziel und Erhaltungsbedarf aus?
- Soll die App statt „Cheat Day“ eine neutralere Bezeichnung wie „flexibler Tag“, „Maintenance Day“ oder „höheres Tagesbudget“ verwenden?
- Wie sollen manuell geänderte Makroziele dargestellt werden und wie verhält sich die App, wenn sie rechnerisch nicht mehr exakt zum Kalorienziel passen?
- Wie genau wird aus Größe und Gewicht die interne Körperform-/Referenzkategorie für KFA-Vergleichsbilder abgeleitet?
- Wie viele Körperform-/Referenzkategorien brauchen wir?
- Welche Grenzwerte sollen diese Kategorien haben, insbesondere bei sehr muskulösen oder atypischen Körperzusammensetzungen?
- Welche KFA-Spanne soll die Referenzbibliothek abdecken und bleiben 5-Prozentpunkt-Schritte als visuelle Anker geeignet?
- Reicht eine Frontansicht pro Referenzkombination oder brauchen wir zusätzliche Ansichten?

## Food Tracking

- Welche Lebensmittel-Datenbank verwenden wir?
- Wie werden Portionsgrößen geschätzt?
- Wie werden unbekannte Mengen behandelt?
- Welche Funktionen sind ohne LLM sinnvoll?

## AI

- Welches LLM?
- Welcher Speech-to-Text-Dienst?
- Welche strukturierte Schnittstelle zwischen LLM und Ernährungsdatenbank?
- Wie werden Halluzinationen bzw. falsche Nährwertangaben verhindert?
- Welche Daten dürfen an externe Modelle übertragen werden?

## Tech Stack

- Frontend / Mobile Framework
- Backend
- Datenbank
- Authentifizierung
- Hosting
- Analytics
- KI-Infrastruktur
