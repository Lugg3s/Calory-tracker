# KFA-Referenzbilder

Originaldateien der vorab generierten Referenzbilder. Fachliche Grundlage: [KFA Reference Images V1](../../docs/kfa-reference-images-v1.md).

## Ablage und Index

Pfadschema: `<sex>/bucket-<n>/kfa-<percent>/front.png`.
Der maschinenlesbare [Index](index.json) enthält ausschließlich tatsächlich gespeicherte Bilder. Weitere Ansichten oder Varianten können später ergänzend abgelegt werden; bestehende Originale werden nicht stillschweigend ersetzt.

| ID | Geschlecht | Produktionsbucket | KFA-Zielanker | Bild |
| --- | --- | --- | --- | --- |
| male_bucket3_kfa10 | male | bucket-3 | ca. 10 % | [Frontansicht](male/bucket-3/kfa-10/front.png) |
| male_bucket3_kfa15 | male | bucket-3 | ca. 15 % | [Frontansicht](male/bucket-3/kfa-15/front.png) |
| male_bucket3_kfa20 | male | bucket-3 | ca. 20 % | [Frontansicht](male/bucket-3/kfa-20/front.png) |
| male_bucket3_kfa25 | male | bucket-3 | ca. 25 % | [Frontansicht](male/bucket-3/kfa-25/front.png) |
| male_bucket3_kfa30 | male | bucket-3 | ca. 30 % | [Frontansicht](male/bucket-3/kfa-30/front.png) |
| male_bucket3_kfa35 | male | bucket-3 | ca. 35 % | [Frontansicht](male/bucket-3/kfa-35/front.png) |
| male_bucket3_kfa40 | male | bucket-3 | ca. 40 % | [Frontansicht](male/bucket-3/kfa-40/front.png) |
| male_bucket3_kfa45 | male | bucket-3 | ca. 45 % | [Frontansicht](male/bucket-3/kfa-45/front.png) |
| female_bucket3_kfa15 | female | bucket-3 | ca. 15 % | [Frontansicht](female/bucket-3/kfa-15/front.png) |
| female_bucket3_kfa20 | female | bucket-3 | ca. 20 % | [Frontansicht](female/bucket-3/kfa-20/front.png) |
| female_bucket3_kfa25 | female | bucket-3 | ca. 25 % | [Frontansicht](female/bucket-3/kfa-25/front.png) |
| female_bucket3_kfa30 | female | bucket-3 | ca. 30 % | [Frontansicht](female/bucket-3/kfa-30/front.png) |
| female_bucket3_kfa35 | female | bucket-3 | ca. 35 % | [Frontansicht](female/bucket-3/kfa-35/front.png) |
| female_bucket3_kfa40 | female | bucket-3 | ca. 40 % | [Frontansicht](female/bucket-3/kfa-40/front.png) |
| female_bucket3_kfa45 | female | bucket-3 | ca. 45 % | [Frontansicht](female/bucket-3/kfa-45/front.png) |
| female_bucket3_kfa50 | female | bucket-3 | ca. 50 % | [Frontansicht](female/bucket-3/kfa-50/front.png) |

## Einordnung und Herkunft

### Bucket-3-Pilotserie, ergänzt am 11. September 2026

Die Pilotserie enthält jetzt 16 Einzelbilder: Männer 10/15/20/25/30/35/40/45 %, Frauen 15/20/25/30/35/40/45/50 %. Diese Produktionsstufen folgen der im begleitenden Chat konkretisierten Pilotplanung. Die ältere V1-Spezifikation bleibt als bisheriger Entscheidungsstand erhalten; eine globale Umstellung der App-Bildauswahl erfolgt hier nicht.

Die fünf neuen Männerbilder wurden direkt vom gespeicherten 20-%-Anker abgeleitet. Alle acht Frauenbilder verwenden die Frau rechts im [gemeinsamen Masterbild](masters/bucket-3/joint-master.png). Dieses vom Nutzer bereitgestellte Original (`Codex-Bild 11. Sept. 2026, 12_56_05.png`) wird unverändert aufbewahrt und bekommt keinen nachträglich geschätzten KFA-Wert. Alle neuen Bilder wurden mit dem eingebauten Imagegen-Werkzeug erzeugt; der jeweilige vollständige Prompt liegt neben `front.png` und ist im JSON-Index verlinkt.

**Prüfstatus:** Die Bilder wurden visuell auf vollständige Frontansicht, grundlegende Anatomie, Kleidung, Hintergrund und Wiedererkennbarkeit geprüft. Sie sind Produktionsentwürfe, keine validierte KFA-Skala. Besonders die Abstände der Frauenstufen 15/20 und 40/45 sowie der Männerstufen 30/35 sollten gemeinsam kalibriert werden. Kleine Abweichungen in Stand, Bildmaßstab und Kleidungsdetails sind vorhanden; eine pixelgenau identische Pose oder konstante Muskelmasse ist durch die Generierung nicht nachgewiesen. Alle Indexeinträge behalten deshalb `validationStatus: pending`.

Die Variante `male_bucket3_kfa10` wurde mit Imagegen aus `male_bucket3_kfa15` erstellt und unverändert gespeichert. Ziel ist eine weitere Verringerung des sichtbaren Körperfetts bei gleichbleibender Person, Muskelmasse, Pose, Kleidung und Beleuchtung. Der [Generierungsprompt](male/bucket-3/kfa-10/prompt.txt) liegt beim Bild. Die 10-%-Einordnung ist ein visueller Zielanker; die finale Validierung bleibt offen.

Die Variante `male_bucket3_kfa15` wurde mit Imagegen aus `male_bucket3_kfa20` erstellt und unverändert gespeichert. Ziel ist eine moderate Verringerung des sichtbaren Körperfetts bei gleichbleibender Person, Muskelmasse, Pose, Kleidung und Beleuchtung. Der [Generierungsprompt](male/bucket-3/kfa-15/prompt.txt) liegt beim Bild. Die 15-%-Einordnung ist ein visueller Zielanker; die finale Validierung bleibt offen.

Das erste Bild ist der männliche Pilotserien-Anker aus dem Chat „main chat“, übernommen aus der vom Nutzer bereitgestellten PNG. Die Datei wurde unverändert kopiert.

`male`, `bucket-3` und `kfa-20` sind die vom Nutzer vorgegebenen Produktionsmetadaten. Der KFA-Wert ist ein beabsichtigter visueller Anker, kein am Bild gemessener oder medizinisch validierter Wert. Die finale Qualitätsprüfung bleibt offen.

Die bestehende V1-Spezifikation verwendet A–E für die BMI-basierte Bildauswahl. Eine verbindliche Zuordnung von `bucket-3` zu diesen BMI-Buckets wird hier nicht neu festgelegt. Auch die dokumentierte KFA-Stufenreihe und bestehende Master-Entscheidungen bleiben unverändert. Dieses Einzelbild ersetzt kein gemeinsames Master-/Stilreferenzbild.
