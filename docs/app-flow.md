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

Diese Eingabe hat in V1 zwei Funktionen:

1. Sie ist Teil des Trainings-/Aktivitätsprofils.
2. Sie bestimmt im erweiterten Makro-Modus den Protein-Tier:

```text
< 3 Sporteinheiten/Woche  → 1,4 g Protein/kg aktuelles Körpergewicht
>= 3 Sporteinheiten/Woche → 2,0 g Protein/kg aktuelles Körpergewicht
```

Für diese Schwelle zählt jede regelmäßige Sportart. Es gibt im initialen MVP **keinen zusätzlichen Screen für Muskelaufbau oder Muskelerhalt**.

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

### Screen 15 — Ausgangsplan / Budget-Vorschau

Bevor der Nutzer einen Cheat Day auswählt, sieht er den zunächst berechneten Plan **ohne Umverteilung**.

Mindestens sichtbar:

- durchschnittliches Tagesziel `C`;
- Wochenbudget `W = C × 7`;
- normales Tagesbudget ohne Cheat Day.

Diese Vorschau ist bewusst vor der Cheat-Day-Entscheidung platziert. Der Nutzer soll erst verstehen, wie viel er normalerweise pro Tag und pro Woche zur Verfügung hat, bevor er Kalorien auf einen einzelnen Tag verschiebt.

### Screen 16 — Cheat Day

V1 verwendet den Begriff **„Cheat Day“**.

Zunächst wird gefragt, ob der Nutzer einen Cheat Day einbauen möchte. Die genaue Formulierung kann in der Wireframe-/Copy-Phase noch angepasst werden.

Wenn der Nutzer „Nein“ wählt, bleibt die Budgetverteilung unverändert.

Wenn der Nutzer „Ja“ wählt:

1. **Montag bis Sonntag** werden als auswählbare Tage gezeigt.
2. Der Nutzer wählt **genau einen** Tag. V1 erlaubt nur einen Cheat Day pro Woche.
3. Danach erscheint ein Zahlenregler / Wheel / Slider für das **gesamte Kalorienbudget des Cheat Days**.
4. Der Regler arbeitet in **50-kcal-Schritten**.
5. Während der Nutzer den Wert verändert, werden die Kalorienbudgets der übrigen sechs Tage **live** neu berechnet.
6. Das unveränderte Wochenbudget bleibt sichtbar bzw. nachvollziehbar.

Berechnung:

```text
Wochenbudget W = C × 7
reguläres Tagesbudget L = (W - H) / 6
```

Dabei ist `H` das ausgewählte Cheat-Day-Budget.

Nominale Obergrenze:

```text
H_max_nominal = C + 1.000 kcal
```

Der auswählbare Maximalwert liegt auf dem 50-kcal-Raster und wird nach unten gerundet. Zusätzlich darf die Umverteilung die automatischen Planungsgrenzen der sechs übrigen Tage nicht verletzen. Falls diese Grenze früher erreicht wird, begrenzt sie den Regler entsprechend.

Die frühere Richtung „Cheat Day maximal bis zum Erhaltungsbedarf“ gilt nicht mehr.

#### Info-Button

Der Screen soll einen optionalen Info-Button bzw. eine Hilfe analog zu anderen Onboarding-Screens anbieten.

Dort können typische Cheat-Day-Lebensmittel mit groben Kaloriengrößenordnungen gezeigt werden, z. B. Pizza, Bier, Kuchen, Burger oder Pommes. Die Angaben sollen als Richtwerte/Bereiche erscheinen, weil Portionen und Rezepte stark variieren.

Die konkreten Portionsbeispiele und kcal-Werte sind noch als Content-Aufgabe offen.

Die vollständige Spezifikation steht in [`cheat-day-v1.md`](cheat-day-v1.md).

### Screen 17 — Tracking-Modus

- nur Kalorien
- Kalorien + Makronährstoffe

Im Makro-Modus gelten die in `nutrition-and-macros.md` definierten V1-Regeln.

### Screen 18 — Plan-Ergebnis

Mindestens anzeigen:

- durchschnittliches Tagesziel
- Wochenbudget
- ggf. Cheat-Day-Budget und sechs angepasste reguläre Tagesbudgets
- geschätzten Erhaltungsbedarf
- geplantes durchschnittliches Defizit
- Zielgewicht
- ggf. Ziel-KFA und daraus abgeleitete notwendige Gewichtsabnahme
- bei Makro-Modus: Protein-, Fett- und Kohlenhydratziele für die jeweiligen Tagesbudgets
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

Festgelegt sind der grundsätzliche **18-Screen-Flow**, das Prinzip „ein Parameter pro Screen“, die bedingte Trainingsdauer, die KFA-Zielgewichtslogik, die Protein-Klassifizierung aus der vorhandenen Sporthäufigkeit und die Cheat-Day-Berechnungs-/Interaktionsrichtung.

Eine zusätzliche Muskelaufbau-/Muskelerhalt-Frage ist für V1 nicht vorgesehen.

Für den Cheat Day sind jetzt insbesondere entschieden: genau ein Tag pro Woche, Auswahl des Wochentags, gesamtes Cheat-Day-Budget über einen Zahlenregler in 50-kcal-Schritten, Live-Neuberechnung der anderen sechs Tage, nominale Obergrenze `C + 1.000 kcal` sowie ein optionaler Info-Bereich mit groben Lebensmittelbeispielen.

Noch offen sind vor allem konkrete Microcopy/visuelles Design, die finalen Lebensmittelbeispiele und deren Portions-/Kalorienbereiche, MET-Feinkalibrierung und Details der KFA-Referenzbibliothek.
