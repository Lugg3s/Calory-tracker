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

## Einordnung und Herkunft

Die Variante `male_bucket3_kfa10` wurde mit Imagegen aus `male_bucket3_kfa15` erstellt und unverändert gespeichert. Ziel ist eine weitere Verringerung des sichtbaren Körperfetts bei gleichbleibender Person, Muskelmasse, Pose, Kleidung und Beleuchtung. Der [Generierungsprompt](male/bucket-3/kfa-10/prompt.txt) liegt beim Bild. Die 10-%-Einordnung ist ein visueller Zielanker; die finale Validierung bleibt offen.

Die Variante `male_bucket3_kfa15` wurde mit Imagegen aus `male_bucket3_kfa20` erstellt und unverändert gespeichert. Ziel ist eine moderate Verringerung des sichtbaren Körperfetts bei gleichbleibender Person, Muskelmasse, Pose, Kleidung und Beleuchtung. Der [Generierungsprompt](male/bucket-3/kfa-15/prompt.txt) liegt beim Bild. Die 15-%-Einordnung ist ein visueller Zielanker; die finale Validierung bleibt offen.

Das erste Bild ist der männliche Pilotserien-Anker aus dem Chat „main chat“, übernommen aus der vom Nutzer bereitgestellten PNG. Die Datei wurde unverändert kopiert.

`male`, `bucket-3` und `kfa-20` sind die vom Nutzer vorgegebenen Produktionsmetadaten. Der KFA-Wert ist ein beabsichtigter visueller Anker, kein am Bild gemessener oder medizinisch validierter Wert. Die finale Qualitätsprüfung bleibt offen.

Die bestehende V1-Spezifikation verwendet A–E für die BMI-basierte Bildauswahl. Eine verbindliche Zuordnung von `bucket-3` zu diesen BMI-Buckets wird hier nicht neu festgelegt. Auch die dokumentierte KFA-Stufenreihe und bestehende Master-Entscheidungen bleiben unverändert. Dieses Einzelbild ersetzt kein gemeinsames Master-/Stilreferenzbild.
