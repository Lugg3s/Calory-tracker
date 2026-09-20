# Tech Stack

**Status:** entschieden für die erste Implementierung, noch nicht implementiert  
**Entscheidung:** D-046 · 20. September 2026

## Plattformen und Technologien

Theo wird für **iOS, Android und Web** entwickelt.

| Bereich | Entscheidung |
| --- | --- |
| App | Expo + React Native |
| Sprache | TypeScript |
| Web | Expo mit React Native Web |
| Navigation | Expo Router |
| Gestaltung | Kleine eigene Komponentenbibliothek für Nocturne |
| Berechnung | Unabhängiges, deterministisches TypeScript-Modul |
| Konten | Supabase Auth |
| Datenbank | PostgreSQL über Supabase |
| Backend | Supabase für Konten und gespeicherte Daten; zunächst kein zusätzliches eigenes API-Backend |

Gemeinsamer Code wird soweit sinnvoll verwendet. Zahlenpicker, Tastaturverhalten, Navigation und Geräteschnittstellen können plattformspezifische Anpassungen benötigen.

## Architektur

Die Berechnung läuft lokal und unabhängig von UI, Anmeldung und Supabase. Formeln werden nicht in einzelnen Screens dupliziert. Dieselbe Rechenlogik gilt auf allen Plattformen. Tests prüfen dokumentierte Rechenbeispiele, Grenzfälle, Rundung und Wochenbudget-Umverteilung; sie ersetzen keine wissenschaftliche Validierung der Produktannahmen.

Supabase Auth übernimmt Konten. PostgreSQL speichert kontogebundene Eingaben und Pläne für geräteübergreifenden Zugriff. Nutzerbezogene Row-Level-Security-Regeln müssen implementiert und getestet werden; privilegierte Schlüssel gehören nicht in die App. Synchronisierung und Konfliktbehandlung entstehen nicht automatisch durch die Wahl von Supabase.

Der [Gastmodus](guest-mode.md) benötigt weder Registrierung noch automatisch erzeugtes anonymes Serverkonto. Körper-/Aktivitätsdaten einer reinen Gastberechnung werden nicht an das Backend übertragen. Die Berechnung selbst benötigt keinen Serveraufruf. Vollständige Offline-Verfügbarkeit der Web-App einschließlich erstmaligem Laden ist damit nicht zugesagt und erfordert gesonderte Cache-/PWA-Planung.

## Entwicklung und erste technische Prüfung

Der Code soll überwiegend KI-gestützt entwickelt werden. Klare Modulgrenzen, TypeScript-Prüfungen, wenige bewusst gewählte Bibliotheken und automatisierte Berechnungstests unterstützen die Überprüfung.

Erster technischer Prüfpfad, noch nicht durchgeführt:

1. Cheat-Day-Picker mit Live-Umverteilung.
2. Theo-Hilfe mit einmaliger Einführung und Animation.
3. Gastplan → Registrierung → Übernahme und Speicherung.
4. Prüfung auf iOS, Android und im Browser.

## Offene Details

- kompatible Paketversionen und weitere Bibliotheken für Animationen, Formulare und Tests;
- lokale Speichertechnik und Lebensdauer von Gastdaten;
- Login-Verfahren und Anbieter;
- Datenbankschema, Synchronisierung und Konfliktregeln;
- Web-Hosting, Build-/Release-Prozess und Betriebsregion;
- Analytics und spätere KI-Infrastruktur.

Flutter/Capacitor und Firebase/eigenes Backend wurden als Alternativen besprochen. Gewählt ist der oben dokumentierte Stack; diese Entscheidung bedeutet noch keine abgeschlossene Implementierung.
