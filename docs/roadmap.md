# Roadmap

## Phase 1 – Konzept & Grundlagen

- [x] Produktidee definieren
- [x] MVP-Funktionsumfang grob definieren
- [x] V1-Berechnungsarchitektur festlegen
- [x] RMR-, Aktivitäts-, Schritt-, Trainings-, TEF-, Defizit- und Wochenbudget-Logik dokumentieren
- [x] V1-Training-MET-Defaults festlegen
- [x] manuelle Rechenbeispiele für die aktuelle V1-Logik dokumentieren
- [ ] wissenschaftliche End-to-End-Validierung / Kalibrierung der Modellannahmen durchführen
- [ ] 7.700-kcal/kg-Annahme und Guardrails fachlich weiter dokumentieren/validieren
- [ ] Doppelzählung Alltagsschritte vs. Alltags-MET technisch sauber lösen bzw. kalibrieren
- [x] Tech Stack: Expo + React Native + TypeScript, Expo Router, Supabase Auth + PostgreSQL für iOS, Android und Web (D-046)
- [x] Lokalen Gastmodus mit optionaler Kontospeicherung festlegen (D-047)

## Phase 2 – Marke / UX / Design

- [x] Produktnamen festlegen: **Theo**, abgeleitet von **Theory** (D-044, 19. September 2026); ersetzt den Arbeitsnamen `Calory Tracker`
- [ ] **Theo** auf App-Store-, Domain- und Markenüberschneidungen prüfen
- [ ] visuelle Markenrichtung und Logo auf Basis des finalen Namens entwickeln
- [ ] Wireframes erstellen
- [ ] Wireframes mit Figma / Uizard / Motif bzw. geeignetem Tool iterieren
- [x] grundlegenden 18-Screen-Onboarding-Flow definieren
- [x] Cheat-Day-/Wochenbudget-Interaktionslogik definieren
- [x] Cheat-Day-Vertical-Wheel-/Number-Picker als V1-Richtung festlegen
- [ ] Verhalten festlegen/implementieren, wenn ein hoher Cheat Day die übrigen sechs Tage unter automatische Guardrails drückt (Blockierung vs. Warnung vs. weiche Empfehlung)
- [ ] finale Cheat-Day-Microcopy und Lebensmittel-/Portionsbeispiele definieren
- [x] Verständlichkeitsregel für Berechnungsansicht festlegen: auch für Siebtklässler nachvollziehbar
- [ ] konkrete visuelle Berechnungsansicht definieren/implementieren
- [ ] Main Screen definieren
- [x] Theo-Animationsideen dokumentieren, Umsetzung ausdrücklich vertagt (D-048)
- [ ] Theo-Animationen später ausarbeiten: zuerst Größe, Schritte und Cheat-Day-Erklärung prüfen; Details in `theo-animations.md`

## Phase 2b – KFA-Referenzbibliothek

- [x] Bibliotheksstruktur definieren: 2 Bildkategorien × 5 Buckets × 8 KFA-Anker = 80 Bilder
- [x] geschlechtsspezifische KFA-Anker festlegen: Männer 10–45 %, Frauen 15–50 %
- [x] Bucket-3-Pilotserie mit 16 Bildern im Repo ablegen
- [ ] Pilotserie fachlich/visuell kalibrieren; insbesondere markierte enge Stufenabstände prüfen
- [ ] problematische Pilotbilder neu generieren
- [ ] finalen Character-/Prompt-/Reference-Workflow einfrieren
- [ ] Bucket 1, 2, 4 und 5 produzieren
- [ ] vollständige 80-Bilder-Bibliothek QAen und freigeben
- [ ] Hauttöne/Diversitätsstrategie finalisieren

## Phase 3 – MVP-Entwicklung

- [ ] Expo-Projekt für iOS, Android und Web einrichten
- [ ] Technischen Prüfpfad umsetzen: Cheat-Day-Picker, Theo-Hilfe/Animation, Gastplan → Registrierung → Speicherung
- [ ] Unabhängiges TypeScript-Berechnungsmodul mit Tests gegen dokumentierte Beispiele
- [ ] Lokalen Gastmodus ohne Serverkonto implementieren
- [ ] Supabase Auth, Datenbankschema und getestete nutzerbezogene Zugriffsregeln einrichten
- [ ] Registrierung mit Übernahme von Gasteingaben und Plan
- [ ] Speicherung, geräteübergreifenden Zugriff und Konfliktbehandlung implementieren

- [ ] User Input
- [ ] Kalorienberechnung
- [ ] nachvollziehbare Berechnungsansicht
- [ ] Zielgewicht + Zeitraum
- [ ] Defizitberechnung
- [ ] Aktivitäts-/Trainingskomponenten
- [ ] optionaler KFA + Referenzbilder
- [ ] Tracking-Modus Kalorien-only / Makros
- [ ] Protein-/Makroziele
- [ ] Cheat-Day-/Wochenbudget-Logik
- [ ] manuelle Anpassung des Kalorienziels in Einstellungen
- [ ] manuelle Makro-Overrides inklusive sichtbarer Abweichung ohne Zwangskorrektur
- [ ] Kennzeichnung / nicht blockierende Plausibilitätseinordnung für aggressive manuelle Kalorien-Overrides

## Phase 4 – Food Tracking

- [ ] deterministische Lebensmittel-/Nährwertlogik
- [ ] einfache Mahlzeiteneingabe
- [ ] Tagesübersicht
- [ ] Vorschläge für verbleibendes Kalorienbudget

## Phase 5 – AI / Voice

- [ ] Speech-to-Text
- [ ] strukturierte Mahlzeitenerkennung
- [ ] LLM-Integration
- [ ] Unsicherheitsbehandlung
- [ ] Alternativvorschläge
- [ ] personalisierte Empfehlungen

## Phase 6 – Version 2 / Zukunft

- [ ] interaktiven Plan-Anpassungs-/Was-wäre-wenn-Screen nach der Ergebnisanzeige entwickeln
- [ ] direkte Deltawerte für Verhaltensänderungen anzeigen, z. B. `+1.000 Schritte/Tag → +XX kcal/Tag`
- [ ] Schritte, Sporthäufigkeit, Sportart und Trainingsdauer als veränderbare Planhebel simulieren
- [ ] Zieldatum im Was-wäre-wenn-Screen variierbar machen und Auswirkung auf Defizit/Kalorienziel live anzeigen
- [ ] Änderungen mit derselben deterministischen V1/V2-Berechnungslogik live neu bewerten; statische Körperdaten bleiben in diesem Screen unverändert
- [ ] flexible Zielplanung mit drei Größen umsetzen: Zielgewicht, Zieldatum/Zeitraum, tägliche Kalorienaufnahme
- [ ] Modus A: Zielgewicht + Zieldatum → tägliches Kalorienziel berechnen
- [ ] Modus B: tägliche Kalorienaufnahme + Zielgewicht → benötigte Dauer / Zieldatum berechnen
- [ ] Modus C: tägliche Kalorienaufnahme + Zieldatum → modellhaft erreichbares Zielgewicht berechnen
- [ ] adaptive Ziel-/Kalorienanpassung aus tatsächlichem Gewichtsverlauf
- [ ] weitergehende Personalisierung
- [ ] optional zusätzliche KFA-Seiten-/Rückansichten
- [ ] spätere Körper-/Zielvisualisierungen klar getrennt von KFA-Messung
