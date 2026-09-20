# Onboarding

## Ziel des Onboardings

Das Onboarding sammelt nur Informationen, die für Berechnung oder Personalisierung relevant sind. Der erste Durchlauf soll ungefähr in zwei Minuten machbar sein und visuell minimalistisch bleiben.

## UX-Prinzipien

- pro Eingabe-Screen grundsätzlich **ein Parameter**
- kurze, eindeutige Fragen
- Erklärungen nur auf Wunsch einblenden
- komplexere Formeln und Details erst nach dem ersten Plan

Jeder relevante Screen kann eine kleine optionale Erklärung enthalten: warum die Angabe benötigt wird und was sie beeinflusst.


## Theo im Onboarding

Siehe [D-045](PRODUCT-DECISIONS.md#d-045--nocturne-direction-and-unobtrusive-theo-guidance) und [Nocturne-Beispiel mit Änderungsnotizen](ui%20references/02-theo-nocturne.md).

- **Theo** wird mit großem T geschrieben. Der Appname gehört auf den Startscreen; danach muss er nicht auf jedem Screen wiederholt werden.
- Die bevorzugte Richtung ist **04 · Nocturne** mit viel Freiraum und zurückhaltenden, konsistenten Schriftgrößen.
- Der Theo-Taschenrechner bietet beim Antippen eine Erklärung zum aktuellen Screen, zur Bedeutung der Eingabe sowie zu mathematischen Gründen und Auswirkungen. Vertiefende Rechenwege bleiben optional.
- Die bisherige Position unten rechts oberhalb der Hauptaktion gefällt dem Nutzer nicht und ist **nicht freigegeben**. Die neue Position ist noch offen.
- Beim **ersten Auftreten** zeigt Theo eine kurze Sprechblase, die seine antippbare Hilfsfunktion erklärt. Textvorschlag: „Tippe auf mich – ich erkläre dir diese Eingabe und wie sie deinen Plan beeinflusst.“
- Danach erscheinen Sprechblasen nicht dauerhaft oder automatisch auf jedem weiteren Screen. Weitere Erklärungen werden durch Antippen geöffnet.

Die einmalige Einführung ergänzt das Prinzip „Erklärungen nur auf Wunsch“; sie ersetzt es nicht. Der genaue erste Einsatzort sowie Ausblendverhalten und technische Speicherung des Einführungsstatus sind noch festzulegen.

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

## Wochenbudget und Cheat Day

Der Nutzer soll **zuerst** den ohne Cheat Day berechneten Ausgangsplan sehen: durchschnittliches Tagesziel und Wochenbudget.

```text
Wochenbudget W = durchschnittliches Tagesziel C × 7
```

Erst danach wird optional gefragt, ob ein **Cheat Day** eingebaut werden soll. Für V1 ist bewusst der Begriff „Cheat Day“ vorgesehen.

V1 erlaubt **maximal einen Cheat Day pro Woche**.

Wenn der Nutzer einen Cheat Day möchte:

1. Montag bis Sonntag werden als auswählbare Tage angezeigt.
2. Der Nutzer wählt genau einen Wochentag.
3. Anschließend wählt er das gesamte Kalorienbudget dieses Cheat Days über einen **vertikalen Wheel-/Number-Picker**.
4. Der ausgewählte Wert steht groß und zentriert; benachbarte Werte erscheinen darüber und darunter zurückgenommen.
5. Die Auswahl erfolgt in **50-kcal-Schritten**.
6. Während der Wert verändert wird, aktualisieren sich die Kalorienbudgets der übrigen sechs Tage **live**.
7. Das Wochenbudget bleibt unverändert und soll gleichzeitig sichtbar bzw. nachvollziehbar bleiben.

Berechnung:

```text
reguläres Tagesbudget L = (W - Cheat-Day-Budget H) / 6
```

Die nominale Cheat-Day-Obergrenze beträgt:

```text
H_max_nominal = C + 1.500 kcal
```

Der Maximalwert wird auf das 50-kcal-Raster abgerundet. Die frühere `+1.000-kcal`-Grenze ist damit ersetzt.

Wenn durch die Umverteilung die sechs übrigen Tage unter automatische Planungsgrenzen fallen, muss die Implementierung diesen Zustand erkennen und nachvollziehbar behandeln. Ob dann hart blockiert, gewarnt oder nur eine weiche Empfehlung gezeigt wird, ist bewusst **nicht vorab festgelegt** und darf in der Implementierungsphase entschieden werden.

Die frühere Richtung „Cheat Day maximal bis zum Erhaltungsbedarf“ gilt weiterhin **nicht mehr**.

Die vollständige Berechnungs- und UX-Spezifikation steht in [`cheat-day-v1.md`](cheat-day-v1.md).

### Optionale Cheat-Day-Hilfe

Der Cheat-Day-Screen soll wie andere erklärungsbedürftige Screens einen kleinen **Info-Button** bzw. eine optionale Hilfsansicht anbieten.

Dort können typische Lebensmittel mit groben Kaloriengrößenordnungen gezeigt werden, z. B. Pizza, Bier/Alkohol, Kuchen, Burger, Pommes, Flips oder Schokolade. Die Werte sollen als Richtwerte bzw. Bereiche dargestellt werden, nicht als scheinbar exakte Werte.

## Tracking-Präferenz

Der Nutzer kann wählen:

- **Nur Kalorien tracken**
- **Kalorien + Makronährstoffe tracken**

Im Makro-Modus werden Protein, Fett und Kohlenhydrate automatisch nach `nutrition-and-macros.md` berechnet.

## Screen-Reihenfolge

Der aktuelle Flow umfasst 18 Screens:

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
15. **Ausgangsplan / Budget-Vorschau ohne Cheat Day**
16. **Cheat Day, optional**
17. Tracking-Modus
18. Plan-Ergebnis

Die Budget-Vorschau vor dem Cheat-Day-Screen ist bewusst vorgesehen, damit der Nutzer zuerst sieht, wie hoch sein normales Tagesziel und Wochenbudget sind, bevor er Kalorien innerhalb der Woche umverteilt.

## KFA-Hilfe mit Referenzbildern

Der aktuelle KFA ist optional. Der Nutzer kann jederzeit direkt einen numerischen KFA-Wert eingeben. Wenn er visuelle Orientierung möchte, kann er aktiv **„Beispiele anzeigen“** öffnen.

Die Bilder sind nur Orientierungshilfen. Der Nutzer muss **kein Bild auswählen** und muss auch nicht angeben, welches Bild ihm am ähnlichsten sieht.

### V1-Bibliothek

Die Referenzbibliothek wird vorab erzeugt und umfasst weiterhin **80 Bilder**:

```text
2 Geschlechts-/biologische Bildkategorien
× 5 interne Körperform-/Referenzkategorien
× 8 KFA-Stufen
= 80 Bilder
```

Die acht Bildanker sind jetzt geschlechtsspezifisch verschoben:

```text
männlich: 10 %, 15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %
weiblich: 15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %, 50 %
```

Die Änderung ersetzt die frühere gemeinsame Reihe `5–40 %`. Ziel ist eine physiologisch plausiblere visuelle Skala, insbesondere im unteren weiblichen KFA-Bereich.

Die Bildstufen begrenzen den numerischen KFA nicht. Beispielsweise kann der Nutzer trotz Bildankern bei 15 % und 20 % direkt **18 %** eingeben. Für die Berechnung wird immer der tatsächliche numerische Wert verwendet.

### Interne Auswahl der Körperform

Die App fragt den Nutzer nicht nach seinem Körperbau. Für die Bildauswahl wird intern eine einfache BMI-basierte V1-Heuristik verwendet:

```text
BMI = Gewicht(kg) / Größe(m)^2

Bucket A: BMI < 20
Bucket B: 20 bis < 25
Bucket C: 25 bis < 30
Bucket D: 30 bis < 35
Bucket E: >= 35
```

Die Bucket-Namen werden dem Nutzer nicht angezeigt. Sie sind **keine medizinische Klassifikation und keine KFA-Schätzung**, sondern ausschließlich ein Matching-Hilfsmittel für passendere Referenzbilder.

Sehr muskulöse oder anderweitig atypische Körperzusammensetzungen können dadurch weniger passend zugeordnet werden. Diese Einschränkung wird für V1 akzeptiert.

### Bildstandard

V1 verwendet nur **eine standardisierte Frontansicht** pro Kombination. Wichtig sind über alle Bilder hinweg möglichst identische Pose, Ausschnitt, Perspektive, Kleidung, Hintergrund und Lichtsetzung. Die Bilder sollen funktional und vergleichbar sein, nicht dekorativ.

Die Bilder sollen nicht nur gleichmäßig abgestuft, sondern **physiologisch/medizinisch möglichst plausibel** wirken. Sie bleiben dennoch visuelle Referenzanker und keine medizinische KFA-Messung.

Die gleiche Bibliothek wird für aktuellen KFA und Ziel-KFA verwendet.

Die vollständige Spezifikation und der Status der Pilotserie stehen in [`kfa-reference-images-v1.md`](kfa-reference-images-v1.md).

## Ziel-KFA anhand von Bildern

Wenn ein aktueller KFA vorhanden ist, kann dieselbe Bildbibliothek als optionale Orientierung für einen Ziel-KFA genutzt werden. Auch hier muss kein Bild ausgewählt werden. Der Nutzer kann den Ziel-KFA frei numerisch eingeben, einschließlich Zwischenwerten zwischen den 5-Prozentpunkt-Bildankern.

Das daraus abgeleitete Zielgewicht ist eine Modellschätzung unter der Annahme konstanter fettfreier Masse.

## Training und Dauer

Da Training in V1 mit MET, Körpergewicht und Zeit berechnet wird, wird bei Training zusätzlich die typische Dauer einer Einheit benötigt.

Eine separate Intensitätsfrage ist für das initiale Onboarding nicht zwingend. V1 verwendet zunächst die in `activity-model-v1.md` festgelegten Standard-MET-Werte pro Trainingsart; genauere Intensität kann später unter „Plan verfeinern“ ergänzt werden.

## Kontooption nach dem Ergebnis

Der bestehende 18-Screen-Flow bleibt ohne Registrierung nutzbar. Gastberechnungen laufen lokal und benötigen kein Serverkonto. Nach dem Ergebnis kann „Plan im Konto speichern“ zur Registrierung und Übernahme der bestehenden Eingaben und des Plans gewählt werden.

Anmeldung, Registrierung und Speicherstatus sind ergänzende Kontoflüsse, keine Pflichtfragen vor dem Ergebnis. Bei Abbruch oder Fehler bleibt der aktuelle Gastplan erhalten. Der Umgang mit einem vorhandenen Kontoplan beim Login ist noch offen. Siehe [Gastmodus und Konten](guest-mode.md), D-047.

## Nach dem ersten Plan

Nach der Planerstellung folgen keine weiteren Pflichtfragen. Zusätzliche Details gehören in „Plan verfeinern“, Berechnungsdetails oder Einstellungen, z. B.:

- detaillierte Formeln
- genauere Aktivitäts-/Trainingsdetails
- Trainingsintensität
- manuelle Anpassung des Kalorienziels
- manuelle Makroanpassungen
- weitere Personalisierung
