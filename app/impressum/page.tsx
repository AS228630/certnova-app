"use client";

import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Real legal contact information as required by German law (§5 TMG).
// This information was provided directly by the site owner — never
// invented or looked up. Only shown in German, since Impressum content
// is legally specific text, not something that should be paraphrased
// per-language.
export default function ImpressumPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-extrabold text-text sm:text-3xl">{t("footer.imprint")}</h1>

        <div className="space-y-6 text-sm leading-relaxed text-text-muted">
          <section>
            <h2 className="mb-2 font-bold text-text">Angaben gemäß § 5 TMG</h2>
            <p>
              Ataullah Senmas
              <br />
              Mudweg 17
              <br />
              63897 Miltenberg
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-bold text-text">Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@certcoach.de" className="text-primary hover:underline">
                info@certcoach.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-bold text-text">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Ataullah Senmas, Mudweg 17, 63897 Miltenberg</p>
          </section>

          <section>
            <h2 className="mb-2 font-bold text-text">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse findest du oben. Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-bold text-text">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
