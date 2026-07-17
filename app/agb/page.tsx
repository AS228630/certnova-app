"use client";

import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-text">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

// Terms of Service for the CertCoach Pro subscription. Kept in German
// only (matching the existing Impressum/Datenschutz pattern) since this
// is a precise legal contract document, not general content — a single
// authoritative source avoids translation drift between versions.
export default function AgbPage() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text">Allgemeine Geschäftsbedingungen (AGB)</h1>
            <p className="text-sm text-text-faint">Stand: 17. Juli 2026</p>
          </div>
        </div>

        <Section title="1. Geltungsbereich und Vertragspartner">
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Ataullah Senmas,
            Mudweg 17, 63897 Miltenberg, Deutschland (E-Mail: info@certcoach.de) — nachfolgend „CertCoach&rdquo;
            oder „wir&rdquo; — und den Nutzern der Lernplattform CertCoach (erreichbar unter
            www.certcoach.de), nachfolgend „Nutzer&rdquo; oder „du&rdquo;.
          </p>
          <p>
            Abweichende, entgegenstehende oder ergänzende Bedingungen des Nutzers werden nicht Vertragsbestandteil,
            es sei denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </Section>

        <Section title="2. Leistungsbeschreibung">
          <p>
            CertCoach ist eine Online-Lernplattform für IT-Zertifizierungen (u. a. Microsoft, AWS, Google
            Cloud), Sprachkurse und Interviewvorbereitung. Der Funktionsumfang umfasst je nach gebuchtem Plan
            insbesondere: Lernmodule, Praxis-Labore, Übungsfragen und Prüfungssimulationen, Fortschrittsverfolgung
            sowie optionale KI-gestützte Unterstützung (KI Coach).
          </p>
          <p>
            Ein Basisumfang der Plattform steht im kostenlosen Plan zur Verfügung. Der erweiterte Funktionsumfang
            (u. a. unbegrenzte Labore, vollständige Fragenkataloge, KI-Unterstützung) ist im kostenpflichtigen Plan
            „CertCoach Pro&rdquo; enthalten. Der genaue Funktionsumfang der einzelnen Pläne ist auf der Preisseite
            (www.certcoach.de/pricing) beschrieben und Vertragsbestandteil.
          </p>
          <p>
            Die auf der Plattform bereitgestellten Inhalte dienen der Prüfungsvorbereitung und ersetzen keine
            offizielle Schulung des jeweiligen Zertifizierungsanbieters (z. B. Microsoft). CertCoach steht in
            keiner Verbindung zu Microsoft, AWS, Google oder anderen genannten Zertifizierungsanbietern; alle
            Marken- und Produktnamen sind Eigentum ihrer jeweiligen Inhaber und werden ausschließlich zur
            Beschreibung der abgedeckten Lerninhalte verwendet.
          </p>
        </Section>

        <Section title="3. Vertragsschluss und Registrierung">
          <p>
            Zur Nutzung von CertCoach ist die Erstellung eines Nutzerkontos erforderlich. Mit Abschluss der
            Registrierung kommt zwischen dir und uns ein Vertrag über die Nutzung der kostenlosen
            Basisfunktionen zustande.
          </p>
          <p>
            Ein kostenpflichtiger CertCoach-Pro-Vertrag kommt zustande, wenn du im Bestellprozess auf „Weiter
            zur Zahlung&rdquo; klickst, den Checkout über unseren Zahlungsdienstleister Stripe abschließt und
            die Zahlung erfolgreich verarbeitet wird. Du erhältst danach den vollständigen Zugriff auf die
            gebuchten Funktionen.
          </p>
          <p>
            Für die Registrierung musst du mindestens 16 Jahre alt sein. Minderjährige zwischen 16 und 18 Jahren
            benötigen die Zustimmung ihres gesetzlichen Vertreters für den Abschluss kostenpflichtiger Verträge.
          </p>
        </Section>

        <Section title="4. Preise und Zahlungsbedingungen">
          <p>
            Die aktuell gültigen Preise sind auf der Preisseite (www.certcoach.de/pricing) ausgewiesen. Alle
            Preise verstehen sich als Endpreise inklusive der gesetzlichen Umsatzsteuer, sofern anwendbar.
          </p>
          <p>
            Die Zahlungsabwicklung erfolgt über unseren Zahlungsdienstleister Stripe. Je nach Verfügbarkeit
            kannst du per Kreditkarte, PayPal oder Klarna bezahlen. Näheres zur Zahlungsabwicklung findest du in
            unserer Datenschutzerklärung (Abschnitt 7).
          </p>
          <p>
            CertCoach Pro wird als wiederkehrendes Abonnement (monatlich oder jährlich, je nach gewähltem Plan)
            angeboten. Der Abo-Betrag wird zu Beginn jeder Abrechnungsperiode automatisch über die von dir
            hinterlegte Zahlungsmethode abgebucht, bis das Abonnement gekündigt wird.
          </p>
        </Section>

        <Section title="5. Vertragslaufzeit und Kündigung">
          <p>
            CertCoach Pro verlängert sich automatisch um die jeweils gebuchte Abrechnungsperiode (Monat oder
            Jahr), sofern es nicht vor Ablauf der laufenden Periode gekündigt wird.
          </p>
          <p>
            Du kannst dein Abonnement jederzeit zum Ende der laufenden Abrechnungsperiode kündigen. Die
            Kündigung kann über die dauerhaft erreichbare Kündigungsfunktion unter www.certcoach.de/kuendigen
            erklärt werden. Bis zum Ende der bereits bezahlten Periode bleibt der volle Zugriff auf CertCoach
            Pro bestehen; eine anteilige Rückerstattung für die laufende Periode erfolgt nicht.
          </p>
          <p>
            Das Recht beider Parteien zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein
            wichtiger Grund liegt für uns insbesondere bei einem Verstoß gegen Abschnitt 6 dieser AGB vor.
          </p>
          <p>
            Informationen zum gesetzlichen Widerrufsrecht für Verbraucher findest du in unserer separaten
            Widerrufsbelehrung (www.certcoach.de/widerrufsrecht).
          </p>
        </Section>

        <Section title="6. Pflichten des Nutzers">
          <p>Bei der Nutzung von CertCoach verpflichtest du dich:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>wahrheitsgemäße Angaben bei der Registrierung zu machen und diese aktuell zu halten,</li>
            <li>deine Zugangsdaten geheim zu halten und nicht an Dritte weiterzugeben,</li>
            <li>
              dein Nutzerkonto nicht mit anderen Personen zu teilen; jedes Konto ist für die Nutzung durch eine
              einzelne Person bestimmt,
            </li>
            <li>
              die Inhalte der Plattform (u. a. Übungsfragen, Lernmaterialien, Videos) nicht zu vervielfältigen,
              weiterzuverbreiten, öffentlich zugänglich zu machen oder für Dritte kommerziell nutzbar zu machen,
            </li>
            <li>
              keine automatisierten Verfahren (Scraping, Bots) einzusetzen, um Inhalte der Plattform
              auszulesen oder herunterzuladen,
            </li>
            <li>die Plattform nicht für rechtswidrige Zwecke zu nutzen.</li>
          </ul>
          <p>
            Bei einem schwerwiegenden oder wiederholten Verstoß gegen diese Pflichten sind wir berechtigt, das
            Nutzerkonto zu sperren oder den Vertrag außerordentlich zu kündigen.
          </p>
        </Section>

        <Section title="7. Verfügbarkeit">
          <p>
            Wir sind bestrebt, die Plattform mit einer hohen Verfügbarkeit zu betreiben, können jedoch keine
            ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten, technische Störungen oder Ausfälle bei
            unseren Hosting- und Infrastrukturanbietern (Vercel, Supabase) können zu vorübergehenden
            Einschränkungen führen. Wir informieren, soweit zumutbar, im Voraus über geplante
            Wartungsfenster.
          </p>
        </Section>

        <Section title="8. Gewährleistung">
          <p>
            Es gelten die gesetzlichen Gewährleistungsrechte. Für kostenlos zur Verfügung gestellte
            Funktionen (z. B. der kostenlose Plan) ist unsere Gewährleistung ausgeschlossen, soweit gesetzlich
            zulässig.
          </p>
          <p>
            Die Inhalte der Plattform werden mit Sorgfalt erstellt und aktualisiert. Eine Garantie für das
            Bestehen einer bestimmten Zertifizierungsprüfung durch die Nutzung von CertCoach übernehmen wir
            nicht, da der Prüfungserfolg von vielen individuellen Faktoren abhängt, die außerhalb unseres
            Einflussbereichs liegen.
          </p>
        </Section>

        <Section title="9. Haftung">
          <p>
            Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach Maßgabe des
            Produkthaftungsgesetzes. Für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit,
            die auf einer fahrlässigen Pflichtverletzung von uns oder einer vorsätzlichen oder fahrlässigen
            Pflichtverletzung eines gesetzlichen Vertreters oder Erfüllungsgehilfen von uns beruhen, haften wir
            ebenfalls unbeschränkt.
          </p>
          <p>
            Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren
            Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren
            Einhaltung du regelmäßig vertrauen darfst, ist unsere Haftung auf den vertragstypisch
            vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung für leicht fahrlässige
            Pflichtverletzungen ausgeschlossen.
          </p>
          <p>Eine Haftung für Datenverlust ist auf den typischen Wiederherstellungsaufwand begrenzt, der bei regelmäßiger und gefahrentsprechender Datensicherung durch dich eingetreten wäre.</p>
        </Section>

        <Section title="10. Änderungen der AGB">
          <p>
            Wir behalten uns vor, diese AGB mit Wirkung für die Zukunft zu ändern, soweit dies aus rechtlichen
            oder technischen Gründen erforderlich wird oder das Vertragsgefüge nicht wesentlich verändert wird.
            Über Änderungen informieren wir dich mindestens sechs Wochen vor Inkrafttreten per E-Mail. Widersprichst
            du nicht innerhalb von sechs Wochen nach Zugang der Mitteilung, gelten die geänderten AGB als
            angenommen. Auf diese Rechtsfolge weisen wir dich in der Änderungsmitteilung gesondert hin. Im Fall
            eines Widerspruchs steht dir das ordentliche Kündigungsrecht nach Abschnitt 5 zu.
          </p>
        </Section>

        <Section title="11. Schlussbestimmungen">
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bist du
            Verbraucher und hast deinen gewöhnlichen Aufenthalt in einem anderen EU-Mitgliedstaat, bleiben die
            zwingenden verbraucherschützenden Vorschriften dieses Staates von dieser Rechtswahl unberührt.
          </p>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, abrufbar
            unter{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der
            übrigen Bestimmungen unberührt.
          </p>
        </Section>

        <Section title="12. Kontakt">
          <p>
            Fragen zu diesen AGB richtest du bitte an:{" "}
            <a href="mailto:info@certcoach.de" className="text-primary hover:underline">
              info@certcoach.de
            </a>
          </p>
        </Section>
      </main>

      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
  );
}
