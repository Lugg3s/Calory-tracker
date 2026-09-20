# Gastmodus und Konten

**Status:** entschieden, noch nicht implementiert  
**Entscheidung:** D-047 · 20. September 2026

## Nutzerfluss

Theo bietet auf iOS, Android und Web Konten sowie einen Gastmodus für eine schnelle Berechnung.

1. „Plan erstellen“ ohne Login-Pflicht starten.
2. Die relevanten Schritte des bestehenden 18-Screen-Onboardings durchlaufen.
3. Ergebnis und optionale Berechnungsdetails ohne Registrierung ansehen.
4. Optional **„Plan im Konto speichern“** wählen.
5. Registrieren und vorhandene Gasteingaben sowie den Plan ins neue Konto übernehmen, ohne Angaben erneut einzugeben.
6. Nach Anmeldung auch auf anderen Geräten auf den gespeicherten Plan zugreifen.

Anmeldung, Registrierung und Speicherstatus sind ergänzende Kontoflüsse, keine Pflichtschritte vor der ersten Berechnung. Bestehende Nutzer können sich anmelden.

## Datenverhalten

- Eingaben und Berechnung bleiben im Gastmodus lokal.
- Kein automatisch angelegtes anonymes Supabase-Konto.
- Keine Übertragung der Körper-/Aktivitätsdaten ans Backend für die reine Gastberechnung.
- Die Berechnungslogik ist unabhängig vom Kontostatus.
- Eine Übernahme in das Konto erfolgt nach bewusst gewählter Kontospeicherung.
- Abgebrochene oder fehlgeschlagene Registrierung darf den aktuellen Gastplan nicht verwerfen.
- Bei fehlgeschlagenem Speichern muss erneutes Speichern möglich bleiben; Erfolg erst nach bestätigter Speicherung anzeigen.
- Ohne Konto gibt es keine automatische geräteübergreifende Verfügbarkeit.

## Noch offene Details

Lokale Speicherung und Lebensdauer über Neustarts/Neuladen hinweg, konkrete Login-Verfahren, Kontowiederherstellung sowie Synchronisierungskonflikte sind noch festzulegen. Dauerhafte Gastdatenspeicherung ist daher noch nicht zugesagt.

Wenn ein Gastplan beim Login auf einen bestehenden Kontoplan trifft, ist die Übernahme-/Konflikt-UX offen; bestehende Pläne nicht unbemerkt überschreiben.

Die vorhandenen Designbilder sind um diese Kontoflüsse noch nicht ergänzt. Im UI-Feindesign sind Anmeldung, Registrierung, Speicherbestätigung/-fehler und der Umgang mit einem bestehenden Kontoplan zu berücksichtigen.

Technische Grundlage: [Tech Stack](tech-stack.md).
