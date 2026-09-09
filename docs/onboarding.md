# Onboarding

## Ziel des Onboardings

Das Onboarding sammelt nur Informationen, die für die Berechnung oder Personalisierung relevant sind. Die App soll den Nutzer nicht unnötig mit Fachbegriffen oder Detailfragen belasten.

Der erste Durchlauf soll bewusst kurz bleiben und ungefähr in zwei Minuten machbar sein. Entscheidend ist ein schneller, leichter Flow, nicht eine starre Zeitgrenze.

## UX-Prinzipien

Die Onboarding-Screens sollen standardmäßig sehr minimalistisch und aufgeräumt wirken.

Grundsätzlich gilt:

- pro Eingabe-Screen nur **ein Parameter**
- kurze, eindeutige Fragen
- möglichst wenig zusätzliche UI
- Erklärungen nur auf Wunsch einblenden

Jeder relevante Eingabe-Screen soll eine kleine optionale Information anbieten können. Diese erklärt knapp:

1. warum die Angabe benötigt wird;
2. welchen Einfluss sie auf Berechnung, Empfehlung oder Personalisierung haben kann.

Die Zusatzinformation ist standardmäßig ausgeblendet, damit der normale Screen visuell ruhig bleibt.

Komplexere Erklärungen, Formeln und Details werden nach der initialen Dateneingabe angeboten, nicht zwingend während des ersten Durchlaufs.

## Vorgesehene Angaben

### Körperdaten

- Alter
- Geschlecht / biologische Kategorie für die gewählte Berechnung
- Größe
- aktuelles Gewicht
- optional aktueller KFA

### Aktivität

- Alltagsaktivität / Tätigkeit
- durchschnittliche Schritte pro Tag
- Sportarten / Trainingsart
- Trainingshäufigkeit
- typische Trainingsdauer pro Einheit, wenn Training angegeben wird
- weitere Trainingsdetails nur soweit für die Berechnung relevant

Die Alltagskomponente soll nach aktueller Berechnungsentscheidung MET-basiert modelliert werden. Wie die dafür erforderlichen Zeitanteile aus möglichst wenigen Nutzereingaben abgeleitet werden, ist noch festzulegen.

### Ziel

Der Nutzer benötigt für die weitere Berechnung ein **Zielgewicht**.

Ohne aktuellen KFA:

- der Nutzer gibt das Zielgewicht direkt ein.

Mit aktuellem KFA:

- der Nutzer kann weiterhin ein Zielgewicht direkt eingeben;
- alternativ kann er einen Ziel-KFA auswählen, auch anhand passender Referenzbilder;
- aus aktuellem Gewicht, aktuellem KFA und Ziel-KFA berechnet die App ein ungefähres Zielgewicht;
- dieses abgeleitete Zielgewicht wird anschließend als Zielgewicht für die weitere Gewichtsverlust- und Kalorienberechnung verwendet.

**Regel:** Ein Ziel-KFA wird nur angeboten, wenn ein aktueller KFA angegeben wurde.

Die Ableitung des Zielgewichts aus dem Ziel-KFA ist eine Modellrechnung unter der Annahme möglichst konstanter fettfreier Masse und keine exakte Vorhersage.

### Wochenbudget / Cheat Day

Im Onboarding soll zusätzlich ein eigener Screen für einen geplanten **Cheat Day** bzw. einen Tag mit höherem Kalorienbudget vorgesehen werden.

Dieser Punkt ist inhaltlich noch offen. Festzulegen sind insbesondere:

- ob der Nutzer einen solchen Tag nutzen möchte;
- welcher Wochentag gewählt wird;
- wie hoch das zusätzliche Budget an diesem Tag sein darf;
- wie die übrigen Tage angepasst werden, damit das geplante Wochenbudget und durchschnittliche Defizit erhalten bleiben;
- ob im Produkt eine neutralere Bezeichnung als „Cheat Day“ verwendet wird.

Die genaue UX und Berechnungslogik sind noch nicht entschieden.

### Trainings-/Ernährungsprofil

Der Nutzer soll angeben können, ob er beispielsweise regelmäßig Kraftsport bzw. Leistungssport betreibt. Diese Information beeinflusst insbesondere die Proteinempfehlung.

## Tracking-Präferenz

Der Nutzer kann wählen:

- **Nur Kalorien tracken**
- **Kalorien + Makronährstoffe tracken**

Damit bleibt Makrotracking optional.

## Screen-Reihenfolge

Der aktuell vorgesehene Flow ist:

1. Start
2. Geschlecht / biologische Kategorie
3. Alter
4. Größe
5. aktuelles Gewicht
6. aktueller KFA, optional
7. Alltagstyp
8. durchschnittliche Schritte
9. Sporthäufigkeit
10. Trainingsart, nur wenn Sport/Training angegeben wurde
11. typische Trainingsdauer, nur wenn Sport/Training angegeben wurde
12. Zieldefinition: Zielgewicht direkt oder, wenn aktueller KFA vorhanden ist, Ziel-KFA zur Ableitung des Zielgewichts
13. Zielgewicht bzw. Bestätigung des aus Ziel-KFA abgeleiteten Zielgewichts
14. gewünschter Zeitraum
15. Cheat Day / höheres Tagesbudget — Details noch offen
16. Tracking-Modus
17. Plan-Ergebnis

Wenn kein aktueller KFA angegeben wurde, ist die Ziel-KFA-Auswahl nicht verfügbar und der Nutzer gibt direkt ein Zielgewicht an.

Die genaue Beschreibung der Screens und des anschließenden Flows steht in [`app-flow.md`](app-flow.md).

## KFA-Hilfe mit Referenzbildern

Der Screen für den aktuellen KFA bleibt standardmäßig minimalistisch und kann übersprungen werden.

Wenn der Nutzer seinen aktuellen KFA nicht kennt, kann er aktiv eine visuelle Hilfe öffnen, z. B. über einen Button wie **„Beispiele anzeigen“**.

Dafür soll eine vorab erzeugte Referenzbibliothek genutzt werden. Die App benötigt dafür keine zusätzliche Frage zum Körperbau. Stattdessen wird intern aus den bereits eingegebenen Werten Größe und Gewicht eine grobe Körperform-/Referenzkategorie abgeleitet, beispielsweise über eine BMI-ähnliche Größen-Gewichts-Relation.

Die Bilder werden anschließend ungefähr nach folgenden Merkmalen ausgewählt:

- Geschlecht / biologische Kategorie
- intern abgeleitete Körperform-/Referenzkategorie
- KFA-Stufe

Die aktuelle Richtung ist, KFA-Beispiele ungefähr in **5-Prozentpunkt-Schritten** anzubieten. Die Bildstufen sind jedoch nur visuelle Orientierungspunkte. Der Nutzer kann einen numerischen KFA-Wert zwischen den Bildstufen eingeben, z. B. 17 % zwischen 15 % und 20 %. Für die Berechnung wird immer der tatsächlich eingegebene numerische Wert verwendet.

Die App zeigt nur die zur Person passendste bzw. nächstliegende Referenzgruppe an, nicht die gesamte Bibliothek.

Die Bilder werden **nicht für jeden Nutzer live generiert**, sondern vorher für eine überschaubare Zahl typischer Referenzkategorien erstellt. Dadurch muss nicht jede Kombination aus Größe und Gewicht als eigenes Bild vorliegen.

Wichtig: Die intern abgeleitete Kategorie dient ausschließlich der Auswahl möglichst passender Vergleichsbilder. Sie ist keine medizinische Einstufung und keine KFA-Messung. Auch die Referenzbilder selbst dienen nur der groben Selbsteinschätzung und dürfen keine exakte Zuordnung suggerieren.

Die zusätzliche Unsicherheit eines nur visuell geschätzten KFA kann intern für Entwickler und Modellvalidierung markiert werden. Sie muss nicht als gesonderte Warnung im User Interface erscheinen.

Die genaue Berechnung der Referenzkategorie, die Anzahl der Kategorien und deren Grenzwerte sind noch festzulegen.

## Ziel-KFA anhand von Bildern

Wenn ein aktueller KFA angegeben wurde, kann dieselbe Referenzlogik zusätzlich für die Auswahl eines **Ziel-KFA** verwendet werden.

Der Nutzer kann passende KFA-Beispiele ansehen und eine gewünschte Zielstufe auswählen. Auch hier sind die Bildstufen nur Ankerpunkte: Der Ziel-KFA kann numerisch zwischen den Bildstufen fein angepasst werden. Für die Zielgewichtsberechnung wird der exakte numerische Ziel-KFA verwendet.

Der Ziel-KFA ist dabei keine eigenständige Ersatzgröße für das Zielgewicht, sondern dient dazu, das passende Zielgewicht herzuleiten.

Aus aktuellem Gewicht, aktuellem KFA und Ziel-KFA berechnet die App anschließend näherungsweise:

- die aktuelle fettfreie Masse;
- das zum Ziel-KFA passende Modell-Zielgewicht;
- die daraus resultierende notwendige Gewichtsabnahme in Kilogramm.

Das berechnete Modell-Zielgewicht wird danach als Zielgewicht für die weitere Planung verwendet.

Die Berechnung beruht zunächst auf der Annahme konstanter fettfreier Masse. Sowohl die Bildauswahl als auch die daraus abgeleitete Gewichtsangabe müssen als Schätzung eingeordnet werden.

## Training und Dauer

Da die V1-Trainingsberechnung auf MET-Werten und Zeit basiert, reicht Trainingsart plus Häufigkeit allein nicht aus. Wenn der Nutzer Training angibt, wird daher zusätzlich die **typische Dauer einer Einheit** abgefragt.

Eine separate Intensitätsfrage ist für das initiale Onboarding nicht zwingend erforderlich. Die App kann zunächst pro Trainingsart mit einem sinnvollen Standard-MET arbeiten und eine genauere Intensität später unter „Plan verfeinern“ anbieten.

## Nach dem ersten Plan

Nach der Planerstellung soll der Nutzer nicht durch weitere Pflichtfragen aufgehalten werden. Zusätzliche Details werden nachgelagert angeboten, z. B. über „Plan verfeinern“, Berechnungsdetails oder Einstellungen.

Dazu können unter anderem gehören:

- detailliertere Erklärungen und Formeln
- zusätzliche Aktivitäts-/Trainingsdetails
- genauere Trainingsintensität
- manuelle Anpassung des Kalorienziels
- manuelle Anpassung von Makrozielen
- weitere Personalisierung
