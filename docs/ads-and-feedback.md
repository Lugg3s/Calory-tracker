# Werbung & Feedback — spätere Produktstufe

Dieses Dokument beschreibt eine **spätere Monetarisierungs- und Feedback-Funktion** für Theo. Sie ist **nicht Teil des aktuellen V1/MVP-Scopes**.

## Grundidee

Theo soll in einer späteren Produktstufe Werbung enthalten können. Gleichzeitig soll es in der App einen leicht erreichbaren Feedback-Kanal geben, über den Nutzer Rückmeldung zur App geben können.

Um qualifiziertes erstes Feedback attraktiver zu machen, erhält ein Nutzer beim **ersten erfolgreich abgegebenen Feedback einmalig 24 Stunden Werbefreiheit**.

## Entschiedene Richtung

- Die App kann später Werbung anzeigen.
- Nutzer können innerhalb der App Feedback abgeben.
- **Nur beim ersten erfolgreich übermittelten Feedback** gibt es eine Belohnung.
- Die Belohnung sind **24 Stunden ohne Werbung**.
- Während dieses Zeitraums werden alle regulären Werbeeinblendungen für diesen Nutzer deaktiviert.
- Weitere Feedbacks bleiben möglich, lösen aber **keine erneute Werbefreiheit** aus.
- Der Belohnungsstatus muss so gespeichert werden, dass die einmalige Belohnung nicht durch wiederholtes Feedback oder simples erneutes Öffnen des Feedback-Screens erneut ausgelöst werden kann.
- Die Belohnung wird erst aktiviert, nachdem das Feedback tatsächlich erfolgreich übermittelt wurde.

## Missbrauch vermeiden

Die Belohnung soll Nutzer zu echtem Feedback motivieren und nicht zu bedeutungslosen Einträgen nur für die Werbefreiheit.

Noch **nicht entschieden** ist, welche Mindestanforderung ein Feedback erfüllen muss, um als qualifiziertes erstes Feedback zu gelten. Denkbare Varianten sind beispielsweise:

- eine Mindesttextlänge;
- mindestens eine beantwortete strukturierte Frage;
- eine Kombination aus Bewertung und optionalem Freitext;
- keine inhaltliche Mindesthürde, dafür serverseitig nur genau eine Belohnung pro Nutzer/Konto.

Die konkrete Regel soll später so gewählt werden, dass sie Missbrauch reduziert, ohne ehrliches kurzes Feedback unnötig zu erschweren.

## Technische Anforderungen für später

Für die spätere Umsetzung muss mindestens ein dauerhafter Status vorhanden sein, sinngemäß:

```text
first_feedback_reward_claimed = true/false
ad_free_until = timestamp | null
```

Nach erfolgreichem ersten qualifizierten Feedback:

```text
first_feedback_reward_claimed = true
ad_free_until = reward_start + 24 Stunden
```

Solange `current_time < ad_free_until`, darf die App keine regulären Werbeanzeigen ausspielen.

Die genaue Speicherung für Gäste gegenüber angemeldeten Konten ist noch offen. Bei Konten sollte die Belohnung geräteübergreifend konsistent sein. Für reine Gastnutzung muss später entschieden werden, wie ein Reset durch Neuinstallation bzw. Löschen lokaler Daten behandelt wird.

## Noch offen

- Ab welcher Produktversion Werbung überhaupt eingeführt wird.
- Welche Werbeformate und Positionen verwendet werden.
- Ob es zusätzlich einen dauerhaft werbefreien Bezahlplan gibt.
- Welche Feedback-Mindestanforderung für die einmalige Belohnung gilt.
- Ob die 24 Stunden exakt ab erfolgreicher Übermittlung laufen oder bis zu einem festen Zeitpunkt des Folgetags.
- Wie die Belohnung für Gastnutzer manipulationsresistent gespeichert wird.
- Welcher Feedback-Dienst bzw. welches Backend verwendet wird.
- Welche Datenschutz-/Einwilligungsanforderungen für Werbung und Feedback gelten.
