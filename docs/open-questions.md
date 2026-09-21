# Offene Fragen

Diese Liste enthält nur noch Punkte, die nach aktuellem Stand nicht entschieden oder nicht ausreichend validiert sind.

## Berechnung

- **Offen – Kalorienuntergrenze überarbeiten (Nutzerfeedback, 21. September 2026):** Die aktuelle Kalorienuntergrenze passt noch nicht. Die zugrunde liegende Regel und ihr Verhalten bei der Planberechnung müssen erneut geprüft und gemeinsam festgelegt werden. Noch keine neue Untergrenze beschlossen; dieser Eintrag dokumentiert den offenen Überarbeitungsbedarf.
- Wie stark müssen die fünf 8-Stunden-MET-Profile aus `activity-model-v1.md` vor bzw. nach der ersten Implementierung gegen reale Daten kalibriert werden?
- Wie soll allgemeines NEAT außerhalb des 8-Stunden-Alltagsprofils in einer späteren Version besser berücksichtigt werden? V1 ergänzt bewusst **keinen** pauschalen NEAT-Korrekturfaktor.
- Wie wird bei körperlichen Berufen technisch zuverlässig verhindert bzw. reduziert, dass Aktivität über MET-Profil und Schritte doppelt gezählt wird?
- Soll `0,414 × Körpergröße` als Fallback für die Schrittlänge bestehen bleiben oder durch eine besser validierte Schätzung ersetzt werden?
- Wie werden gemessene Distanzdaten aus Smartphone/Health/Wearables priorisiert und in das Schrittmodell übernommen?
- Wie werden unterschiedliche Trainingsintensitäten später modelliert, ohne das initiale Onboarding unnötig zu verlängern?
- Wie wird mit stark variierender Trainingsdauer oder sehr unregelmäßigem Training umgegangen?
- Wann sollen sportartspezifische Modelle, z. B. Pace/Distanz beim Laufen oder Watt beim Radfahren, die aktuellen V1-Standard-MET-Werte ersetzen?
- Soll Zumba/Dance-Fitness später eine eigene Trainingskategorie erhalten statt vorläufig als `Sonstiger Sport = 5,0 MET` behandelt zu werden?
- Soll TEF später im erweiterten Modus makronährstoffabhängig statt pauschal mit 10 % berechnet werden?
- Wann soll ein bestehender Plan neu berechnet werden, wenn der Nutzer später ein neues aktuelles Gewicht eingibt?
- Soll nach dem MVP ein dynamisches/adaptives Gewichtsverlaufsmodell ergänzt werden, das sinkenden Energiebedarf, metabolische Anpassungen und veränderte Körperzusammensetzung berücksichtigt?
- Wie wissenschaftlich belastbar ist die Annahme konstanter fettfreier Masse für die Ableitung eines Zielgewichts aus aktuellem KFA und Ziel-KFA, und wie soll das Modell gegebenenfalls verbessert werden?
- Wie gehen wir damit um, dass sich fettfreie Masse während einer Gewichtsabnahme verändern kann?

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

- Wie genau soll der einfache vs. erweiterte Tracking-Modus visuell aussehen?
- Wie genau soll die Zieldefinition dargestellt werden, wenn ein aktueller KFA vorhanden ist: Zielgewicht direkt eingeben oder Ziel-KFA auswählen und daraus das Zielgewicht ableiten?
- Soll der aus Ziel-KFA berechnete Zielgewichtswert dem Nutzer vor der Planerstellung noch einmal ausdrücklich zur Bestätigung gezeigt werden?
- Wie zeigen wir dem Nutzer nach Auswahl eines Ziel-KFA verständlich, dass das daraus berechnete Zielgewicht und die notwendige Gewichtsabnahme nur Modellschätzungen sind?
- Welche konkrete Microcopy verwenden wir für die Frage und Hinweise auf dem Cheat-Day-Screen?
- Welche konkreten Lebensmittel, Portionsgrößen und Kalorienbereiche werden im optionalen Cheat-Day-Info-Bereich gezeigt?
- Wenn ein Cheat Day die übrigen sechs Tage unter automatische Planungs-Guardrails drückt: soll die App die Auswahl hart begrenzen, eine nicht blockierende Warnung zeigen oder nur eine weiche Empfehlung aussprechen? Diese Entscheidung ist bewusst an die Implementierungsphase delegiert.
- Wie genau soll die bevorzugte nicht blockierende Warnung bei **direkt manuell** gesetzten Kalorienwerten unter dem automatischen Guardrail formuliert und dargestellt werden?
- Wie wird eine kcal-Abweichung zwischen manuell geänderten Makros und Kalorienziel am verständlichsten dargestellt, ohne automatische Korrektur zu erzwingen?
- Das exakte Layout der Berechnungserklärung ist offen. Fest ist nur die Verständlichkeitsregel: schrittweise, normale Sprache, auch für einen Siebtklässler nachvollziehbar.

## Marke / Positionierung

Der Produktname ist entschieden: **Theo**, abgeleitet von **Theory** (D-044, 19. September 2026). Er ersetzt den bisherigen Arbeitsnamen **Calory Tracker**.

Offen bleiben:

- Prüfung von **Theo** auf App-Store-, Domain- und Markenüberschneidungen; die Namensentscheidung bestätigt noch keine Verfügbarkeit.
- Finale visuelle Markenrichtung, Wortmarke und Logo auf Basis von **Theo**.

## KFA-Referenzbilder

Die V1-Struktur ist entschieden: 80 Bilder, 2 Geschlechts-/biologische Bildkategorien, 5 BMI-basierte interne Körperform-Buckets, 8 KFA-Anker pro Geschlecht und eine Frontansicht pro Kombination.

Aktuelle Anker:

```text
männlich: 10 %, 15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %
weiblich: 15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %, 50 %
```

Die Bucket-3-Pilotserie mit 16 Bildern ist bereits im Repo abgelegt. Details stehen in `kfa-reference-images-v1.md` und `assets/kfa-reference-images/README.md`.

Offen bleiben:

- Wie wird die visuelle KFA-Plausibilität vor Veröffentlichung fachlich/qualitativ kalibriert und validiert?
- Welche der aktuell markierten Pilotstufen müssen wegen zu kleiner Abstände oder Character-/Pose-Drift neu generiert werden?
- Welche Hauttöne und Diversitätsstrategie soll die finale 80-Bilder-Bibliothek verwenden?
- Wie wird `bucket-3` technisch eindeutig auf die A–E-Bucket-Nomenklatur gemappt?
- Sollen spätere Versionen Seiten- oder Rückansichten ergänzen?

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

## Technik und Konten — verbleibende Details

Entschieden (D-046): **Expo + React Native + TypeScript**, **Expo Router**, **Supabase Auth + PostgreSQL** für **iOS, Android und Web**. Auch der lokale Gastmodus mit optionaler Kontospeicherung ist entschieden (D-047). Siehe [Tech Stack](tech-stack.md) und [Gastmodus](guest-mode.md).

Offen bleiben:

- konkrete Paketversionen sowie Animations-, Formular- und Testbibliotheken;
- lokale Speichertechnik und Lebensdauer von Gastdaten;
- konkrete Login-Verfahren, Anbieter und Kontowiederherstellung;
- Datenbankschema, Synchronisierung und Konfliktbehandlung;
- Übernahme eines Gastplans bei Anmeldung an einem Konto mit vorhandenem Plan;
- Web-Hosting, Build-/Release-Prozess, Betriebsregion und Web-Offline-Caching;
- Analytics;
- spätere KI-Infrastruktur.
