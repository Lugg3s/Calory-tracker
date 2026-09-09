# App Flow

## Ziel

Der erste Produkt-Flow soll den Nutzer schnell von der ersten App-Öffnung zu einem verständlichen Abnehmplan führen. UX-Ziel: ungefähr zwei Minuten, mit einem Eingabeparameter pro Screen und optionalen Erklärungen nur auf Wunsch.

## MVP-Onboarding-Flow

### Screen 1 — Start

Kurze Einführung, primäre Aktion z. B. **„Plan erstellen“**.

### Screen 2 — Geschlecht / biologische Kategorie

Für die gewählte RMR-Gleichung relevante Kategorie.

### Screen 3 — Alter

Alter.

### Screen 4 — Größe

Körpergröße.

### Screen 5 — Aktuelles Gewicht

Aktuelles Körpergewicht.

### Screen 6 — Aktueller KFA

Optional. Kann übersprungen werden.

Auf Wunsch kann der Nutzer Referenzbilder öffnen. Die Bilder werden vorab generiert und anhand von Geschlecht/biologischer Kategorie, einer intern aus Größe und Gewicht abgeleiteten Referenzkategorie und KFA-Stufe ausgewählt.

Bildstufen, z. B. in 5-Prozentpunkt-Abständen, sind nur visuelle Anker. Der Nutzer kann numerisch Zwischenwerte eingeben; die Berechnung verwendet den exakten Wert.

Ein visuell geschätzter KFA darf für Cunningham verwendet werden. Die zusätzliche Unsicherheit wird intern dokumentiert und braucht keine gesonderte User-Warnung nur wegen der Schätzmethode.

### Screen 7 — Alltagstyp

Der Nutzer wählt einen groben Alltagstyp.

Für V1 wird diese eine Auswahl intern auf ein vorläufiges 8-Stunden-MET-Profil gemappt. Der Nutzer muss nicht einzelne Stunden für Sitzen, Stehen, Heben usw. angeben. Die aktuelle Arbeitslogik steht in [`activity-model-v1.md`](activity-model-v1.md).

Schritte werden separat berechnet und dürfen nicht vollständig noch einmal im Alltags-MET-Modell gezählt werden.

### Screen 8 — Schritte

Durchschnittliche tägliche Schritte.

### Screen 9 — Sporthäufigkeit

Trainings-/Sporthäufigkeit.

### Screen 10 — Trainingsart

Nur wenn regelmäßiges Training angegeben wurde.

### Screen 11 — Typische Trainingsdauer

Nur wenn regelmäßiges Training angegeben wurde. Die Dauer wird benötigt, weil V1 Training aus MET, Körpergewicht und Zeit berechnet.

Eine separate Intensitätsfrage ist im initialen Onboarding nicht zwingend.

### Screen 12 — Zieldefinition

Der Plan arbeitet downstream immer mit einem Zielgewicht.

- ohne aktuellen KFA: Zielgewicht direkt
- mit aktuellem KFA: Zielgewicht direkt oder Ziel-KFA zur Ableitung des Zielgewichts

### Screen 13 — Zielwert / abgeleitetes Zielgewicht

Bei Ziel-KFA:

```text
fettfreie Masse = aktuelles Gewicht × (1 - aktueller KFA)
Zielgewicht = fettfreie Masse ÷ (1 - Ziel-KFA)
notwendige Gewichtsabnahme = aktuelles Gewicht - Zielgewicht
```

Auch der Ziel-KFA kann numerisch zwischen visuellen Bildankern fein angepasst werden.

### Screen 14 — Zeitraum

Gewünschter Zeitraum bis zum Ziel.

### Screen 15 — Flexibler Tag / höheres Tagesbudget

Die Berechnungslogik ist festgelegt, die genaue UX noch nicht.

```text
Wochenbudget W = durchschnittliches Tagesziel C × 7
```

Ein höherer Tag wird **innerhalb** desselben Wochenbudgets finanziert und nicht zusätzlich aufgeschlagen.

Für einen flexiblen Tag mit Budget `H`:

```text
normale Tagesbudgets L = (W - H) / 6
```

Automatische V1-Regeln:

- `H` maximal bis zum geschätzten Erhaltungsbedarf;
- kein automatisch geplanter Überschuss;
- die übrigen Tage müssen die automatischen Planungsgrenzen einhalten;
- wenn nicht, wird `H` reduziert oder ein längerer Zielzeitraum vorgeschlagen.

Offen bleiben insbesondere: Bezeichnung, Wochentags-Control, Budget-Control und UX für mehrere flexible Tage.

### Screen 16 — Tracking-Modus

- nur Kalorien
- Kalorien + Makronährstoffe

### Screen 17 — Plan-Ergebnis

Mindestens anzeigen:

- durchschnittliches Tagesziel
- ggf. Wochenverteilung mit flexiblem Tag
- geschätzten Erhaltungsbedarf
- geplantes durchschnittliches Defizit
- Zielgewicht
- ggf. Ziel-KFA und daraus abgeleitete notwendige Gewichtsabnahme
- kurze Einschätzung des Plans
- Zugang zur detaillierten Berechnung

## Nach dem Onboarding

Zusätzliche Komplexität wird nachgelagert angeboten, z. B. über **„Plan verfeinern“**, Berechnungsdetails oder Einstellungen:

- Formeln und Erklärungen
- zusätzliche Aktivitäts-/Trainingsdetails
- genauere Trainingsintensität
- manuelle Anpassung des Kalorienziels
- manuelle Makroanpassung
- weitere Personalisierung

## Status

Festgelegt sind der grundsätzliche 17-Screen-Flow, das Prinzip „ein Parameter pro Screen“, die bedingte Trainingsdauer, die KFA-Zielgewichtslogik und die Wochenbudget-/Flex-Day-Berechnungsrichtung.

Noch offen sind vor allem konkrete Controls/Microcopy, MET-Feinkalibrierung, KFA-Referenzbibliothek und die genaue UX des flexiblen Tages.
