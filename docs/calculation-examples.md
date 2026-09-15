# Calculation Examples

Dieses Dokument enthält **manuelle Rechenbeispiele** für die aktuelle V1-Logik. Die Beispiele sind keine zusätzlichen Produktregeln und keine wissenschaftliche Validierung. Sie dienen dazu, die Formeln mit konkreten Eingaben nachvollziehbar zu testen.

## Beispiel — 14. September 2026

### Eingaben

- weibliche Mifflin-Kategorie
- 25 Jahre
- 162 cm
- 66 kg
- aktueller KFA: nicht angegeben
- Alltag: überwiegend sitzend
- durchschnittlich 5.000 Schritte/Tag
- Training: 1 × Zumba/Dance-Fitness + 1 × Krafttraining pro Woche
- Dauer: jeweils 60 Minuten
- Zieltermin: 15. Dezember 2026
- Zeitraum: 92 Tage

Für dieses Beispiel gilt:

- kein KFA → Mifflin-St. Jeor
- überwiegend sitzendes 8-h-Profil wird mit `5/7` auf die Woche gemittelt
- Zumba/Dance-Fitness wird vorläufig als `Sonstiger Sport = 5,0 MET` abgebildet
- Krafttraining = `3,5 MET`

### Ruheenergiebedarf

```text
RMR = 10 × 66 + 6,25 × 162 - 5 × 25 - 161
RMR = 1.386,5 kcal/Tag
```

### Alltagsaktivität

Überwiegend sitzend:

```text
7 h × 1,3 MET + 1 h × 1,8 MET
```

Netto-Energie für einen solchen 8-h-Tag:

```text
≈ 293,2 kcal
```

Auf 5 typische Arbeitstage und sieben Plan-Tage gemittelt:

```text
293,2 × 5 / 7 ≈ 209,4 kcal/Tag
```

### Schritte

```text
Schrittlänge = 1,62 m × 0,414 ≈ 0,671 m
Distanz = 5.000 × 0,671 / 1.000 ≈ 3,35 km
Netto-Schrittenergie ≈ 3,35 × 66 × 0,57
≈ 126,2 kcal/Tag
```

### Training

Zumba/Dance-Fitness, 60 min, 5,0 MET:

```text
Netto ≈ 288,7 kcal pro Einheit
```

Krafttraining, 60 min, 3,5 MET:

```text
Netto ≈ 184,8 kcal pro Einheit
```

Wochenmittel:

```text
(288,7 + 184,8) / 7 ≈ 67,6 kcal/Tag
```

### Erhaltungsbedarf

```text
B = RMR + Alltag + Schritte + Training
B ≈ 1.386,5 + 209,4 + 126,2 + 67,6
B ≈ 1.789,7 kcal/Tag

M = B / 0,90
M ≈ 1.988,6 kcal/Tag
```

Gerundet liegt der geschätzte Erhaltungsbedarf damit bei ungefähr **1.990 kcal/Tag**.

## Verschiedene Zielgewichte bis 15.12.2026

V1 verwendet:

```text
Gesamtdefizit = Gewichtsverlust × 7.700 kcal
D = Gesamtdefizit / 92 Tage
C = M - D / 0,90
```

| Zielgewicht | Geplanter Verlust | Körperenergie-Defizit Ø/Tag | Rechnerisches Tagesziel C |
| ---: | ---: | ---: | ---: |
| 64 kg | 2 kg | ca. 167 kcal | ca. 1.803 kcal |
| 62 kg | 4 kg | ca. 335 kcal | ca. 1.617 kcal |
| 60 kg | 6 kg | ca. 502 kcal | ca. 1.431 kcal |
| 58 kg | 8 kg | ca. 670 kcal | ca. 1.245 kcal |

### Automatischer V1-Guardrail

Bei `M ≈ 1.988,6 kcal` ergibt die 25-%-Regel:

```text
C_min = 0,75 × M ≈ 1.491 kcal/Tag
D_max = 0,225 × M ≈ 447 kcal/Tag
```

Über 92 Tage entspricht das in diesem statischen Modell ungefähr:

```text
maximal automatisch geplanter Gewichtsverlust ≈ 5,35 kg
entsprechendes Zielgewicht ≈ 60,65 kg
```

Damit liegen 64 kg und 62 kg innerhalb des automatischen relativen Guardrails. 60 kg liegt leicht darunter, 58 kg deutlich darunter. Ein Nutzer darf sein Kalorienziel später manuell ändern; die automatische Planung soll solche aggressiveren Werte aber nicht still als Standardvorschlag erzeugen.

## Cheat-Day-Beispiel beim 62-kg-Ziel

Für das 62-kg-Ziel gilt rechnerisch:

```text
C ≈ 1.616,6 kcal/Tag
W = C × 7 ≈ 11.316 kcal/Woche
```

Beispiele für einen Cheat Day:

| Cheat-Day-Budget | Restbudget pro anderem Tag |
| ---: | ---: |
| 2.300 kcal | ca. 1.503 kcal |
| 2.350 kcal | ca. 1.494 kcal |
| 2.400 kcal | ca. 1.486 kcal |
| 3.100 kcal | ca. 1.369 kcal |

Die nominale aktuelle Cheat-Day-Grenze wäre hier:

```text
C + 1.500 ≈ 3.116,6 kcal
auf 50-kcal-Raster abgerundet → 3.100 kcal
```

Bei hohen Cheat-Day-Werten können die sechs übrigen Tage unter den automatischen Planungs-Guardrail fallen. Ob die Implementierung dann blockiert, warnt oder eine weiche Empfehlung zeigt, ist aktuell bewusst nicht vorab festgelegt.
