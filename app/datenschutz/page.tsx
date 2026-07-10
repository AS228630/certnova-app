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

function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-warning/15 px-1.5 py-0.5 font-mono text-xs font-semibold text-warning">
      {children}
    </span>
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
            <p className="text-sm text-text-faint">Stand: <Fill>[Datum einfügen]</Fill></p>
          </div>
        </div>

        <div className="mb-10 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-text">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning" />
          <div>
            <p className="mb-1 font-bold">Hinweis vor Veröffentlichung</p>
            <p className="text-text-muted">
              Dieser Entwurf deckt die nach Art. 13 DSGVO gesetzlich vorgeschriebenen Angaben strukturell ab
              und beschreibt wahrheitsgemäß, welche Dienste CertCoach aktuell technisch einsetzt (Supabase als
              Hosting- und Datenbank-Anbieter; aktuell kein Google Analytics oder vergleichbare Tracking-Dienste
              im Einsatz). Alle mit <Fill>[…]</Fill> markierten Stellen müssen mit den echten Angaben des
              Betreibers ausgefüllt werden. Bitte diesen Text vor der Veröffentlichung von einem Rechtsanwalt
              oder Datenschutzbeauftragten prüfen lassen — insbesondere sobald Zahlungsdienste (z. B. PayPal)
              oder weitere Drittanbieter hinzukommen, muss der entsprechende Abschnitt ergänzt werden.
            </p>
          </div>
        </div>

        <Section title="1. Verantwortlicher">
          <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
          <p>
            <Fill>[Firmenname / Name des Betreibers]</Fill>
            <br />
            <Fill>[Straße und Hausnummer]</Fill>
            <br />
            <Fill>[PLZ und Ort]</Fill>
            <br />
            <Fill>[Land]</Fill>
          </p>
          <p>
            E-Mail: <Fill>[E-Mail-Adresse]</Fill>
            <br />
            Telefon: <Fill>[Telefonnummer, optional]</Fill>
          </p>
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
            Diese Website wird bei <Fill>[Hosting-Anbieter, z. B. Vercel Inc.]</Fill> gehostet. Bei jedem
            Aufruf der Website erfasst der Hosting-Anbieter automatisch Informationen in sogenannten
            Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind: IP-Adresse, Datum und Uhrzeit
            der Anfrage, Browsertyp und -version, verwendetes Betriebssystem sowie die zuvor besuchte Seite
            (Referrer-URL). Diese Daten sind nicht bestimmten Personen zuordenbar und werden ausschließlich zur
            Gewährleistung eines störungsfreien Betriebs sowie zur Verbesserung unseres Angebots ausgewertet.
            Rechtsgrundlage ist unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.
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
            Supabase Inc. Weitere Informationen zur Datenverarbeitung durch Supabase finden Sie unter{" "}
            <Fill>[Link zur Datenschutzerklärung von Supabase]</Fill>. Mit Supabase besteht{" "}
            <Fill>[ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO / noch abzuschließen]</Fill>.
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

        <Section title="6. Zahlungsabwicklung">
          <p>
            <Fill>
              [Diesen Abschnitt ausfüllen, sobald ein Zahlungsdienstleister aktiv genutzt wird — z. B.: „Für
              die Abwicklung von Zahlungen nutzen wir den Zahlungsdienstleister PayPal (Europe) S.à r.l. et
              Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. Im Rahmen der Zahlungsabwicklung werden
              die von Ihnen eingegebenen Zahlungsdaten an PayPal übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO (Vertragserfüllung). Weitere Informationen entnehmen Sie der Datenschutzerklärung
              von PayPal: https://www.paypal.com/de/webapps/mpp/ua/privacy-full“.]
            </Fill>
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Cookies bzw. vergleichbare
            Speichertechnologien (z. B. zur Aufrechterhaltung Ihrer Anmeldesitzung). Diese sind gemäß § 25 Abs.
            2 TDDDG bzw. Art. 6 Abs. 1 lit. f DSGVO ohne gesonderte Einwilligung zulässig, da sie für den
            Betrieb der Website unbedingt erforderlich sind. Derzeit setzen wir keine Analyse-, Marketing- oder
            Tracking-Cookies von Drittanbietern ein.{" "}
            <Fill>[Bei Einsatz von Analyse-Tools wie Google Analytics: Cookie-Banner mit Einwilligung
            einbauen und diesen Abschnitt entsprechend erweitern.]</Fill>
          </p>
        </Section>

        <Section title="8. Speicherdauer">
          <p>
            Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt bzw. sobald Sie
            Ihr Nutzerkonto löschen, soweit keine gesetzlichen Aufbewahrungspflichten (z. B. handels- oder
            steuerrechtliche Vorgaben, in der Regel 6–10 Jahre für Rechnungsdaten) entgegenstehen.
          </p>
        </Section>

        <Section title="9. Ihre Rechte">
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
            Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt. Zuständig ist in der
            Regel die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts oder die für den Verantwortlichen
            zuständige Behörde: <Fill>[zuständige Landesdatenschutzbehörde einfügen]</Fill>.
          </p>
        </Section>

        <Section title="10. Kontakt für Datenschutzanfragen">
          <p>
            Für Auskünfte, Berichtigungen, Löschungen oder sonstige Anliegen zum Datenschutz wenden Sie sich
            bitte an: <Fill>[Datenschutz-E-Mail-Adresse]</Fill>
          </p>
        </Section>
      </main>

      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
  );
}
