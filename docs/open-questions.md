# Offene Fragen

Diese Liste wird während der Produktentwicklung fortlaufend ergänzt.

## Berechnung

- Welche BMR-Formel verwenden wir?
- Wie wird TDEE aus Grundumsatz und Aktivität modelliert?
- Wie werden Schritte zusätzlich berücksichtigt, ohne Doppelzählung mit einem Aktivitätsfaktor?
- Wie wird Sport berücksichtigt?
- Wie werden unterschiedliche Sportarten und Trainingsintensitäten modelliert?
- Wie genau soll KFA in die Berechnung einfließen?
- Wann ist KFA optional, wann erforderlich?
- Welche Grenzen gelten für das empfohlene Defizit?
- Welche Methode verwenden wir für die Projektion über längere Zeiträume?
- Wie berücksichtigen wir metabolische Anpassungen und sinkenden Energiebedarf bei Gewichtsverlust?

## Wissenschaft

- Welcher Wert pro kg Fettmasse soll als Modellannahme verwendet werden?
- Welche Literatur unterstützt diesen Wert und welche Einschränkungen gibt es?
- Welche Proteinempfehlung ist bei Energiedefizit optimal?
- Ist 1,2 g/kg für nicht trainierende Nutzer sinnvoll als Standard?
- Ist 2,0 g/kg für Kraft-/Leistungssportler sinnvoll als MVP-Standard?
- Ist 0,8 g/kg Fett als Mindestwert für die App geeignet?
- Soll Protein bei vorhandenem KFA eher auf fettfreie Masse als auf Körpergewicht bezogen werden?

## Produkt / UX

- Wie detailliert soll die Berechnung standardmäßig sichtbar sein?
- Welche Werte dürfen Nutzer manuell überschreiben?
- Wie stark soll die App Nutzer vor sehr aggressiven Zielen warnen?
- Wie werden Schätzungen und Unsicherheit dargestellt?
- Wie genau soll der einfache vs. erweiterte Tracking-Modus aussehen?

## Food Tracking

- Welche Lebensmittel-Datenbank verwenden wir?
- Wie werden Portionsgrößen geschätzt?
- Wie werden unbekannte Mengen behandelt?
- Welche Funktionen sind ohne LLM sinnvoll?

## AI

- Welches LLM?
- Welcher Speech-to-Text-Dienst?
- Welche strukturierte Schnittstelle zwischen LLM und Ernährungsdatenbank?
- Wie werden Halluzinationen bzw. falsche Nährwertangaben verhindert?
- Welche Daten dürfen an externe Modelle übertragen werden?

## Tech Stack

- Frontend / Mobile Framework
- Backend
- Datenbank
- Authentifizierung
- Hosting
- Analytics
- KI-Infrastruktur
