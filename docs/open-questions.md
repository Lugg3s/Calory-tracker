# Offene Fragen

Diese Liste wird während der Produktentwicklung fortlaufend ergänzt.

## Berechnung

- Welche BMR-Formel verwenden wir?
- Wie wird TDEE aus Grundumsatz und Aktivität modelliert?
- Wie werden Schritte zusätzlich berücksichtigt, ohne Doppelzählung mit einem Aktivitätsfaktor?
- Wie wird Sport berücksichtigt?
- Wie werden unterschiedliche Sportarten und Trainingsintensitäten modelliert?
- Wie genau soll KFA in die Berechnung einfließen?
- Welche Grenzen gelten für das empfohlene Defizit?
- Welche Methode verwenden wir für die Projektion über längere Zeiträume?
- Wie berücksichtigen wir metabolische Anpassungen und sinkenden Energiebedarf bei Gewichtsverlust?
- Wie wird aus dem durchschnittlichen täglichen Kalorienziel ein Wochenbudget abgeleitet?
- Wie wird ein geplanter Cheat Day in das Wochenbudget eingerechnet, ohne das geplante durchschnittliche Defizit über die Woche unbeabsichtigt zu verändern?
- Wie werden die Kalorien auf Cheat Day und übrige Wochentage verteilt, und welche Grenzen gelten für diese Umverteilung?

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
- Müssen Trainingsdauer und/oder Trainingsintensität als zusätzliche bedingte Onboarding-Screens vor der ersten Planberechnung erfasst werden, oder können diese Angaben erst später unter „Plan verfeinern“ ergänzt werden?
- Wie genau soll der geplante Cheat-Day-Screen im Onboarding aussehen?
- Ist ein Cheat Day optional, welcher Wochentag wird gewählt und wie viel zusätzliches Kalorienbudget kann der Nutzer dafür einplanen?
- Soll die App statt des Begriffs „Cheat Day“ eventuell eine neutralere Bezeichnung wie „flexibler Tag“ oder „höheres Tagesbudget“ verwenden?
- Wie genau wird aus Größe und Gewicht die interne Körperform-/Referenzkategorie für KFA-Vergleichsbilder abgeleitet?
- Wie viele Körperform-/Referenzkategorien brauchen wir, damit die Bildbibliothek klein bleibt und die Beispiele trotzdem hilfreich sind?
- Welche Grenzwerte sollen diese Kategorien haben, und wie vermeiden wir irreführende Zuordnungen bei sehr muskulösen oder anderweitig atypischen Körperzusammensetzungen?
- Welche KFA-Spanne soll die Referenzbibliothek abdecken und bleiben 5-Prozentpunkt-Schritte als Standard geeignet?
- Reicht für die erste Version eine Frontansicht pro Referenzkombination oder brauchen wir zusätzliche Bildansichten?
- Wie stellen wir bei KFA-Referenzbildern klar genug dar, dass Körperform und Fettverteilung individuell variieren und die Bilder nur eine grobe Orientierung sind?

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
