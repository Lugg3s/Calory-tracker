# Entwicklungsstand – 20. September 2026

Erster ausführbarer Entwicklungsstand gemäß `implementation-plan.md`; keine vollständige V1-Abnahme.

## Lokal starten

Node.js mindestens 22.13 (hier: 24.19), npm und ein Checkout dieses Branches:

```sh
npm ci
npm run web
```

Für native Entwicklung: `npm start`, anschließend einen zum Expo-SDK passenden Client/Simulator verwenden. `npm run android` / `npm run ios` öffnen einen eingerichteten Emulator. iOS-Simulator benötigt macOS. Die tatsächliche Geräteprüfung steht aus.

```sh
npm test
npm run typecheck
npm run build:web
```

## Implementiert

- Expo SDK 57, React Native, TypeScript und Expo Router für die gemeinsame Plattformbasis.
- Gast-Onboarding mit optionalem KFA, Zielgewicht/Ziel-KFA, Aktivität, Training, Zeitraum, Cheat Day und Makromodus.
- Unabhängiger Rechenkern mit den dokumentierten Formeln einschließlich TEF, Eingabeprüfung und reproduzierbaren Rundungen. Acht Tests für Referenzrechnung, KFA, Makros, Wochenbudget, Grenzfälle und Kalenderarithmetik.
- Heute mit lokalem Tagesdatum, Tagesziel, optionalen Makros und Cheat-Day-Kennzeichnung. Nur Heute/Profil als Hauptnavigation, keine Wochenübersicht und kein Tracking.
- Profilbearbeitung, manuelles Kalorienziel, lokale Entwürfe, bestätigtes Speichern und unveränderte frühere Planversionen. Löschen mit expliziter Bestätigung.
- Einfacher Code-Maskottchenentwurf: Größenanimation mit festem Fußpunkt, Systempräferenz für reduzierte Bewegung, kontextuelle Hilfe und Frisur ausschließlich auf dem Kategorie-Screen. Das ist noch kein final freigegebenes Animationsasset.

## Arbeitsentscheidungen dieses Entwicklungsstands

- Gastdaten liegen in AsyncStorage, im Web im Browserspeicher. Kein Serverkontakt für Eingaben und keine anonymen Cloud-Konten. Speicherung ist lokal, nicht verschlüsselt; Zurücksetzen entfernt die App-Daten.
- Unterstützter Fall: Erwachsene 18–100 Jahre, 120–230 cm, 35–300 kg, Halten/Abnehmen, 7–730 ganze Tage. Diese technischen Eingabegrenzen sind keine klinische Validierung des Modells.
- Zu niedrige automatisch berechnete Kalorien verhindern das Speichern; manuelle positive Ziele sind mit Warnung zulässig, sofern eine gültige Tages-/Makroverteilung möglich bleibt.
- Niedrige reguläre Tage nach einem Cheat Day zeigen vorerst eine Warnung. Diese offene Produktregel ist damit als vorläufige, sichtbare Entscheidung umgesetzt; nicht als medizinische Freigabe zu verstehen.
- Datumsgültigkeit richtet sich nach dem lokalen Kalendertag einschließlich Reisen. Wochenbudget wird ganzzahlig verteilt; Restkalorien gehen deterministisch an die ersten regulären Wochentage (Sonntag zuerst).
- Planänderungen beginnen heute. Das bisherige Enddatum wird beim Bearbeiten vorgeschlagen, bei weniger als sieben verbleibenden Tagen ein neuer Zeitraum von sieben Tagen. Der Zeitraum ist im Onboarding sichtbar und editierbar.
- Formulare verwenden zunächst zugängliche Zahlenfelder statt der endgültigen Picker. Eine Sportart kann in der Oberfläche gewählt werden; der Rechenkern unterstützt mehrere.

## Noch offen bis V1

- Supabase-Konto, Login/Registrierung, Wiederherstellung, Datenbankschema/RLS, Gastimport, Konfliktbehandlung und geräteübergreifender Zugriff. Im Profil ist der fehlende Kontozugriff klar gekennzeichnet.
- KFA-Bildauswahl nach Content-Freigabe, endgültige Picker und manuelle Makroanpassung.
- Restliche geplante Theo-Animationen und visuelle Abstimmung mit dem ausgewählten Mockup.
- Automatisierte Speicher-/Kontofehlerprüfungen und vollständiger Browser-End-to-End-Test; iOS-/Android-Gerätetests und native Builds.
- Die wissenschaftlichen Modellannahmen und offenen Produktfragen bleiben wie in der bestehenden Dokumentation gekennzeichnet. Tracking, Gewichtskurven und Sprache bleiben spätere Ausbaustufen.

## Prüfprotokoll

- `npm test`: 8 Tests bestanden.
- `npm run typecheck`: bestanden.
- `npm run build:web`: bestanden; sieben statische Routen exportiert.
- Interaktiver Browser-Test nicht ausgeführt: Chromium fehlt in der Umgebung; Installationsversuch scheiterte beim Download/Installer-Lock. Daher ist Gast → Speichern → Neustart noch nicht End-to-End abgenommen.
- Keine iOS-/Android-Geräteprüfung und keine Cloud-Prüfung.

Ein erfolgreicher Web-Export ist keine mobile Abnahme.
