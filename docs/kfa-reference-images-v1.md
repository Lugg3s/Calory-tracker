# KFA Reference Images V1

Dieses Dokument definiert die V1-Struktur der visuellen KFA-Referenzbibliothek.

## Zweck

Die Bilder dienen ausschließlich als **optionale visuelle Orientierung** für aktuellen KFA und Ziel-KFA. Sie sind keine Messung und keine Diagnose.

Der Nutzer muss **kein Bild auswählen**, das seiner Meinung nach am besten passt. Die Bilder sind nur Hilfsmittel. Die eigentliche KFA-Eingabe bleibt ein frei eingegebener numerischer Wert.

Beispiel:

```text
angezeigte Bildanker: 15 %, 20 %, 25 %
Nutzereingabe: 18 %
Berechnung verwendet: 18 %
```

## Bibliotheksstruktur

V1 verwendet:

- 2 Geschlechts-/biologische Kategorien für die Bildauswahl: männlich und weiblich;
- 5 interne Körperform-/Referenzkategorien;
- 8 KFA-Bildstufen pro Geschlecht;
- 1 Frontansicht pro Kombination.

Damit ergibt sich:

```text
2 × 5 × 8 = 80 Referenzbilder
```

## KFA-Bildstufen

Die acht Bildanker liegen für beide Geschlechter in 5-Prozentpunkt-Schritten:

```text
5 %, 10 %, 15 %, 20 %, 25 %, 30 %, 35 %, 40 %
```

Die getrennten männlichen und weiblichen Bildbibliotheken stellen dieselben numerischen KFA-Anker jeweils geschlechtsspezifisch dar. Ein identischer Prozentwert muss daher optisch nicht gleich aussehen.

Die Bildstufen begrenzen die Nutzereingabe nicht. Zwischenwerte bleiben zulässig.

## Interne Körperform-Kategorie

Der Nutzer wird **nicht** nach einer Körperform-Kategorie gefragt und sieht deren Bezeichnung nicht. Sie dient nur dazu, aus der Bibliothek passendere visuelle Referenzen auszuwählen.

V1 verwendet dafür eine einfache BMI-basierte Heuristik:

```text
BMI = Gewicht(kg) / Größe(m)^2
```

Interne Buckets:

| Bucket | BMI-Bereich |
| --- | ---: |
| A | < 20 |
| B | 20 bis < 25 |
| C | 25 bis < 30 |
| D | 30 bis < 35 |
| E | >= 35 |

Die Bucket-Namen sind rein intern und werden nicht als Nutzerklassifikation angezeigt.

### Einordnung der Heuristik

Diese BMI-Bucket-Logik ist eine **Produktheuristik für Bild-Matching**, keine Aussage über Gesundheit, Körperzusammensetzung oder den tatsächlichen KFA.

Bekannte Grenze: Sehr muskulöse Personen oder andere atypische Körperzusammensetzungen können einem visuellen Referenzbucket zugeordnet werden, der weniger gut passt. Für V1 wird diese Vereinfachung akzeptiert.

## Darstellung und Interaktion

Auf dem KFA-Screen bleibt die normale Ansicht minimalistisch. Die Bilder erscheinen nur, wenn der Nutzer aktiv eine Hilfe wie **„Beispiele anzeigen“** öffnet.

Regeln:

- keine Pflicht zur Auswahl eines Bildes;
- frei numerische KFA-Eingabe bleibt der eigentliche Input;
- Bilder dienen nur als visuelle Anker;
- dieselbe Bibliothek kann für aktuellen KFA und Ziel-KFA verwendet werden;
- Frontansicht genügt in V1;
- konsistente Pose, Perspektive, Kleidung, Licht und Hintergrund über die gesamte Bibliothek sind wichtiger als künstlerische Vielfalt.

## Anforderungen an die Bilder

Für Vergleichbarkeit sollten alle 80 Bilder möglichst standardisiert sein:

- neutrale aufrechte Frontpose;
- Arme leicht vom Körper weg, damit Taille und Rumpf sichtbar bleiben;
- neutrale Mimik;
- identische Kamera-/Brennweitenwirkung;
- gleiche Distanz und Ausschnitt;
- einheitlicher neutraler Hintergrund;
- funktionale, körpernahe, nicht sexualisierte Kleidung;
- möglichst gleiche Lichtsetzung;
- keine Fitness-Posen, Pump-Effekte oder dramatische Beleuchtung;
- keine dekorativen Objekte.

Der Zweck ist Vergleichbarkeit, nicht Fotorealismus um jeden Preis.

## Produktionsstrategie

Die 80 Bilder werden **vorab erzeugt und kuratiert**. Sie werden nicht live pro Nutzer generiert.

Für die Produktion sollte zunächst ein kleiner Pilot erstellt werden, bevor alle 80 Bilder generiert werden. Empfehlenswert ist:

1. einen männlichen und einen weiblichen Basischarakter definieren;
2. je einen mittleren Körperform-Bucket auswählen;
3. zunächst die acht KFA-Stufen für diese zwei Basisreihen erzeugen;
4. Konsistenz und visuelle Plausibilität prüfen;
5. Prompt/Workflow einfrieren;
6. erst danach die restlichen Buckets erzeugen.

Dadurch werden unnötige Generierungen vermieden und Stil-/Anatomiefehler früh erkannt.

## Noch offen

Nicht abschließend entschieden sind:

- welches Bildgenerierungsmodell bzw. Tool verwendet wird;
- ob für maximale Konsistenz ein Referenzbild-/Character-Reference-Workflow oder ein kontrollierteres lokales Modell verwendet wird;
- konkrete Kleidung, Hauttöne und Diversitätsstrategie;
- finale Qualitätsprüfung der visuellen KFA-Plausibilität;
- ob später zusätzliche Seiten-/Rückansichten ergänzt werden.
