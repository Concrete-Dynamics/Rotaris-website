import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function Privacy() {
  return (
    <LegalDocument
      title="Privacy policy"
      source={LEGAL_DOCUMENTS.privacy}
      intro={
        <>
          {/* The package's privacy statement covers the product and the cloud
              service and explicitly excludes this website, so the website's own
              processing is stated here. */}
          <div className="card card-accented legal-facts">
            <span className="card-kicker">Diese Website</span>
            <p className="card-body">
              Die nachstehende Erklärung gilt für die Rotaris-Anwendung und Rotaris Cloud.
              Für diese Website selbst gilt Folgendes — sie ist statisch und verarbeitet
              nichts über den Seitenabruf hinaus:
            </p>
            <ul className="legal-facts-list">
              <li>
                Keine Cookies, kein Local Storage, kein Session Storage.
              </li>
              <li>
                Keine Analyse- oder Trackingdienste.
              </li>
              <li>
                Keine Ressourcen von Dritten zur Laufzeit — Schriften und Symbole werden
                von derselben Domain ausgeliefert, es geht keine Anfrage an ein CDN oder
                an Google Fonts.
              </li>
              <li>
                Kein Konto, kein Formular, keine Übermittlung von Eingaben.
              </li>
              <li>
                Die Erkennung des Betriebssystems für die Download-Empfehlung wertet die
                Browserkennung ausschließlich lokal aus.
              </li>
              <li>
                Es bleiben die Zugriffsprotokolle des Webservers (IP-Adresse, Zeitpunkt,
                angefragter Pfad, Statuscode) auf Grundlage von Art. 6 Abs. 1 lit. f
                DSGVO. Verantwortlicher und Betroffenenrechte wie unter Ziffer 1 und 9.
              </li>
            </ul>
            <p className="card-body legal-facts-note">
              Diese Aufstellung beschreibt den heutigen Stand dieser Website und ist bei
              jeder Änderung zu prüfen. Sie ist der Platz für die gesonderte
              Website-Datenschutzerklärung, auf die die nachstehende Erklärung in ihrem
              einleitenden Absatz verweist, und ersetzt deren anwaltliche Prüfung nicht.
            </p>
          </div>
        </>
      }
    />
  )
}
