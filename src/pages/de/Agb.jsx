import { Link } from "react-router-dom";
import { LegalPage } from "@/components/site/LegalPage";

const LIST = "list-disc space-y-2 pl-5 marker:text-white/40";
const A = "text-white underline hover:text-primary";

// Apple's standard Licensed Application End User License Agreement.
const APPLE_EULA_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

// The German terms at /de/agb: a faithful translation of src/pages/Agb.jsx
// with the same sections and facts, in the wording and terminology of the
// app's German legal text (strivis repo, src/lib/legalContent.js). Change
// both together.
// Draft wording, not legal advice: have it reviewed by someone qualified
// before relying on it. Created on 2026-11-03 for app version 1.1.
const SECTIONS = [
  {
    heading: "1. Geltungsbereich",
    body: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der App Strivis (die „App“) in der kostenlosen und in der kostenpflichtigen Version (Premium). Du akzeptierst sie, wenn du dein Konto erstellst: Die Registrierung weist vor dem Fortfahren auf sie hin.`,
  },
  {
    heading: "2. Leistungsbeschreibung",
    body: `Strivis bietet Funktionen für Training, Ernährung und Fortschritt, darunter KI-generierte Trainingspläne, eine Übungsdatenbank, Ernährungstracking mit Nährwertdatenbanken Dritter, Analysen, Mahlzeiten per Foto, Erfolge und eine Monats-Challenge sowie eine Community, in der Nutzer Beiträge, Fotos, Kommentare, Reaktionen und Erfolge teilen. Strivis ersetzt keine professionelle medizinische, Ernährungs- oder Trainingsberatung.`,
  },
  {
    heading: "3. Registrierung, Konto und Mindestalter",
    body: `Für die Nutzung der App brauchst du ein Nutzerkonto. Du musst mindestens 18 Jahre alt sein, um Strivis zu nutzen, in jedem Land, auch in den USA; mit dem Erstellen eines Kontos bestätigst du das. Deine Angaben müssen zutreffen, und dein Passwort musst du geheim halten. Erfahren wir, dass ein Nutzer jünger als 18 ist, sperren wir das Konto und löschen es nach 30 Tagen.`,
  },
  {
    heading: "4. Premium-Abo",
    children: (
      <>
        <p>
          Strivis Premium ist eine kostenpflichtige Erweiterung mit wöchentlichen, monatlichen oder jährlichen Abos, zu den
          Preisen, die in der App angezeigt werden. Käufe verkauft und berechnet Apple über den App Store; bezahlt wird über
          deine Apple-ID, sobald du den Kauf bestätigst.
        </p>
        <ul className={LIST}>
          <li>
            Ein Abo verlängert sich automatisch um denselben Zeitraum zu dem im App Store angezeigten Preis, wenn du es
            nicht mindestens 24 Stunden vor Ablauf des laufenden Zeitraums kündigst.
          </li>
          <li>
            Du kannst ein Abo jederzeit in den Abo-Einstellungen deiner Apple-ID (App-Store-Einstellungen) auf deinem Gerät
            kündigen oder verwalten. Wenn du die App löschst, ist ein Abo damit nicht gekündigt.
          </li>
          <li>
            Wird eine kostenlose Testphase angeboten, geht sie an ihrem Ende automatisch in ein kostenpflichtiges Abo über,
            wenn du nicht mindestens 24 Stunden vor ihrem Ende kündigst. Wenn Mitteilungen erlaubt sind, erinnert dich die
            App zwei Tage vor dem Ende der Testphase.
          </li>
          <li>Kaufbelege verschickt Apple. Erstattungen übernimmt Apple nach seinen eigenen Bedingungen.</li>
        </ul>
        <p>
          Zusätzlich zu diesen AGB gilt für deine Nutzung der App Apples Standard-Endnutzer-Lizenzvertrag (
          <a href={APPLE_EULA_URL} className={A} target="_blank" rel="noreferrer">
            Licensed Application End User License Agreement
          </a>
          ). Außerdem gelten die eigenen Bedingungen des Apple App Store für Käufe, Kündigung und Erstattungen.
        </p>
      </>
    ),
  },
  {
    heading: "5. Nutzerinhalte",
    body: `Inhalte, die du selbst erstellst oder hochlädst (zum Beispiel Fortschrittsfotos, eigene Übungen, Rezepte, Beiträge, Kommentare, dein Profilbild und deine Bio), bleiben deine. Du räumst uns ein nicht ausschließliches, weltweites, unentgeltliches Recht ein, diese Inhalte zu speichern, zu verarbeiten, zu vervielfältigen und anzuzeigen und ihr Format anzupassen (zum Beispiel Bilder zu verkleinern), ausschließlich um die Funktionen der App bereitzustellen und sie dem von dir gewählten Publikum zu zeigen (zum Beispiel allen in der Community, deinen Followern oder nur dir). Dieses Recht endet, wenn du den Inhalt oder dein Konto löschst, abgesehen von Sicherungskopien, die im normalen Ablauf gelöscht werden.`,
  },
  {
    heading: "6. Community-Regeln",
    children: (
      <>
        <p>
          Poste nur Inhalte, die du selbst erstellt hast oder teilen darfst. Anstößige Inhalte und missbräuchliches
          Verhalten von Nutzern dulden wir nicht, ohne Ausnahme. Nicht erlaubt sind insbesondere:
        </p>
        <ul className={LIST}>
          <li>rechtswidrige Inhalte und Inhalte, die Rechte anderer verletzen (Urheberrecht, Marken, Privatsphäre, das Recht am eigenen Bild);</li>
          <li>Nacktheit, sexuelle oder pornografische Inhalte;</li>
          <li>Gewalt, Drohungen, Belästigung, Mobbing, Hassrede und Diskriminierung;</li>
          <li>
            Inhalte, die zu gefährlichem Verhalten ermutigen, etwa extremen Diäten, Essstörungen, Selbstverletzung oder dem
            Gebrauch von Doping oder illegalen Substanzen;
          </li>
          <li>Spam, Werbung und das Vortäuschen, jemand anderes zu sein;</li>
          <li>personenbezogene Daten anderer ohne deren Einwilligung.</li>
        </ul>
        <p>
          Du kannst Beiträge, Kommentare und Nutzer in der App melden und Nutzer blockieren. Wir prüfen Meldungen, entfernen
          anstößige Inhalte und sperren oder entfernen Nutzer, die sie posten. Wir bemühen uns, innerhalb von 24 Stunden auf
          Meldungen zu reagieren.
        </p>
        <p>
          Fotos, die du in der Community teilst (Beitragsfotos und Profilfotos), werden außerdem automatisch von einem
          KI-Modell auf Nacktheit, sexuelle Inhalte, Gewalt und Hass geprüft. Die App fragt dich vor deinem ersten solchen
          Foto einmal nach deiner Einwilligung dazu; ohne sie kannst du der Community keine Fotos hinzufügen. Ein Foto, das
          klar gegen diese Regeln verstößt, wird automatisch entfernt, der Beitrag bleibt. Du erfährst den Grund in der App
          und kannst 30 Tage lang Widerspruch einlegen; dann entscheidet ein Mensch. Ein unklares Foto bleibt online, bis es
          sich ein Mensch angesehen hat. Zwei Entfernungen innerhalb von 30 Tagen sperren das Hinzufügen von Fotos für 30
          Tage. Fotos, die von Personen ohne diese Einwilligung bereits online sind, werden nicht auf diese Weise geprüft;
          für sie gelten weiterhin Meldungen und manuelle Moderation.
        </p>
      </>
    ),
  },
  {
    heading: "7. Urheberrecht und wiederholte Verletzungen",
    children: (
      <p>
        Wenn du glaubst, dass Inhalte in Strivis dein Urheberrecht verletzen oder aus einem anderen Grund rechtswidrig sind,
        folge den Schritten auf unserer Seite{" "}
        <Link to="/copyright" className={A}>
          Urheberrecht und Meldungen
        </Link>
        ; du brauchst dafür kein Konto. Konten mit drei bestätigten Entfernungen wegen Urheberrechtsverletzung werden
        gesperrt.
      </p>
    ),
  },
  {
    heading: "8. Hinweis zu Gesundheit und Sicherheit",
    body: `Strivis, einschließlich der KI-generierten Trainings- und Ernährungspläne, ist kein Medizinprodukt und bietet keine medizinische, Ernährungs- oder Trainingsberatung durch zugelassene Fachleute. Alle Inhalte dienen nur der Information und Motivation. Mengen und Werte aus einem Foto einer Mahlzeit sind Schätzungen, prüfe sie also, bevor du sie einträgst. Kraftstufen vergleichen deine Leistungen mit Referenzwerten und sind keine Gesundheitsbewertung. Sprich mit einer Ärztin oder einem Arzt, bevor du ein neues Trainings- oder Ernährungsprogramm beginnst, besonders wenn du eine Vorerkrankung oder Verletzung hast oder schwanger bist. Du nutzt die Trainings- und Ernährungsfunktionen der App auf eigenes Risiko und trägst alle Risiken, die mit körperlichem Training verbunden sind.`,
  },
  {
    heading: "9. Ausschluss der Gewährleistung",
    body: `Die App wird so bereitgestellt, wie sie ist und wie sie verfügbar ist, ohne ausdrückliche oder stillschweigende Gewährleistung jeglicher Art, auch nicht für Marktgängigkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung von Rechten Dritter. Wir gewährleisten nicht, dass die App ohne Unterbrechung, fehlerfrei oder frei von schädlichen Bestandteilen läuft.`,
  },
  {
    heading: "10. Haftungsbeschränkung",
    body: `Soweit gesetzlich zulässig, ist unsere gesamte Haftung aus oder im Zusammenhang mit diesen AGB oder der App auf den Betrag beschränkt, den du uns in den zwölf Monaten vor dem Anspruch gezahlt hast, falls du etwas gezahlt hast. Für mittelbare Schäden, Neben- und Folgeschäden sowie Strafschadensersatz haften wir nicht, außer wenn die Haftung gesetzlich nicht beschränkt werden kann (zum Beispiel bei Vorsatz oder grober Fahrlässigkeit).`,
  },
  {
    heading: "11. Links und Dienste Dritter",
    body: `Die App kann auf Websites, Datenbanken (etwa Open Food Facts oder USDA FoodData Central) oder Dienste (etwa den Apple App Store) Dritter verweisen oder sie einbinden, auf die wir keinen Einfluss haben. Für Inhalte, Richtigkeit und Vorgehensweisen dieser Dritten sind wir nicht verantwortlich.`,
  },
  {
    heading: "12. Kündigung und Löschung des Kontos",
    body: `Du kannst dein Konto jederzeit in den Einstellungen der App oder mit einer Nachricht an uns löschen. Mit der Löschung werden deine personenbezogenen Daten nach unserer Datenschutzerklärung entfernt. Wenn du gegen diese AGB verstößt, insbesondere gegen die Community-Regeln, können wir deinen Zugang sperren oder beenden. Wenn du dein Konto löschst, ist ein App-Store-Abo damit nicht gekündigt; kündige es wie in Abschnitt 4 beschrieben.`,
  },
  {
    heading: "13. Änderungen dieser AGB",
    body: `Wir können diese AGB mit Wirkung für die Zukunft ändern. Über wesentliche Änderungen informieren wir dich in der App, bevor sie wirksam werden.`,
  },
  {
    heading: "14. Anwendbares Recht",
    body: `Für diese AGB gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts, soweit gesetzlich zulässig.`,
  },
];

export default function AgbDe() {
  return <LegalPage lang="de" title="Allgemeine Geschäftsbedingungen" updated="3. November 2026" sections={SECTIONS} />;
}
