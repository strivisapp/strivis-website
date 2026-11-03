import { Link } from "react-router-dom";
import { LegalPage } from "@/components/site/LegalPage";

const LIST = "list-disc space-y-2 pl-5 marker:text-white/40";

// The German privacy policy at /de/datenschutz: a faithful translation of
// src/pages/Datenschutz.jsx with the same sections and facts, in the wording
// and terminology of the app's German legal text (strivis repo,
// src/lib/legalContent.js). Change both together.
// Draft wording, not legal advice: have it reviewed by someone qualified
// before relying on it. Created on 2026-11-03 for app version 1.1.
const PROVIDERS = [
  {
    name: "Supabase, Inc. (USA)",
    text: "Anmeldung und Authentifizierung des Kontos: deine E-Mail-Adresse, der Hash deines Passworts und die Anmeldekennungen von Apple oder Google, wenn du sie nutzt.",
  },
  {
    name: "Railway Corporation (USA)",
    text: "Hostet das Strivis-Backend und seine Datenbank in seiner europäischen Region. Die Datenbank speichert dein Profil, die oben beschriebenen Fitnessdaten, deine Einwilligungsnachweise und deine Community-Inhalte. Railway bewahrt außerdem die Anfrage-Logs des Backends auf: für jede Anfrage deine IP-Adresse, den Zeitpunkt und die angefragte Adresse. Wir nutzen diese Logs nur, um den Dienst am Laufen und sicher zu halten (Art. 6 Abs. 1 lit. f DSGVO), und Railway löscht sie automatisch nach seiner Aufbewahrungsfrist für Logs.",
  },
  {
    name: "Cloudflare, Inc. (USA)",
    text: "Speichert die Dateien, die du hochlädst, etwa dein Profilbild, Beitragsfotos und Fortschrittsfotos, in seinem R2-Speicher in Europa und liefert Bilder über sein Content Delivery Network (cdn.strivis.app) an die App aus. Bei Registrierung und Zurücksetzen des Passworts prüft Cloudflare Turnstile, ob du ein Mensch und kein Bot bist; es erhält dafür deine IP-Adresse und technische Informationen über dein Gerät und deinen Browser.",
  },
  {
    name: "Have I Been Pwned, Pwned Passwords (Australien)",
    text: "Bei Registrierung und Zurücksetzen des Passworts prüft die App, ob dein neues Passwort in bekannten Datenlecks vorkommt. Sie sendet nur die ersten fünf Zeichen eines Hashs (SHA-1) deines Passworts, nie das Passwort selbst oder deine E-Mail-Adresse (das Verfahren der k-Anonymität). Der Dienst sieht deine IP-Adresse.",
  },
  {
    name: "Apple",
    text: "Vertreibt die App über den App Store (der die Kaufhistorie verarbeitet), stellt Push-Mitteilungen über den Apple Push Notification service zu (das Push-Token deines Geräts) und gibt uns, wenn du „Mit Apple anmelden“ nutzt, deine Apple-Kennung, deine E-Mail-Adresse oder Apples Weiterleitungsadresse und deinen Namen, wenn du ihn teilen möchtest.",
  },
  {
    name: "Google LLC (USA)",
    text: "Wenn du die Anmeldung mit Google nutzt, gibt uns Google deine Google-Kontokennung, deine E-Mail-Adresse und deinen Namen.",
  },
  {
    name: "Base44 (Wix.com Ltd., Israel)",
    text: "Ein Bild, das hochgeladen wurde, bevor Strivis auf eigene Server umgezogen ist, wird noch von base44.app geladen. Wenn die App es anzeigt, erhält Base44 deine IP-Adresse und technische Informationen über dein Gerät.",
  },
];

const SECTIONS = [
  {
    heading: "Welche Daten wir erheben",
    body: `Zu den personenbezogenen Daten, die Strivis selbst oder über Dritte erhebt, gehören: Name, E-Mail-Adresse, Passwort, IP-Adresse, Geräteinformationen, Nutzungsdaten, Nutzer-ID, Kaufhistorie, die unten beschriebenen Gesundheits- und Fitnessdaten, deine Erfolge und Teilnahmen an der Monats-Challenge, die Inhalte, die du in der Community teilst, und Nachweise der Einwilligungen, die du gibst.`,
  },
  {
    heading: "Mindestalter",
    body: `Strivis ist nur für Menschen ab 18 Jahren, in jedem Land, auch in den USA. Im Onboarding fragen wir nach deinem Geburtsdatum, um das zu prüfen. Dein Geburtsdatum speichern wir nicht: Wir behalten dein Alter (für deine Kalorien- und Makroziele) und dass du bestätigt hast, 18 oder älter zu sein, mit dem Zeitpunkt. Ergibt das Datum, dass du jünger als 18 bist, wird nichts gespeichert: Die Onboarding-Antworten auf deinem Gerät werden gelöscht, ein bereits mit Apple oder Google begonnenes Konto wird gelöscht, und 24 Stunden lang zeigt das Gerät, dass Strivis für Erwachsene ist, statt erneut zu fragen. Bestehende Konten werden einmal gebeten, ihr Alter zu bestätigen; ein Konto, dessen Nutzer sich als jünger als 18 herausstellt, wird gesperrt, sein Profil und seine Beiträge werden sofort in der Community ausgeblendet, und es wird nach 30 Tagen gelöscht. Wenn du glaubst, dass uns eine Person unter 18 personenbezogene Daten gegeben hat, melde dich bei uns, dann löschen wir sie.`,
  },
  {
    heading: "Gesundheits- und Fitnessdaten",
    body: `Um personalisierte Trainings- und Ernährungspläne bereitzustellen, erhebt Strivis Daten, die du direkt eingibst: Körperdaten (Gewicht, Größe, Alter, Geschlecht, Zielgewicht), Verletzungen und Allergien, die du angibst, Beschwerden, die du angibst (den Bereich, etwa Knie oder unterer Rücken, und ob er geschont oder komplett ausgespart werden soll), Ernährungsvorlieben und Ernährungsziele, geloggte Trainings (Übungen, Sätze, Wiederholungen und Gewichte), Cardio-Einheiten (Art, Beginn, Dauer und, wenn du sie einträgst, Strecke) und wie viele Cardio-Einheiten pro Woche du anstrebst, geloggte Mahlzeiten, Supplements und Wassermenge sowie Fortschrittsfotos, die du hochlädst. Deine Onboarding-Antworten bleiben auf deinem Gerät, bis du dein Konto erstellst, und werden dann darin gespeichert. Deine Kalorien- und Makroziele werden aus diesen Daten berechnet, auch aus deinem Körpergewicht und deinem Ziel. Diese Daten werden ausschließlich genutzt, um deine persönlichen Trainings- und Ernährungspläne zu erstellen und zu verfolgen, und für die darauf aufbauenden Funktionen (Erfolge, Kraftstufen, die Monats-Challenge und der Jahresrückblick, unten beschrieben), und sind mit deinem Konto verknüpft. Sie werden nicht für Werbe- oder Marketingzwecke an Dritte weitergegeben.`,
  },
  {
    heading: "Deine Einwilligung in die Verarbeitung von Gesundheitsdaten",
    body: `Gesundheitsdaten sind eine besondere Kategorie personenbezogener Daten (Art. 9 DSGVO). Wir verarbeiten sie nur mit deiner ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die du beim Erstellen deines Kontos mit „Einwilligen und fortfahren“ unter einem eigenen Einwilligungstext gibst, getrennt von der Annahme der AGB. Wir speichern, wann du sie gegeben hast und welche Fassung des Einwilligungstexts du gesehen hast. Du kannst sie jederzeit in den Datenschutzeinstellungen der App widerrufen (Einstellungen › Privatsphäre). Der Widerruf berührt nicht die Verarbeitung, die davor stattgefunden hat. Weil Strivis deine Pläne und Ziele ohne diese Daten nicht berechnen kann, führt dich die App danach dazu, deine Gesundheitsdaten oder dein Konto zu löschen.`,
  },
  {
    heading: "Registrierung",
    body: `Wenn du ein Strivis-Konto erstellst, erheben wir deine E-Mail-Adresse und dein Passwort oder die Angaben, die uns Apple oder Google geben, wenn du dich damit anmeldest (siehe unten), um dich zu authentifizieren und die Kernfunktionen der App bereitzustellen. Außerdem speichern wir, wann du die AGB und diese Datenschutzerklärung angenommen hast und welche Fassungen, damit wir das später belegen können (Art. 6 Abs. 1 lit. c und f DSGVO).`,
  },
  {
    heading: "Community und öffentliche Inhalte",
    children: (
      <>
        <p>
          Strivis hat eine Community. Dein Profil (Name, Handle, Profilbild und Bio) und die Beiträge, Kommentare,
          Reaktionen und Erfolge, die du teilst, sehen andere Strivis-Nutzer. Du wählst einen Namen und einen Handle,
          bevor du zum ersten Mal etwas postest, kommentierst, reagierst oder jemandem folgst. Andere Nutzer können dich
          über Name oder Handle finden, auch wenn dein Profil privat ist: Ein privates Profil zeigt weiterhin Name,
          Handle, Foto und Bio, den Rest nur bestätigten Followern.
        </p>
        <p>
          Standardmäßig ist dein Profil öffentlich, neue Beiträge sind für alle in der Community sichtbar, und neue
          Erfolge in Gold und Selten werden automatisch mit deinen Followern geteilt (siehe Erfolge unten). Unter
          Einstellungen › Privatsphäre kannst du dein Profil auf privat stellen, sodass neue Follower deine Bestätigung
          brauchen und deine Beiträge, Erfolge und Trainingszahlen nur für bestätigte Follower sind, und wählen, wer neue
          Beiträge sieht (alle, deine Follower oder nur du). Einem öffentlichen Profil kann jeder folgen.
          Fortschrittsfotos bleiben privat.
        </p>
        <p>
          <span className="font-semibold text-white">Was ein Beitrag zeigt.</span> Ein Beitrag kann einen Titel, einen
          Text und ein Foto haben. Ein Trainingsbeitrag zeigt die Dauer, das Volumen, die Zahl der Übungen und Sätze,
          deine Rekorde aus diesem Training mit Gewicht und Wiederholungen und die trainierten Muskelgruppen; geöffnet
          listet er die Übungen mit ihren Sätzen und Wiederholungen auf, ohne Gewichte. Wer einen solchen Beitrag sehen
          darf, kann seine Übungen, Sätze und Wiederholungen in einen eigenen Plan kopieren (du wirst darüber informiert)
          und eine Kopie eines Rezepts speichern, das du postest. Eine gespeicherte Kopie bleibt bei der Person, auch wenn
          du deinen Beitrag später löschst. Dein Körpergewicht erscheint nie in Beiträgen oder auf deinem Profil.
        </p>
        <p>
          <span className="font-semibold text-white">Trainingszahlen auf deinem Profil.</span> Deine Trainings, Wochen in
          Folge, die letzten 12 Wochen und deine drei schwersten Übungen sehen andere nur, wenn du auf deinem Profil
          „Statistiken öffentlich zeigen“ einschaltest. Standardmäßig ist das aus.
        </p>
        <p>
          <span className="font-semibold text-white">Highlights der Woche.</span> Oben im Feed stehen Personen mit einem
          Rekord in einem öffentlichen Beitrag in den letzten 7 Tagen, öffentliche Profile, die in den letzten 7 Tagen
          ihren Namen bestätigt haben, und Trainingsserien ab zwei Wochen von Personen mit öffentlichem Profil, die
          „Statistiken öffentlich zeigen“ eingeschaltet haben. Der offizielle Strivis-Account postet sonntags einen
          Wochenrückblick nur mit Gesamtzahlen (Trainings, Rekorde, neue Mitglieder). Private Profile erscheinen nie in den
          Highlights.
        </p>
        <p>
          Mitteilungen über Aktivität in der Community nennen die andere Person, und eine Mitteilung über einen Kommentar
          enthält seinen Text; sie werden über Apples Push-Dienst zugestellt. Links zu Profilen und Beiträgen
          (strivis.app/u/… und strivis.app/p/…) öffnen sich in der App; diese Website zeigt die Inhalte selbst nie. Wir
          verarbeiten Community-Inhalte, um dir die Community bereitzustellen, für die du dich angemeldet hast (Art. 6
          Abs. 1 lit. b DSGVO).
        </p>
      </>
    ),
  },
  {
    heading: "Automatische Prüfung von Community-Fotos",
    body: `Vor deinem ersten Community- oder Profilfoto fragt dich die App einmal, ob unser Server deine Community-Fotos zur automatischen Prüfung an Anthropic, PBC (USA) senden darf. Ohne dein Ja kannst du der Community keine Fotos hinzufügen, und unser Server setzt das durch. Diese Einwilligung ist getrennt von deiner Einwilligung in die KI-Funktionen; keine von beiden ersetzt die andere. Mit deinem Ja geht jedes Foto, das du in der Community zeigst (ein Beitragsfoto oder ein Profilfoto), sofort online. Direkt danach sendet unser Server das Foto an Anthropic, dessen Modell es einordnet als in Ordnung, unklar oder klarer Verstoß (Nacktheit, sexuelle Inhalte, Gewalt, Hass). Dein Name und deine E-Mail-Adresse werden nicht gesendet, und die App entfernt Standort und andere Metadaten vor dem Hochladen auf deinem Gerät aus dem Foto. Fortschrittsfotos und Fotos von Mahlzeiten gehören nicht dazu. Ein klarer Verstoß wird automatisch entfernt: Der Beitrag bleibt ohne das Foto, du bekommst in der App einen Hinweis mit dem Grund und kannst 30 Tage lang Widerspruch einlegen; dann entscheidet ein Mensch. Ein entferntes Foto bewahren wir diese 30 Tage privat auf und löschen es dann. Zwei Entfernungen innerhalb von 30 Tagen sperren das Hinzufügen von Fotos für 30 Tage. Ein unklares Foto bleibt online und kommt auf unsere Moderationsliste, wo ein Mensch entscheidet; das gilt auch, wenn eine Prüfung nach mehreren Versuchen weiterhin fehlschlägt. Wir bekommen dann über Brevo (Sendinblue SAS, Frankreich) eine E-Mail, die nur sagt, was passiert ist, und die Kennung der Prüfung nennt, ohne das Foto, einen Namen oder etwas, das du geschrieben hast. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und, soweit ein Foto etwas über deine Gesundheit verraten kann, Art. 9 Abs. 2 lit. a DSGVO). Wir speichern, wann du sie gegeben hast und welche Fassung des Einwilligungstexts du gesehen hast. Du kannst sie jederzeit in der App widerrufen (Einstellungen › Privatsphäre). Der Widerruf berührt nicht die Prüfungen davor; danach werden keine weiteren deiner Fotos an Anthropic gesendet, du kannst der Community keine neuen Fotos hinzufügen, und was bereits online ist, bleibt, bis du es löschst. Fotos, die von Personen ohne diese Einwilligung bereits online sind, bleiben online und werden nicht an Anthropic gesendet, auch wenn die Einwilligung später kommt; für sie gelten weiterhin Meldungen und manuelle Moderation.`,
  },
  {
    heading: "Erfolge",
    children: (
      <>
        <p>
          Strivis hat 76 Erfolge in vier Stufen (Bronze, Silber, Gold, Selten); manche bleiben geheim, bis du sie
          erreichst. Unser Server entscheidet, ob du einen erreicht hast, aus dem, was ohnehin in deinem Konto liegt:
          Trainings, Cardio, Rekorde, Mahlzeiten, Wasser, Gewichtseinträge, Körpermaße, die Tatsache und das Datum von
          Fortschrittsfotos, deine Aktivität in der Community und Monats-Challenges und, bei Erfolgen zu Tageszeit und
          Datum, deine Trainingszeiten und deine Zeitzone. Wir speichern, welche Erfolge du erreicht hast, wann und ob du
          sie gesehen hast.
        </p>
        <p>
          <span className="font-semibold text-white">Wer sie sieht.</span> Erfolge zu Training und Community sieht jeder,
          der dein Profil sehen darf; bei einem privaten Profil deine bestätigten Follower. Diese bleiben bei dir allein:
          Erfolge zu Ernährung, Erfolge zum Körper (Fortschrittsfotos, Körpermaße, Gewichtseinträge) und acht persönliche,
          drei dazu, wann du trainierst, und fünf dazu, wie viel du im Verhältnis zu deinem Körpergewicht bewegst.
        </p>
        <p>
          <span className="font-semibold text-white">Automatische Beiträge.</span> Wenn du einen neuen Erfolg in Gold oder
          Selten zu Training oder Community erreichst, geht ein Beitrag darüber an deine Follower (nur an dich, wenn dein
          Standard für neue Beiträge „Nur ich“ ist). Du kannst das unter Einstellungen › Privatsphäre › Erfolge automatisch
          teilen ausschalten. Alles andere wird nur geteilt, wenn du es selbst teilst. Ein Story-Bild entsteht auf deinem
          Gerät und geht über das Teilen-Menü deines iPhones an die App, die du wählst.
        </p>
        <p>
          „Haben auch“ zeigt, welcher Anteil der aktiven Nutzer einen Erfolg hat, als Prozentzahl ohne Namen, sobald es
          mindestens 1.000 aktive Nutzer gibt.
        </p>
        <p>
          Wir verarbeiten diese Daten, um die Funktion bereitzustellen (Art. 6 Abs. 1 lit. b DSGVO), und, soweit sie auf
          Gesundheitsdaten wie Körpergewicht oder Ernährung beruhen, auf Grundlage deiner Einwilligung (Art. 9 Abs. 2 lit.
          a DSGVO). „Daten zurücksetzen“ in der App entfernt erreichte Erfolge und Challenge-Teilnahmen nicht; das Löschen
          deines Kontos schon.
        </p>
      </>
    ),
  },
  {
    heading: "Monats-Challenge",
    body: `Du nimmst nur teil, wenn du auf „Mitmachen“ tippst. Wir speichern dann den Monat, dein persönliches Ziel (berechnet aus deinem wöchentlichen Trainingsziel), wann du beigetreten bist und wann du sie geschafft hast. Dein Fortschritt ist die Zahl der Tage, an denen du in diesem Monat trainiert hast, gezählt aus deinen Trainings und deinem Cardio. Ein gemeinsamer Zähler zeigt die Gesamtzahlen der Community (Teilnehmende, Trainings, Ziel) und erscheint erst ab 20 Teilnehmenden, damit eine sich ändernde Zahl niemandem verrät, wann eine einzelne Person trainiert hat. Er zeigt nie Namen, und andere können nicht sehen, ob du in diesem Monat teilnimmst. Geschaffte Challenges können Community-Erfolge bringen, die wie oben beschrieben auf deinem Profil sichtbar sind. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO und, für deine Trainingsdaten, deine Einwilligung (Art. 9 Abs. 2 lit. a DSGVO).`,
  },
  {
    heading: "Jahresrückblick",
    body: `Vom 1. Dezember bis zum 31. Januar kann die App dein Strivis-Jahr zeigen: Trainings, Cardio-Einheiten, Volumen, deine häufigste Übung, deine längste Serie, Rekorde und Erfolge. Unser Server berechnet es auf Anfrage aus deinen eigenen Daten und behält das Ergebnis höchstens einen Tag im Arbeitsspeicher. Nur du siehst es, außer du teilst sein Bild über das Teilen-Menü deines iPhones. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO und, für deine Trainingsdaten, deine Einwilligung (Art. 9 Abs. 2 lit. a DSGVO).`,
  },
  {
    heading: "Kraftstufen und Rekorde",
    body: `Für sechs Grundübungen vergleicht Strivis dein geschätztes Ein-Wiederholungs-Maximum mit deinem Körpergewicht am Datum des Satzes und zeigt eine Stufe von Einsteiger bis Elite. Um den Standard für Männer oder Frauen zu wählen, nutzt es das Geschlecht in deinem Profil; ist es „divers“ oder leer, wählst du selbst einen Standard, und wir speichern deine Wahl in deinen Einstellungen. Die App berechnet die Stufe auf deinem Gerät, und unser Server berechnet sie aus denselben Daten (Sätze, Gewichtseinträge, Geschlecht oder gewählter Standard), um die davon abhängigen Erfolge zu prüfen. Andere sehen weder deine Stufe noch dein Körpergewicht, und die Erfolge für „Stark“ oder „Elite“ in einer Grundübung sind persönliche, die bei dir allein bleiben. Die Rekorde pro Übung werden aus deinen geloggten Sätzen berechnet. Rechtsgrundlage ist deine Einwilligung in die Verarbeitung von Gesundheitsdaten (Art. 9 Abs. 2 lit. a DSGVO).`,
  },
  {
    heading: "Abwicklung von Zahlungen",
    body: `Strivis bietet In-App-Käufe (Premium-Abos) an, die über den Apple App Store abgewickelt werden. Strivis ist an der Erhebung und Verarbeitung deiner Zahlungsdaten nicht beteiligt; das übernimmt direkt Apple und teilt Strivis nur mit, ob eine Zahlung abgeschlossen wurde. Der Kaufstatus wird außerdem über RevenueCat, Inc. (USA) verwaltet, das deine Nutzer-ID, Geräteinformationen und Nutzungsdaten verarbeitet, um deinen Abo-Status über deine Geräte hinweg abzugleichen. RevenueCat gibt der App beim ersten Start, bevor du ein Konto hast, eine zufällige, anonyme ID, damit ein Kauf im Onboarding mit dem Konto verknüpft werden kann, das du danach erstellst.`,
  },
  {
    heading: "Plattformdienste und Hosting",
    children: (
      <>
        <p>
          Strivis nutzt die folgenden Dienstleister. Jeder verarbeitet Daten im Auftrag von Strivis (als
          Auftragsverarbeiter) oder, bei Apple und Google, als Anbieter des Stores oder Anmeldedienstes, den du gewählt
          hast.
        </p>
        <ul className={LIST}>
          {PROVIDERS.map((p) => (
            <li key={p.name}>
              <span className="font-semibold text-white">{p.name}.</span> {p.text}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: "KI-generierte Pläne",
    body: `Wenn du einen KI-Trainings- oder Ernährungsplan anforderst, und einmal automatisch direkt nach dem Erstellen deines Kontos, wenn du Premium hast (dein erster Ernährungsplan, aus deinen Onboarding-Antworten), sendet Strivis die für diesen Plan nötigen Angaben (etwa dein Ziel, deine Erfahrung, Trainingstage, Ausstattung, dein Körpergewicht, angegebene Verletzungen und Beschwerden, Ernährungsvorlieben, Allergien, Lebensmittel, die du nicht magst, Ernährungsziele und die Namen deiner eigenen Übungen) an Anthropic, PBC (USA), das den Plan erstellt. Dein Name und deine E-Mail-Adresse werden nicht gesendet. Anthropic verarbeitet diese Daten nur, um die Antwort zu erstellen, und nutzt sie nicht zum Training seiner Modelle.`,
  },
  {
    heading: "Mahlzeiten per Foto",
    body: `Wenn du eine Mahlzeit per Foto hinzufügst, verkleinert die App das Foto zuerst und entfernt seinen Standort und andere Metadaten auf deinem Gerät. Dann sendet sie das Foto und deine optionale Notiz an Anthropic, PBC (USA), das die Lebensmittel erkennt und ihre Mengen schätzt; die Nährwerte stammen aus den eigenen Lebensmitteldatenbanken von Strivis, und nur für ein Gericht, das keine von ihnen kennt, wird die Schätzung des Modells genutzt, in der App als geschätzt markiert. Das geschieht nur nach deiner Einwilligung in die KI-Funktionen, für die Fassung dieser Einwilligung, die Fotos nennt (Art. 6 Abs. 1 lit. a DSGVO und, soweit das Foto etwas über deine Ernährung verrät, Art. 9 Abs. 2 lit. a DSGVO). Strivis speichert das Foto nicht, weder auf seinen Servern noch bei der Mahlzeit; wir speichern nur, dass eine Analyse stattgefunden hat, um sie auf das Nutzungslimit anzurechnen und für einen Ernährungs-Erfolg, den nur du siehst. Bitte fotografiere keine Menschen. Du kannst die Einwilligung jederzeit in der App widerrufen (Einstellungen › Privatsphäre).`,
  },
  {
    heading: "Absturzberichte und App-Analysen",
    body: `Um Fehler zu finden und zu beheben, senden die App und das Backend Absturz- und Fehlerberichte an Sentry (Functional Software, Inc., USA) über dessen EU-Datenregion. Nur wenn du es in der App erlaubst (Art. 6 Abs. 1 lit. a DSGVO), zeichnet die App außerdem wenige Nutzungsereignisse auf (zum Beispiel, dass ein Training abgeschlossen wurde), bei PostHog (PostHog, Inc., USA) über dessen EU-Datenregion, ohne Cookies, automatisches Klick-Tracking oder Sitzungsaufzeichnungen und ohne deine Gesundheitswerte. Diese Ereignisse sind mit deiner Strivis-Konto-ID verknüpft, nicht mit deinem Namen oder deiner E-Mail-Adresse, sie sind also pseudonym, nicht anonym. Wir speichern, ob und wann du diese Einwilligung gegeben oder widerrufen hast. Solange du sie nicht erlaubst, wird PostHog nicht geladen und nichts gesendet. Du kannst deine Einwilligung jederzeit in der App unter Einstellungen › Privatsphäre › Nutzungsdaten teilen widerrufen.`,
  },
  {
    heading: "Abfragen von Nährwertdaten",
    body: `Wenn du nach einem Lebensmittel suchst, fragt die App Open Food Facts (Verein Open Food Facts, Frankreich) direkt von deinem Gerät ab; Open Food Facts erhält also deine IP-Adresse und den Suchbegriff, aber keine Kontodaten. Barcode-Abfragen und USDA FoodData Central (Landwirtschaftsministerium der USA) laufen über unser Backend; diese Dienste erhalten also weder deine IP-Adresse noch deine Kontodaten.`,
  },
  {
    heading: "Diese Website",
    children: (
      <>
        <p>
          Diese Website wird von Vercel Inc. (USA) gehostet, das technische Zugriffsdaten wie deine IP-Adresse verarbeitet,
          um die Seiten auszuliefern. Vercel stellt außerdem die Seite bereit, die die App für die oben beschriebene
          Prüfung durch Cloudflare Turnstile nutzt.
        </p>
        <p>
          <span className="font-semibold text-white">Frühere Warteliste und Launch-E-Mail.</span> Die Warteliste wurde mit
          dem Launch der App geschlossen, und diese Website erhebt keine Adressen mehr. Wenn du dich davor eingetragen
          hast, speichern wir deine E-Mail-Adresse, deine Browsersprache, das genutzte Formular und wann du dich
          eingetragen, eingewilligt und bestätigt hast, in der Strivis-Datenbank. Die E-Mails laufen über Brevo (Sendinblue
          SAS, Frankreich): eine E-Mail, mit der du deine Adresse bestätigst (Double-Opt-in), und erst nach deiner
          Bestätigung die Launch-E-Mail. Jede E-Mail hat einen Abmeldelink. Rechtsgrundlage ist deine Einwilligung (Art. 6
          Abs. 1 lit. a DSGVO), die du jederzeit über diesen Link oder mit einer Nachricht an uns widerrufen kannst. Nach
          deiner Abmeldung behalten wir deine Adresse nur auf einer Sperrliste, damit wir dir nie wieder schreiben.
        </p>
        <p>
          <span className="font-semibold text-white">Meta-Pixel.</span> Nur mit deiner Einwilligung (Art. 6 Abs. 1 lit. a
          DSGVO und § 25 Abs. 1 TDDDG) nutzt diese Website das Meta-Pixel (Meta Platforms Ireland Ltd.), um unsere Werbung
          zu messen. Es setzt die Cookies _fbp und _fbc und sendet Meta die Seitenadresse, die verweisende Seite, deine
          IP-Adresse, Informationen über deinen Browser und das Ereignis „Seitenaufruf“ (solange die Warteliste offen war,
          auch „Eintragung in die Warteliste“). Deine E-Mail-Adresse senden wir Meta nicht. Für das Erheben und Übermitteln
          dieser Daten sind Strivis und Meta Platforms Ireland Ltd. gemeinsam Verantwortliche (Art. 26 DSGVO) nach Metas
          Controller Addendum; allein Meta ist dafür verantwortlich, was es danach mit den Daten macht, einschließlich der
          Übermittlung an Meta Platforms, Inc. in den USA. Du kannst deine Rechte bei uns oder bei Meta ausüben. Deine
          Auswahl wird in deinem Browser gespeichert (localStorage), nicht in einem Cookie.
        </p>
        <p>
          Du kannst deine Einwilligung jederzeit mit „Cookie-Einstellungen“ unten auf jeder Seite widerrufen: Wähle
          „Ablehnen“. Das Pixel stoppt dann, wir löschen die Cookies _fbp und _fbc auf strivis.app, und das Pixel wird erst
          wieder geladen, wenn du erneut akzeptierst.
        </p>
        <p>
          <span className="font-semibold text-white">Link-Seite.</span> strivis.app/links (und /de/links), die Seite, die
          von unserem Instagram-Profil verlinkt ist, setzt keine Cookies, lädt kein Meta-Pixel und zeigt keinen
          Einwilligungsbanner. Ihr App-Store-Button nutzt Apples Kampagnenlink: Apple teilt uns dann in App Store Connect
          nur mit, wie viele App-Store-Aufrufe und Downloads über diesen Link kamen, als Gesamtzahlen ohne personenbezogene
          Daten.
        </p>
      </>
    ),
  },
  {
    heading: "Unser Instagram-Profil",
    body: `Wir betreiben das Instagram-Profil @strivisofficial (Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland). Wenn du es besuchst, verarbeitet Meta deine Daten nach seiner eigenen Datenschutzrichtlinie (https://privacycenter.instagram.com/policy), auch über Cookies und ähnliche Technologien, und kann Daten an Meta Platforms, Inc. in den USA übermitteln. Für die Seitenstatistiken („Insights“), die Meta aus diesen Besuchen erstellt und uns zeigt, sind Strivis und Meta Platforms Ireland Ltd. gemeinsam Verantwortliche (Art. 26 DSGVO) nach Metas Page Insights Controller Addendum (https://www.facebook.com/legal/terms/page_controller_addendum); Meta ist vorrangig für diese Daten und für die Beantwortung von Anfragen dazu verantwortlich. Wir sehen nur zusammengefasste Statistiken und können daraus keine einzelnen Besucher erkennen. Wenn du uns schreibst oder kommentierst, verarbeiten wir, was du schreibst, um dir zu antworten, auf Grundlage unseres berechtigten Interesses an der Kommunikation mit Menschen, die sich für Strivis interessieren (Art. 6 Abs. 1 lit. f DSGVO). Du kannst deine Rechte bei Meta oder bei uns ausüben.`,
  },
  {
    heading: "Apple Health und Apple Watch",
    body: `Auf dem iPhone kann Strivis Daten mit Apple Health (HealthKit) austauschen. Jeder Teil ist aus, bis du ihn in der App einschaltest (Einstellungen › Apple Health); iOS fragt dann um deine Erlaubnis: (1) Trainings sichern: Wenn du ein Training beendest, speichert Strivis es als Krafttraining mit Beginn, Ende und Namen in Apple Health. (2) Körpergewicht: Strivis liest dein Körpergewicht aus Apple Health und übernimmt es für Tage ohne eigenes Gewicht in deinen Gewichtsverlauf in Strivis. (3) Cardio: Strivis liest Ausdauertrainings aus Apple Health, etwa Laufen, Gehen, Wandern, Radfahren, Rudern, Schwimmen, Treppensteigen und HIIT ab 10 Minuten, und speichert Art, Beginn, Dauer und Strecke in deinem Strivis-Konto, wo sie für dein wöchentliches Cardio-Ziel und deine Serie zählen. Auf dem iPhone liest Strivis weder Herzfrequenz noch Routen oder andere Health-Daten und liest nie die Trainings zurück, die es selbst gespeichert hat. Wenn du Körpergewicht oder Cardio einschaltest, schaut Strivis 30 Tage zurück und prüft danach bei jedem Öffnen der App auf neue Einträge. Daten aus Apple Health verarbeiten wir auf Grundlage deiner Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), nutzen sie nur für diese Funktionen, speichern sie wie oben beschrieben mit deinen anderen Fitnessdaten, nutzen sie nie für Werbung oder Marketing und verkaufen sie nicht und geben sie nicht an Dritte für deren eigene Zwecke weiter. Du kannst jeden Teil in der App ausschalten, Strivis den Zugriff in der Health-App entziehen (Teilen › Apps › Strivis) und übernommene Cardio-Einheiten im Kalender der App löschen; das Entfernen einer Einheit aus Strivis ändert Apple Health nicht. Installierst du die Strivis-App auf deiner Apple Watch, schickt dein iPhone ihr, was die Uhr anzeigt: dein nächstes geplantes Training (Übungen, Sätze, vorgeschlagene Gewichte und Wiederholungen), deinen heutigen Stand und deine Ziele (Trainings dieser Woche, Kalorien, Protein, Wasser), deine Sprache und Gewichtseinheit sowie ein laufendes Training. Die Uhr speichert das auf der Uhr, auch für ihre Komplikationen, damit du dort ohne dein iPhone trainieren kannst. Wenn du auf der Uhr ein Training startest oder die Uhr eines aufzeichnet, das du auf deinem iPhone gestartet hast, fragt watchOS einmal um Erlaubnis: Während des Trainings liest die Uhr deine Herzfrequenz und aktiven Kalorien aus Apple Health, um sie anzuzeigen, und speichert das Training am Ende als Krafttraining mit seinen Kalorien in Apple Health. Herzfrequenz und Kalorien bleiben auf deiner Uhr und in Apple Health; Strivis sendet sie weder an deine iPhone-App noch an unsere Server und speichert sie nicht in deinem Konto. Die Uhr schickt deinem iPhone, direkt zwischen deinen Geräten, die Sätze, die du auf ihr abhakst, ein auf ihr beendetes Training (Übungen, Sätze, Gewichte, Wiederholungen, Datum und Dauer) und das Wasser, das du einträgst; die iPhone-App speichert sie wie Einträge vom Telefon in deinem Strivis-Konto, und ein auf der Uhr beendetes Training wird als solches markiert, was einen Erfolg bringen kann. Hat die Uhr ein Training in Apple Health gespeichert, speichert das iPhone es dort nicht ein zweites Mal. Wenn du dich auf deinem iPhone abmeldest, entfernen die Uhr und ihre Komplikationen deine Daten. Du kannst der Uhr den Health-Zugriff in der Health-App auf deinem iPhone entziehen (Teilen › Apps › Strivis) und die Uhr-App in der Watch-App auf deinem iPhone entfernen.`,
  },
  {
    heading: "Gleichwertiger Schutz von Nutzerdaten",
    body: `Strivis gibt Nutzerdaten nur an sorgfältig ausgewählte Dritte weiter, um sicherzustellen, dass sie denselben oder einen gleichwertigen Schutz von Nutzerdaten bieten, wie er in dieser Datenschutzerklärung beschrieben und von den geltenden Datenschutzgesetzen verlangt wird.`,
  },
  {
    heading: "Übermittlung in Drittländer",
    body: `Einige der oben genannten Dienste haben ihren Sitz außerhalb des Europäischen Wirtschaftsraums: in den USA (Supabase, Railway, Cloudflare, RevenueCat, Apple, Google, Anthropic, PostHog, Sentry und Vercel; Meta kann Daten an Meta Platforms, Inc. übermitteln), in Australien (Have I Been Pwned) und in Israel (Base44). Werden deine personenbezogenen Daten außerhalb des Europäischen Wirtschaftsraums übermittelt, stützen wir uns auf geeignete Garantien, etwa einen Angemessenheitsbeschluss der Europäischen Kommission, die Zertifizierung des Empfängers nach dem EU-U.S. Data Privacy Framework oder die Standardvertragsklauseln der Europäischen Kommission, damit deine Daten geschützt bleiben.`,
  },
  {
    heading: "Art und Ort der Verarbeitung",
    body: `Daten werden mit Computern und IT-gestützten Werkzeugen verarbeitet, nach organisatorischen Abläufen, die sich strikt an den oben genannten Zwecken ausrichten. Je nach deinem Standort können Daten in ein anderes Land als deines übermittelt werden, insbesondere in die USA, wo die oben genannten Anbieter Daten wie beschrieben verarbeiten.`,
  },
  {
    heading: "Speicherdauer",
    body: `Wir speichern deine Kontodaten, solange dein Konto besteht. Wenn du die Löschung deines Kontos verlangst, in den Einstellungen der App oder mit einer Nachricht an uns, löschen wir dein Profil und die zugehörigen personenbezogenen Daten innerhalb weniger Tage, sofern uns keine gesetzliche Aufbewahrungspflicht verpflichtet, bestimmte Unterlagen länger aufzubewahren. Nachweise deiner Einwilligungen behalten wir, solange wir uns auf sie stützen und sie belegen müssen könnten. Ein von der automatischen Prüfung entferntes Foto wird 30 Tage privat aufbewahrt und dann gelöscht. Eine Adresse aus der früheren Warteliste behalten wir, bis du dich abmeldest oder ihre Löschung verlangst, und nicht länger, als wir sie für die Launch-E-Mail brauchen, abgesehen von der oben beschriebenen Sperrliste.`,
  },
  {
    heading: "Deine Rechte nach der DSGVO",
    body: `Wenn du dich in der Europäischen Union befindest, hast du das Recht, eine Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO; das berührt nicht die Verarbeitung vor dem Widerruf), der Verarbeitung zu widersprechen, Auskunft über deine Daten zu erhalten, Berichtigung zu verlangen, die Verarbeitung einschränken zu lassen, Löschung zu verlangen, deine Daten in einem übertragbaren Format zu erhalten und dich bei deiner zuständigen Datenschutzaufsichtsbehörde zu beschweren.`,
  },
  {
    heading: "So übst du diese Rechte aus",
    children: (
      <p>
        Jede Anfrage zur Ausübung deiner Rechte, auch zur Löschung von Konto und Daten, kannst du an die oben genannte
        Kontakt-E-Mail senden. Anfragen sind kostenlos und werden so früh wie möglich beantwortet, immer innerhalb eines
        Monats. Um Inhalte zu melden, die das Urheberrecht verletzen oder aus anderen Gründen rechtswidrig sind, siehe{" "}
        <Link to="/copyright" className="text-white underline hover:text-primary">
          Urheberrecht und Meldungen
        </Link>
        .
      </p>
    ),
  },
];

export default function DatenschutzDe() {
  return (
    <LegalPage
      lang="de"
      title="Datenschutzerklärung"
      updated="3. November 2026"
      sections={[
        {
          heading: "Inhaber und Verantwortlicher",
          children: (
            <p>
              Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld, Deutschland
              <br />
              Kontakt-E-Mail: strivisofficial@gmail.com
            </p>
          ),
        },
        ...SECTIONS,
      ]}
    />
  );
}
