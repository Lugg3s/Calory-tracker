# Aktivitätsmodell V1

Dieses Dokument hält die aktuelle V1-Arbeitsrichtung für Alltagsaktivität, Schritte und Training fest. Es ergänzt `calorie-calculation.md` und dokumentiert auch bekannte Modellgrenzen, damit spätere Entwickler die aktuell gewählten Vereinfachungen nachvollziehen können.

## Grundstruktur

Der Erhaltungsbedarf wird komponentenbasiert aufgebaut:

```text
RMR
+ Netto-Alltagsaktivität
+ Netto-Schritte
+ Netto-Training
= Basis B vor TEF

Erhaltungsbedarf M = B / 0,90
```

Ein klassischer PAL-Faktor wird nicht zusätzlich verwendet.

## Schritte

Für normales Gehen gilt aktuell als V1-Arbeitswert:

```text
geschätzte Schrittlänge = Körpergröße × 0,414
Distanz(km) = Schritte × Schrittlänge(m) / 1.000
Netto-Schritt-kcal = Distanz(km) × Körpergewicht(kg) × 0,57 kcal/kg/km
```

Einordnung:

- `0,57 kcal/kg/km` ist wissenschaftlich gut begründbar als durchschnittlicher Netto-Energieaufwand normalen Gehens.
- `0,414 × Körpergröße` ist nur eine grobe Fallback-Schätzung der Schrittlänge.
- Gemessene Distanzdaten aus Smartphone/Health/Wearable sollen später bevorzugt werden.

## Alltagsaktivität über MET

Die früher diskutierten pauschalen RMR-Zuschläge werden nicht verwendet. Der Alltag wird stattdessen zeitbasiert über MET-Werte modelliert.

```text
Brutto-Aktivitäts-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Aktivitäts-kcal
= Brutto-Aktivitäts-kcal
- RMR / 1.440 × Minuten
```

MET-Werte sollen aus dem aktuellen Adult Compendium of Physical Activities oder einer vergleichbar belastbaren Quelle stammen.

### Vorläufige interne 8-Stunden-Referenzprofile

Damit das Onboarding nicht nach einzelnen Stunden Sitzen, Stehen, Heben usw. fragen muss, wird aktuell mit fünf groben Alltagstypen als internen Referenzprofilen gearbeitet:

| Alltagstyp | Vorläufiges internes 8-h-Profil |
| --- | --- |
| überwiegend sitzend | 7 h × 1,3 MET + 1 h × 1,8 MET |
| Sitzen & Stehen gemischt | 4 h × 1,3 MET + 4 h × 1,8 MET |
| überwiegend stehend | 1 h × 1,3 MET + 6 h × 1,8 MET + 1 h × 3,3 MET |
| körperlich aktiv | 2 h × 1,3 MET + 4 h × 1,8 MET + 1,5 h × 3,3 MET + 0,5 h × 4,5 MET |
| schwere körperliche Arbeit | 1 h × 1,3 MET + 3 h × 1,8 MET + 2,5 h × 3,3 MET + 1,5 h × 4,5 MET |

Diese Profile sind **vorläufige Produktparameter**, keine wissenschaftlich exakt gemessenen Tagesabläufe. Sie sollen eine kurze Onboarding-Auswahl auf ein reproduzierbares internes Modell abbilden.

## Kalibrierung und Plausibilitätscheck

Die höheren Profile wurden grob gegen reale PAL-/Doubly-Labelled-Water-Größenordnungen geprüft und konservativer angesetzt als die ersten Entwürfe. Ein körperlich aktiver bzw. schwer körperlich arbeitender Nutzer kann damit plausibel in hohe PAL-Bereiche gelangen, insbesondere bei vielen täglichen Schritten.

Bei Beispielrechnungen mit 74 kg Körpergewicht und RMR um 1.720 kcal ergaben Kombinationen aus körperlicher Arbeit und hohen Schrittzahlen Größenordnungen von ungefähr 3.000 bis 3.500 kcal Erhaltungsbedarf. Diese Größenordnung ist für entsprechend aktive Personen grundsätzlich plausibel.

## Bekannte Modellgrenzen

Die aktuelle V1-Struktur hat zwei bekannte Schwachstellen:

1. **Niedrige Aktivität kann unterschätzt werden.** Ein Modell aus RMR + 8-h-Berufsprofil + Schritte + Training bildet nicht automatisch alle übrigen NEAT-Komponenten des Tages ab, z. B. Haushalt, Kochen, Duschen, Stehen, Fidgeting oder sonstige nicht sauber durch Schritte erfasste Aktivität.
2. **Hohe Aktivität kann teilweise doppelt gezählt werden.** Bei körperlichen Berufen entstehen viele Schritte während derselben Arbeit, die bereits über MET-Anteile abgebildet wird.

Für V1 wird das Modell trotzdem zunächst in dieser Form weiterverfolgt. Diese Punkte sind als **bekannte Entwickler-/Validierungsrisiken** festzuhalten und sollen später gegen reale Nutzerdaten bzw. bessere Aktivitätsdaten kalibriert werden.

## Doppelzählungsregel

Da Gehen separat über Schritte erfasst wird, soll das Alltags-MET-Profil möglichst nur den nicht bereits durch Schritte erfassten Zusatzverbrauch abbilden. Wo ein Profil Gehanteile implizit enthält, muss die spätere Implementierung darauf achten, dass dieselbe Bewegung nicht vollständig ein zweites Mal addiert wird.

## Training

Training wird ebenfalls MET-basiert und zeitabhängig modelliert:

```text
Brutto-Training-kcal
= MET × 3,5 × Körpergewicht(kg) / 200 × Minuten

Netto-Training-kcal
= Brutto-Training-kcal
- RMR / 1.440 × Minuten
```

Für den Plan wird der Wochenumfang auf einen Tagesdurchschnitt umgelegt:

```text
Training-kcal pro Tag
= Summe Netto-Training-kcal pro Woche / 7
```

Dafür werden Trainingsart, Häufigkeit und typische Dauer pro Einheit benötigt. Eine zusätzliche Intensitätsfrage ist für das initiale Onboarding nicht zwingend; Standard-MET-Werte pro Sportart können in V1 verwendet werden.

## Spätere Verbesserungen

Mögliche spätere Verbesserungen sind:

- tatsächliche Distanz statt geschätzter Schrittlänge;
- Wearable-/Health-Daten;
- sportartspezifische Modelle, z. B. Pace/Distanz beim Laufen oder Watt beim Radfahren;
- bessere Abbildung allgemeiner NEAT-Komponenten;
- End-to-End-Kalibrierung gegen tatsächliche Gewichts- und Energieverlaufsdaten.
