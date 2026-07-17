"use client";

import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { ShieldCheck, AlertTriangle } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-text">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text">Datenschutzerklärung</h1>
            <p className="text-sm text-text-faint">Stand: 14. Juli 2026</p>
          </div>
        </div>

        <div className="mb-10 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-text">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning" />
          <div>
            <p className="mb-1 font-bold">Hinweis vor Veröffentlichung</p>
            <p className="text-text-muted">
              Dieser Text beschreibt wahrheitsgemäß, welche Dienste CertCoach aktuell technisch einsetzt
              (Supabase als Datenbank- und Authentifizierungs-Anbieter, Vercel als Hosting- und
              Analytics-Anbieter, Stripe als Zahlungsdienstleister; kein Video-/Sprachanruf-Dienst im Einsatz;
              kein Google Analytics oder vergleichbare Drittanbieter-Tracking-Tools). Da sich die Kombination
              aus Zahlungsabwicklung, internationalen Datenübermittlungen und Auftragsverarbeitung schnell
              ändern kann, empfehlen wir, diesen Text vor dem Livegang mit Zahlungsfunktion einmalig von einem
              Rechtsanwalt oder Datenschutzbeauftragten prüfen zu lassen.
            </p>
          </div>
        </div>

        <Section title="1. Verantwortlicher">
          <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
          <p>
            Ataullah Senmas
            <br />
            Mudweg 17
            <br />
            63897 Miltenberg
            <br />
            Deutschland
          </p>
          <p>E-Mail: info@certcoach.de</p>
        </Section>

        <Section title="2. Allgemeines zur Datenverarbeitung">
          <p>
            Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
            Bereitstellung einer funktionsfähigen Plattform sowie unserer Inhalte und Leistungen erforderlich
            ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung des Nutzers oder auf Basis einer
            gesetzlichen Rechtsgrundlage (Art. 6 Abs. 1 DSGVO), insbesondere zur Vertragserfüllung (lit. b)
            oder aufgrund berechtigter Interessen (lit. f).
          </p>
        </Section>

        <Section title="3. Hosting und Server-Logfiles">
          <p>
            Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. Bei
            jedem Aufruf der Website erfasst der Hosting-Anbieter automatisch Informationen in sogenannten
            Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind: IP-Adresse, Datum und Uhrzeit
            der Anfrage, Browsertyp und -version, verwendetes Betriebssystem sowie die zuvor besuchte Seite
            (Referrer-URL). Diese Daten sind nicht bestimmten Personen zuordenbar und werden ausschließlich zur
            Gewährleistung eines störungsfreien Betriebs sowie zur Verbesserung unseres Angebots ausgewertet.
            Rechtsgrundlage ist unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Da Vercel Inc.
            ihren Sitz in den USA hat, findet eine Datenübermittlung in ein Drittland statt; Vercel stützt sich
            hierfür auf die EU-Standardvertragsklauseln (Durchführungsbeschluss (EU) 2021/914) sowie das
            UK-Addendum als Übermittlungsmechanismus gemäß Art. 46 DSGVO.
          </p>
        </Section>

        <Section title="4. Registrierung und Nutzerkonto">
          <p>
            Für die Nutzung von CertCoach ist die Erstellung eines Nutzerkontos erforderlich. Bei der
            Registrierung erheben wir folgende Daten: E-Mail-Adresse, Passwort (verschlüsselt gespeichert),
            sowie optional der von Ihnen angegebene vollständige Name. Diese Daten werden zur Bereitstellung
            und Verwaltung Ihres Nutzerkontos sowie zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO
            verarbeitet.
          </p>
          <p>
            Die technische Speicherung erfolgt über unseren Datenbank- und Authentifizierungs-Dienstleister
            Supabase, Inc. Weitere Informationen zur Datenverarbeitung durch Supabase finden Sie unter{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://supabase.com/privacy
            </a>
            . Mit Supabase besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO, der die von der
            EU-Kommission genehmigten Standardvertragsklausen (Durchführungsbeschluss (EU) 2021/914) sowie das
            UK-Addendum für internationale Datenübermittlungen einschließt (abrufbar unter{" "}
            <a href="https://supabase.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              supabase.com/legal/dpa
            </a>
            ).
          </p>
        </Section>

        <Section title="5. Lernfortschritt und Nutzungsdaten">
          <p>
            Um Ihnen personalisierte Lerninhalte, Fortschrittsanzeigen und Empfehlungen anzeigen zu können,
            speichern wir Daten zu Ihrem Lernfortschritt (z. B. abgeschlossene Kurse, Testergebnisse,
            bearbeitete Übungsaufgaben). Diese Daten werden ausschließlich zur Vertragserfüllung
            (Bereitstellung der von Ihnen gebuchten Lernplattform) gemäß Art. 6 Abs. 1 lit. b DSGVO verarbeitet
            und nicht an Dritte zu Werbezwecken weitergegeben.
          </p>
        </Section>

        <Section title="6. Coach Live (Chat-Funktion)">
          <p>
            Die Funktion „Coach Live&rdquo; ermöglicht aktuell einen Echtzeit-Textchat zwischen Nutzern. Diese
            Chat-Funktion läuft technisch vollständig über unseren Datenbank-Dienstleister Supabase (siehe
            Abschnitt 4) und benötigt keinen zusätzlichen Drittanbieter. Eine Video- oder Sprachanruf-Funktion
            ist in Coach Live derzeit nicht aktiv; sollte diese Funktion künftig wieder eingeführt werden, wird
            dieser Abschnitt vor der Aktivierung um den dann genutzten Anbieter ergänzt.
          </p>
        </Section>

        <Section title="7. Zahlungsabwicklung">
          <p>
            Für die Abwicklung von Zahlungen nutzen wir den Zahlungsdienstleister Stripe Payments Europe,
            Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland. Über die von Stripe
            bereitgestellte Zahlungsseite („Stripe Checkout&rdquo;) können Sie je nach Verfügbarkeit per
            Kreditkarte, PayPal oder Klarna bezahlen; die jeweiligen Zahlungsdaten werden dabei direkt an Stripe
            bzw. den von Ihnen gewählten Zahlungsanbieter (PayPal, Klarna) als Unterauftragsverarbeiter
            übermittelt und nicht auf unseren eigenen Servern gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit.
            b DSGVO (Vertragserfüllung). Weitere Informationen entnehmen Sie der Datenschutzerklärung von
            Stripe:{" "}
            <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              stripe.com/de/privacy
            </a>
            .
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Cookies bzw. vergleichbare
            Speichertechnologien (z. B. zur Aufrechterhaltung Ihrer Anmeldesitzung). Diese sind gemäß § 25 Abs.
            2 TDDDG bzw. Art. 6 Abs. 1 lit. f DSGVO ohne gesonderte Einwilligung zulässig, da sie für den
            Betrieb der Website unbedingt erforderlich sind. Zur Analyse der Websitenutzung setzen wir Vercel
            Web Analytics ein; dieser Dienst arbeitet ohne Cookies oder vergleichbare Speichertechnologien und
            identifiziert Besucher stattdessen über einen aus der jeweiligen Anfrage gebildeten, nicht
            dauerhaft gespeicherten Hash-Wert (Sitzungsdauer max. 24 Stunden). Wir setzen aktuell keine
            Marketing- oder Tracking-Cookies von Drittanbietern ein. Sollte sich dies künftig ändern (z. B. durch
            Einsatz von Google Analytics), werden wir vor der Umsetzung ein Cookie-Consent-Banner mit
            Einwilligungsmöglichkeit einbauen und diesen Abschnitt entsprechend erweitern.
          </p>
        </Section>

        <Section title="9. Speicherdauer">
          <p>
            Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt bzw. sobald Sie
            Ihr Nutzerkonto löschen, soweit keine gesetzlichen Aufbewahrungspflichten (z. B. handels- oder
            steuerrechtliche Vorgaben, in der Regel 6–10 Jahre für Rechnungsdaten) entgegenstehen.
          </p>
        </Section>

        <Section title="10. Ihre Rechte">
          <p>Sie haben jederzeit das Recht:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 15 DSGVO),</li>
            <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO),</li>
            <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO),</li>
            <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO),</li>
            <li>Ihre Daten in einem übertragbaren Format zu erhalten (Art. 20 DSGVO),</li>
            <li>der Verarbeitung Ihrer Daten zu widersprechen (Art. 21 DSGVO),</li>
            <li>eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO).</li>
          </ul>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der
            Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt. Für den Verantwortlichen
            mit Sitz in Miltenberg, Bayern, ist zuständig:
          </p>
          <p>
            Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
            <br />
            Promenade 18
            <br />
            91522 Ansbach
            <br />
            <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.lda.bayern.de
            </a>
          </p>
        </Section>

        <Section title="11. Kontakt für Datenschutzanfragen">
          <p>
            Für Auskünfte, Berichtigungen, Löschungen oder sonstige Anliegen zum Datenschutz wenden Sie sich
            bitte an:{" "}
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
