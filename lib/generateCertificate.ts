import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export type CertificateData = {
  userName: string;
  certCode: string;
  certTitle: string;
  finalScore: number; // practice exam accuracy, 0-100
  labsPct: number; // 0-100
  lessonsPct: number; // 0-100
  certificateId: string;
  issueDate: Date;
  questionsAnswered: number;
  studyHours: number;
};

const NAVY = "#0d1030";
const NAVY_LIGHT = "#141a45";
const GOLD = "#d4af37";
const GOLD_LIGHT = "#f3d576";
const PURPLE = "#6d4cff";
const WHITE = "#f5f5fa";
const MUTED = "#9aa0c3";

function verifyUrl(certificateId: string) {
  return `https://certcoach.de/verify/${certificateId}`;
}

function achievementLabel(score: number): string {
  if (score >= 95) return "Outstanding";
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  return "Good";
}

export async function generateCertificatePdf(data: CertificateData): Promise<Blob> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl(data.certificateId), { margin: 1, color: { dark: "#0d1030", light: "#ffffff" } });

  // ===================== PAGE 1: Certificate =====================
  doc.setFillColor(NAVY);
  doc.rect(0, 0, pageW, pageH, "F");

  // Outer gold border frame
  doc.setDrawColor(GOLD);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageW - 16, pageH - 16);
  doc.setLineWidth(0.4);
  doc.rect(11, 11, pageW - 22, pageH - 22);

  // Logo block
  doc.setFillColor(PURPLE);
  doc.roundedRect(18, 18, 10, 10, 2, 2, "F");
  doc.setTextColor(WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("C", 23, 25.3, { align: "center" });

  doc.setTextColor(WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CertCoach", 32, 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(MUTED);
  doc.text("Learn. Practice. Certify.", 32, 27.5);

  // Title
  doc.setTextColor(GOLD_LIGHT);
  doc.setFont("times", "bold");
  doc.setFontSize(34);
  doc.text("CERTIFICATE", pageW / 2, 58, { align: "center" });
  doc.setFontSize(13);
  doc.setFont("times", "normal");
  doc.setTextColor(GOLD);
  doc.text("O F   A C H I E V E M E N T", pageW / 2, 67, { align: "center" });

  // Stars
  doc.setFontSize(14);
  doc.setTextColor(GOLD);
  doc.text("\u2605  \u2605  \u2605  \u2605  \u2605", pageW / 2, 76, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text("THIS CERTIFIES THAT", pageW / 2, 88, { align: "center" });

  // Name
  doc.setFont("times", "bolditalic");
  doc.setFontSize(30);
  doc.setTextColor(WHITE);
  doc.text(data.userName, pageW / 2, 102, { align: "center" });
  doc.setDrawColor(GOLD);
  doc.setLineWidth(0.3);
  doc.line(pageW / 2 - 55, 106, pageW / 2 + 55, 106);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text("HAS SUCCESSFULLY COMPLETED", pageW / 2, 115, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(WHITE);
  doc.text(`${data.certCode} ${data.certTitle}`, pageW / 2, 124, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text("Learning Path", pageW / 2, 130, { align: "center" });

  // 3 stat boxes
  const boxY = 140;
  const boxW = 52;
  const boxH = 26;
  const gap = 6;
  const totalW = boxW * 3 + gap * 2;
  const startX = (pageW - totalW) / 2;
  const boxLabels: [string, string][] = [
    ["COURSE", "COMPLETED"],
    ["LABS", "COMPLETED"],
    ["PRACTICE EXAM", "PASSED"],
  ];
  const boxValues = [`${Math.round(data.lessonsPct)}%`, `${Math.round(data.labsPct)}%`, `${Math.round(data.finalScore)}%+`];
  boxLabels.forEach((labels, i) => {
    const x = startX + i * (boxW + gap);
    doc.setDrawColor(GOLD);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, boxY, boxW, boxH, 2, 2);
    doc.setTextColor(GOLD_LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(labels[0], x + boxW / 2, boxY + 7, { align: "center" });
    doc.text(labels[1], x + boxW / 2, boxY + 11.5, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(WHITE);
    doc.text(boxValues[i], x + boxW / 2, boxY + 20, { align: "center" });
  });

  // Final score box
  const scoreBoxY = boxY + boxH + 10;
  doc.setFillColor(NAVY_LIGHT);
  doc.setDrawColor(GOLD);
  doc.roundedRect(pageW / 2 - 35, scoreBoxY, 70, 24, 2, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(GOLD_LIGHT);
  doc.text("FINAL SCORE", pageW / 2, scoreBoxY + 8, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(GOLD_LIGHT);
  doc.text(`${Math.round(data.finalScore)}%`, pageW / 2, scoreBoxY + 19, { align: "center" });

  // Footer row: issue date / cert id / status
  const footerY = scoreBoxY + 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text("ISSUE DATE", 30, footerY);
  doc.text("CERTIFICATE ID", pageW / 2, footerY, { align: "center" });
  doc.text("STATUS", pageW - 30, footerY, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(WHITE);
  doc.text(
    data.issueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
    30,
    footerY + 5
  );
  doc.text(data.certificateId, pageW / 2, footerY + 5, { align: "center" });
  doc.setTextColor("#22c55e");
  doc.text("Verified \u2713", pageW - 30, footerY + 5, { align: "right" });

  // Seal (bottom-left)
  const sealCx = 32;
  const sealCy = footerY + 25;
  doc.setDrawColor(GOLD);
  doc.setFillColor(NAVY_LIGHT);
  doc.circle(sealCx, sealCy, 12, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(GOLD_LIGHT);
  doc.text("C", sealCx, sealCy + 1.5, { align: "center" });
  doc.setFontSize(5.5);
  doc.text("CERTCOACH", sealCx, sealCy + 6, { align: "center" });
  doc.text("VERIFIED", sealCx, sealCy + 9, { align: "center" });

  // Signature (middle)
  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.setTextColor(WHITE);
  doc.text("CertCoach Team", pageW / 2, footerY + 22, { align: "center" });
  doc.setDrawColor(MUTED);
  doc.setLineWidth(0.2);
  doc.line(pageW / 2 - 22, footerY + 24, pageW / 2 + 22, footerY + 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(MUTED);
  doc.text("CertCoach Team", pageW / 2, footerY + 28, { align: "center" });
  doc.text("Verified by CertCoach", pageW / 2, footerY + 32, { align: "center" });

  // QR (bottom-right)
  const qrSize = 24;
  const qrX = pageW - 30 - qrSize;
  const qrY = footerY + 12;
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(MUTED);
  doc.text("Scan to verify this certificate", qrX + qrSize / 2, qrY + qrSize + 4, { align: "center" });
  doc.text(`or visit: certcoach.de/verify/${data.certificateId}`, qrX + qrSize / 2, qrY + qrSize + 8, { align: "center" });

  // ===================== PAGE 2: Performance Report =====================
  doc.addPage();
  doc.setFillColor(NAVY);
  doc.rect(0, 0, pageW, pageH, "F");

  doc.setFillColor(PURPLE);
  doc.roundedRect(18, 16, 10, 10, 2, 2, "F");
  doc.setTextColor(WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("C", 23, 23.3, { align: "center" });
  doc.setFontSize(13);
  doc.text("CertCoach", 32, 21);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text(`Certificate ID: ${data.certificateId}`, pageW - 18, 20, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(WHITE);
  doc.text("PERFORMANCE REPORT", pageW / 2, 42, { align: "center" });
  doc.setDrawColor(GOLD);
  doc.setLineWidth(0.3);
  doc.line(pageW / 2 - 50, 46, pageW / 2 + 50, 46);

  // Real metric bars (Lernen / Labs / Prüfung) — honest: we only persist
  // these three aggregate metrics, not a fine-grained per-topic breakdown,
  // so the report shows exactly what's real rather than inventing topics.
  const metrics: [string, number][] = [
    ["Lernpfad (Lernen)", data.lessonsPct],
    ["Praxis-Labore", data.labsPct],
    ["Prüfungs-Simulation", data.finalScore],
  ];
  let barY = 58;
  metrics.forEach(([label, pct]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(WHITE);
    doc.text(label, 22, barY + 4);
    doc.setFont("helvetica", "bold");
    doc.text(`${Math.round(pct)}%`, pageW - 22, barY + 4, { align: "right" });
    doc.setFillColor(NAVY_LIGHT);
    doc.roundedRect(22, barY + 7, pageW - 44, 4, 2, 2, "F");
    doc.setFillColor(PURPLE);
    doc.roundedRect(22, barY + 7, ((pageW - 44) * Math.max(2, Math.min(100, pct))) / 100, 4, 2, 2, "F");
    barY += 18;
  });

  // 4 stat boxes
  const statY = barY + 8;
  const statLabels = ["QUESTIONS\nANSWERED", "TIME SPENT", "COMPLETION", "ACHIEVEMENT"];
  const statValues = [String(data.questionsAnswered), `${data.studyHours} Hours`, `${Math.round((data.lessonsPct + data.labsPct + data.finalScore) / 3)}%`, achievementLabel(data.finalScore)];
  const statBoxW = (pageW - 44 - 3 * 6) / 4;
  statLabels.forEach((label, i) => {
    const x = 22 + i * (statBoxW + 6);
    doc.setDrawColor(GOLD);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, statY, statBoxW, 24, 2, 2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(MUTED);
    const lines = label.split("\n");
    lines.forEach((l, li) => doc.text(l, x + statBoxW / 2, statY + 7 + li * 3.5, { align: "center" }));
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(GOLD_LIGHT);
    doc.text(statValues[i], x + statBoxW / 2, statY + 19, { align: "center" });
  });

  // Badge + congrats
  const badgeY = statY + 34;
  doc.setDrawColor(GOLD);
  doc.setLineWidth(0.3);
  doc.roundedRect(22, badgeY, pageW - 44, 40, 2, 2);
  doc.setFillColor(NAVY_LIGHT);
  doc.circle(45, badgeY + 20, 14, "FD");
  doc.setDrawColor(GOLD);
  doc.circle(45, badgeY + 20, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(GOLD_LIGHT);
  doc.text("C", 45, badgeY + 22, { align: "center" });
  doc.setFontSize(6);
  doc.text(`${data.certCode} EXPERT`, 45, badgeY + 33, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(WHITE);
  doc.text("Congratulations!", 68, badgeY + 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(MUTED);
  const congratsText = `You have demonstrated outstanding knowledge and skills in ${data.certCode} ${data.certTitle}. Keep learning and keep achieving!`;
  const wrapped = doc.splitTextToSize(congratsText, pageW - 44 - 55);
  doc.text(wrapped, 68, badgeY + 20);

  // Verification section
  const verifyY = badgeY + 50;
  doc.setDrawColor(GOLD);
  doc.roundedRect(22, verifyY, pageW - 44, 26, 2, 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(WHITE);
  doc.text("VERIFICATION", 30, verifyY + 9);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(MUTED);
  doc.text("This certificate can be verified at:", 30, verifyY + 14);
  doc.setTextColor(PURPLE);
  doc.text(verifyUrl(data.certificateId), 30, verifyY + 19);

  doc.addImage(qrDataUrl, "PNG", pageW - 22 - 20, verifyY + 3, 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(MUTED);
  doc.text(`\u00A9 ${data.issueDate.getFullYear()} CertCoach. All Rights Reserved.`, pageW / 2, pageH - 14, { align: "center" });

  return doc.output("blob");
}
