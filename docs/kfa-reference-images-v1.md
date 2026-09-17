# KFA Reference Images V1

Gespeicherte Produktionsbilder: [Bildbibliothek und Index](../assets/kfa-reference-images/README.md). Die dort erfassten Produktionsmetadaten ergänzen diese Spezifikation.

**Produktionsstand vom 17. September 2026:** Alle 80 vorgesehenen Kombinationen (5 numerische Produktionsbuckets × 8 geschlechtsspezifische KFA-Anker × 2 Bildkategorien) sind gespeichert und indexiert. Dies bestätigt die Vollständigkeit der Entwürfe; die fachliche Kalibrierung, finale Freigabe und Zuordnung zu A–E bleiben offen. Alle Bilder tragen weiterhin den Validierungsstatus `pending`.

Dieses Dokument definiert die V1-Struktur der visuellen KFA-Referenzbibliothek.

## Zweck

Die Bilder dienen ausschließlich als **optionale visuelle Orientierung** für aktuellen KFA und Ziel-KFA. Sie sind keine Messung und keine Diagnose.

Gleichzeitig ist **physiologische/medizinische Plausibilität ausdrücklich wichtig**. Ziel ist nicht nur eine gleichmäßige optische Staffelung, sondern eine möglichst realistische Darstellung typischer sichtbarer Veränderungen des Körperfettanteils. Die Bilder dürfen dennoch nicht als exakte medizinische KFA-Bestimmung verstanden werden, weil sichtbare Ausprägung u. a. von Fettverteilung, Muskelmasse, Genetik und Alter abhängt.

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

Damit ergibt sich weiterhin:

```text
2 × 5 × 8 = 80 Referenzbilder
```

## KFA-Bildstufen

Die acht Bildanker liegen in 5-Prozentpunkt-Schritten, aber **nicht mehr identisch für beide Geschlechter**.

### Männlich

```text
10 %, 15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %
```

### Weiblich

```text
15 %, 20 %, 25 %, 30 %, 35 %, 40 %, 45 %, 50 %
```

Diese Entscheidung ersetzt die frühere gemeinsame Reihe `5 %, 10 %, 15 %, 20 %, 25 %, 30 %, 35 %, 40 %`.

Grund: Die unteren weiblichen Werte der alten Reihe wären als visuelle Alltagsreferenz physiologisch deutlich extremer und weniger sinnvoll. Die geschlechtsspezifisch verschobenen Reihen sollen die visuelle Skala plausibler machen, während jede Bibliothek weiterhin acht Stufen besitzt.

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
- einheitlicher neutraler Off-White-Hintergrund;
- funktionale, körpernahe, nicht sexualisierte Kleidung;
- möglichst gleiche Lichtsetzung;
- keine Fitness-Posen, Pump-Effekte oder dramatische Beleuchtung;
- keine dekorativen Objekte;
- Gesicht eher generalisiert als portraitartig;
- keine unnötige Veränderung von Muskelmasse, Knochenstruktur oder Grundproportionen zwischen den KFA-Stufen.

Der Zweck ist Vergleichbarkeit und physiologische Plausibilität, nicht Fotorealismus um jeden Preis.

### Geschlechtsspezifische Fettverteilung

Die Staffelung darf nicht nur durch ein pauschales „dicker/dünner“ entstehen.

Bei männlichen Referenzen sollen Veränderungen insbesondere plausibel an Bauch, Unterbauch, Taille/Flanken, Brust und später Armen/Beinen sichtbar werden.

Bei weiblichen Referenzen sollen Veränderungen plausibel u. a. an Hüfte, Gesäß, Oberschenkeln, Bauch, Armen und Brust auftreten.

Jede höhere Stufe muss visuell monoton nach mehr Körperfett wirken als die darunterliegende Stufe.

## Bucket-3-Pilotserie

Vor der vollständigen 80-Bilder-Produktion wird die mittlere Körperform-Kategorie als Pilotserie verwendet.

Aktueller Pilotumfang:

```text
Mann / Bucket 3: 10, 15, 20, 25, 30, 35, 40, 45 %
Frau / Bucket 3: 15, 20, 25, 30, 35, 40, 45, 50 %
```

Damit umfasst die Pilotserie **16 Bilder**.

Die aktuellen männlichen und weiblichen Basisfiguren werden als Bucket-3-Stil-/Charakterreferenzen behandelt. Bucket 3 steht dabei für die mittlere Körperform-Kategorie; die endgültige technische Zuordnung zu den internen BMI-Buckets muss konsistent in der Implementierung erfolgen.

### Produktionsregeln der Pilotserie

Zwischen Stufen sollen gleich bleiben:

- Person/visuelle Identität;
- Pose und Blickrichtung;
- Kleidung;
- Haarstil;
- Licht und Hintergrund;
- Kamerawinkel und Bildausschnitt;
- Körpergröße/Knochenstruktur;
- grundlegende Muskelmasse.

Verändert werden darf im Wesentlichen nur:

- sichtbare Fettmenge;
- plausible Fettverteilung;
- daraus folgende Weichheit/Definition der Körperkontur.

## Qualitätsprüfung

Jede Reihe wird mindestens auf folgende Punkte geprüft:

1. **Monotonie:** jede höhere KFA-Stufe wirkt sichtbar fettreicher als die vorherige.
2. **Identitätskonsistenz:** dieselbe Person bleibt erkennbar.
3. **Anatomie:** keine groben Fehler an Händen, Füßen, Gelenken oder Proportionen.
4. **Fettverteilung:** geschlechtsspezifisch plausibel statt rein skaliert.
5. **Keine Muskelverwechslung:** höhere KFA-Stufen dürfen nicht primär wie mehr Muskelmasse wirken.
6. **Keine Lichttäuschung:** Definition darf nicht nur durch dramatischeres Licht entstehen.
7. **Produktnutzen:** Silhouette und Unterschiede müssen als Referenz klar lesbar sein.

Die bereits gespeicherte Pilotserie trägt derzeit weiterhin den Validierungsstatus `pending`, bis die visuelle KFA-Plausibilität fachlich/qualitativ ausreichend geprüft und problematische Stufen gegebenenfalls neu generiert wurden.

## Produktionsstrategie

Die 80 Bilder werden **vorab erzeugt und kuratiert**. Sie werden nicht live pro Nutzer generiert.

Vorgehen:

1. Bucket-3-Master/Stilreferenzen festlegen;
2. 16er-Pilotserie erzeugen;
3. Monotonie, Anatomie, Identitätsdrift und physiologische Plausibilität prüfen;
4. problematische Einzelstufen gezielt regenerieren;
5. Prompt-/Reference-Workflow einfrieren;
6. anschließend Bucket 1, 2, 4 und 5 für beide Geschlechter erzeugen;
7. vollständige 80er-Bibliothek final prüfen und indexieren.

## Noch offen

Nicht abschließend entschieden sind:

- finale fachliche Kalibrierung/Validierung der sichtbaren KFA-Stufen;
- konkrete Hauttöne und Diversitätsstrategie für die vollständige Bibliothek;
- endgültige Zuordnung/Benennung von `bucket-3` zu A–E in der technischen Implementierung;
- ob später zusätzliche Seiten-/Rückansichten ergänzt werden.
