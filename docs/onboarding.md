# Onboarding

## Ziel des Onboardings

Das Onboarding sammelt nur Informationen, die für Berechnung oder Personalisierung relevant sind. Der erste Durchlauf soll ungefähr in zwei Minuten machbar sein und visuell minimalistisch bleiben.

## UX-Prinzipien

- pro Eingabe-Screen grundsätzlich **ein Parameter**
- kurze, eindeutige Fragen
- Erklärungen nur auf Wunsch einblenden
- komplexere Formeln und Details erst nach dem ersten Plan

Jeder relevante Screen kann eine kleine optionale Erklärung enthalten: warum die Angabe benötigt wird und was sie beeinflusst.

## Vorgesehene Angaben

### Körperdaten

- Alter
- Geschlecht / biologische Kategorie für die gewählte RMR-Gleichung
- Größe
- aktuelles Gewicht
- optional aktueller KFA

### Aktivität

- Alltagstyp
- durchschnittliche Schritte pro Tag
- Trainingshäufigkeit
- Trainingsart
- typische Trainingsdauer pro Einheit, wenn Training angegeben wird

Die Alltagskomponente wird MET-basiert modelliert. Für V1 soll der Nutzer **keine einzelnen Stunden für Sitzen, Stehen, Heben usw. eingeben müssen**. Stattdessen wird die Auswahl eines groben Alltagstyps intern auf ein vorläufiges 8-Stunden-MET-Referenzprofil gemappt. Die aktuell verwendeten Profile und bekannten Grenzen stehen in [`activity-model-v1.md`](activity-model-v1.md).

Die bereits abgefragte **Sporthäufigkeit** wird zusätzlich für die Makroberechnung verwendet:

```text
< 3 Sporteinheiten/Woche  → 1,4 g Protein/kg aktuelles Körpergewicht
>= 3 Sporteinheiten/Woche → 2,0 g Protein/kg aktuelles Körpergewicht
```

Für diese V1-Grenze zählt jede regelmäßige Sportart. Eine zusätzliche Onboarding-Frage nach **Muskelaufbau, Muskelerhalt oder einem vergleichbaren Muskelziel** wird für den ersten MVP nicht ergänzt.

### Ziel

Der Plan arbeitet letztlich immer mit einem **Zielgewicht**.

Ohne aktuellen KFA:

- Zielgewicht direkt eingeben.

Mit aktuellem KFA:

- Zielgewicht direkt eingeben; oder
- Ziel-KFA wählen und daraus ein Modell-Zielgewicht ableiten.

```text
fettfreie Masse = aktuelles Gewicht × (1 - aktueller KFA)
Zielgewicht = fettfreie Masse ÷ (1 - Ziel-KFA)
```

Ein Ziel-KFA wird nur angeboten, wenn ein aktueller KFA vorhanden ist.

### Wochenbudget / flexibler Tag

Im Onboarding ist ein eigener Screen für einen geplanten **Cheat Day / flexiblen Tag / Tag mit höherem Kalorienbudget** vorgesehen.

Die Berechnungsrichtung ist entschieden:

```text
Wochenbudget W = durchschnittliches Tagesziel C × 7
```

Ein höherer Tag erhöht das Wochenbudget **nicht**, sondern verteilt dieselben Wochenkalorien anders.

Für einen flexiblen Tag mit Budget `H`:

```text
normale Tage L = (W - H) / 6
```

Für die automatische V1-Planung gilt:

- flexibler Tag maximal bis zum geschätzten Erhaltungsbedarf;
- kein automatisch geplanter Kalorienüberschuss;
- die übrigen Tage müssen weiterhin die automatischen Planungsgrenzen einhalten;
- andernfalls wird der flexible Tag reduziert oder ein längerer Zielzeitraum vorgeschlagen.

Im erweiterten Makro-Modus werden die Makroziele anschließend auf das jeweilige Tagesbudget angewendet: Protein bleibt bei unverändertem Gewicht/Sportstatus in Gramm gleich, Fett bleibt bei 30 % der Tageskalorien und Kohlenhydrate erhalten die verbleibenden Kalorien.

Noch offen sind vor allem UX-Fragen: konkrete Bezeichnung, Wochentagsauswahl, Control für die Höhe des flexiblen Tages und Umgang mit mehreren flexiblen Tagen.

## Tracking-Präferenz

Der Nutzer kann wählen:

- **Nur Kalorien tracken**
- **Kalorien + Makronährstoffe tracken**

Im Makro-Modus werden Protein, Fett und Kohlenhydrate automatisch nach `nutrition-and-macros.md` berechnet.

## Screen-Reihenfolge

1. Start
2. Geschlecht / biologische Kategorie
3. Alter
4. Größe
5. aktuelles Gewicht
6. aktueller KFA, optional
7. Alltagstyp
8. durchschnittliche Schritte
9. Sporthäufigkeit
10. Trainingsart, nur wenn Training angegeben wurde
11. typische Trainingsdauer, nur wenn Training angegeben wurde
12. Zieldefinition
13. Zielwert / abgeleitetes Zielgewicht
14. gewünschter Zeitraum
15. flexibler Tag / höheres Tagesbudget
16. Tracking-Modus
17. Plan-Ergebnis

## KFA-Hilfe mit Referenzbildern

Der aktuelle KFA ist optional. Wenn der Nutzer ihn nicht kennt, kann er aktiv Vergleichsbilder öffnen.

Die Referenzbibliothek wird vorab erzeugt und ungefähr nach folgenden Merkmalen organisiert:

- Geschlecht / biologische Kategorie
- intern aus Größe und Gewicht abgeleitete Körperform-/Referenzkategorie
- KFA-Stufe

Die KFA-Bilder können ungefähr in **5-Prozentpunkt-Schritten** vorliegen. Diese Bildstufen sind nur visuelle Anker. Der Nutzer kann z. B. zwischen 15 % und 20 % einen Wert von 17 % eingeben. Für die Berechnung wird immer der tatsächliche numerische Wert verwendet.

Die Referenzbilder sind keine Messung. Eine erhöhte Unsicherheit bei visuell geschätztem KFA kann intern für Entwickler/Validierung markiert werden; eine separate User-Warnung nur deshalb ist nicht erforderlich.

Die genaue Bucket-Formel, Anzahl der Kategorien, Grenzwerte, KFA-Spanne und Bildansichten bleiben offen.

## Ziel-KFA anhand von Bildern

Wenn ein aktueller KFA vorhanden ist, kann dieselbe Bildlogik für einen Ziel-KFA genutzt werden. Auch der Ziel-KFA kann numerisch zwischen den Bildankern fein angepasst werden.

Das daraus abgeleitete Zielgewicht ist eine Modellschätzung unter der Annahme konstanter fettfreier Masse.

## Training und Dauer

Da Training in V1 mit MET, Körpergewicht und Zeit berechnet wird, wird bei Training zusätzlich die typische Dauer einer Einheit benötigt.

Eine separate Intensitätsfrage ist für das initiale Onboarding nicht zwingend. V1 kann zunächst Standard-MET-Werte pro Trainingsart verwenden; genauere Intensität kann später unter „Plan verfeinern“ ergänzt werden.

## Nach dem ersten Plan

Nach der Planerstellung folgen keine weiteren Pflichtfragen. Zusätzliche Details gehören in „Plan verfeinern“, Berechnungsdetails oder Einstellungen, z. B.:

- detaillierte Formeln
- genauere Aktivitäts-/Trainingsdetails
- Trainingsintensität
- manuelle Anpassung des Kalorienziels
- manuelle Makroanpassungen
- weitere Personalisierung
