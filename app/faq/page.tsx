import type { Metadata } from "next";
import FaqPageClient from "./FaqPageClient";

export const metadata: Metadata = {
  title: "Häufig gestellte Fragen",
  description: "Antworten auf die wichtigsten Fragen zu CertCoach: Kosten, Einstieg, Übungsfragen, Support und mehr.",
  alternates: {
    canonical: "https://www.certcoach.de/faq",
  },
};

// German FAQ text, matching lib/i18n/dictionaries/de.ts (faqPage.*) exactly
// — this is what crawlers actually see server-rendered, so it must stay in
// sync with the German dictionary entries if that copy changes.
const FAQ_ITEMS = [
  {
    q: "Ist CertCoach kostenlos?",
    a: "Ja, du kannst dich kostenlos registrieren und sofort mit dem Lernen beginnen. Der kostenlose Plan bietet Zugriff auf ausgewählte Kurse, eine aktive Lab-Umgebung und begrenzten KI-Coach-Zugriff. Bezahlte Pläne mit mehr Funktionen befinden sich aktuell im Aufbau.",
  },
  {
    q: "Wie fange ich an?",
    a: "Registriere dich kostenlos, wähle eine Zertifizierung oder einen Sprachkurs aus, der zu deinem Ziel passt, und starte mit der ersten Lektion. Dein Fortschritt wird automatisch gespeichert.",
  },
  {
    q: "Stellt CertCoach offizielle Zertifikate aus?",
    a: "Nein. CertCoach bereitet dich auf die offiziellen Prüfungen von Anbietern wie Microsoft, AWS oder CompTIA vor. Das eigentliche Zertifikat erhältst du direkt vom jeweiligen Anbieter, nachdem du dessen offizielle Prüfung bestanden hast.",
  },
  {
    q: "Woher kommen die Übungsfragen?",
    a: "Alle Übungsfragen werden von unserem Team eigens erstellt, um die Themen der jeweiligen Zertifizierung realistisch abzudecken. Es handelt sich nicht um Fragen aus echten Prüfungen, da deren Verbreitung gegen die Nutzungsbedingungen der Zertifizierungsanbieter verstoßen würde.",
  },
  {
    q: "Kann ich CertCoach auf dem Smartphone nutzen?",
    a: "Ja, die Plattform funktioniert direkt im Browser auf Smartphone, Tablet und Desktop – eine Installation ist nicht nötig.",
  },
  {
    q: "Wie verfolge ich meinen Lernfortschritt?",
    a: "Dein Dashboard zeigt deinen aktuellen Fortschritt pro Zertifizierung, deine Lernserie und deine beantworteten Fragen in Echtzeit.",
  },
  {
    q: "Wie erreiche ich den Support?",
    a: 'Über die Seite „Hilfe & Support" im Dashboard oder über das Kontaktformular – wir antworten in der Regel innerhalb von 24 Stunden.',
  },
  {
    q: "Kann ich schon auf einen bezahlten Plan upgraden?",
    a: "Die Online-Zahlung befindet sich aktuell noch im Aufbau. Auf der Upgrade-Seite kannst du dir die geplanten Pläne ansehen, aber es wird aktuell noch nichts berechnet.",
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <FaqPageClient />
    </>
  );
}
