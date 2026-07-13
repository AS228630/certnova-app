"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

type Entry = { cmd: string; desc: string };
type Sheet = { id: string; titleKey: string; entries: Entry[] };

// Real, technically accurate command references — the kind of content
// an IT professional would actually look up. Kept concise (the most
// commonly needed commands) rather than exhaustive, since this is a
// quick-reference cheat sheet, not full documentation.
const SHEETS: Sheet[] = [
  {
    id: "docker",
    titleKey: "resCheat.docker",
    entries: [
      { cmd: "docker ps", desc: "Zeigt laufende Container an" },
      { cmd: "docker ps -a", desc: "Zeigt alle Container (inkl. gestoppte) an" },
      { cmd: "docker images", desc: "Listet lokale Images auf" },
      { cmd: "docker run -d -p 8080:80 nginx", desc: "Startet einen Container im Hintergrund mit Port-Mapping" },
      { cmd: "docker exec -it <container> bash", desc: "Öffnet eine Shell im laufenden Container" },
      { cmd: "docker logs -f <container>", desc: "Zeigt Live-Logs eines Containers" },
      { cmd: "docker stop <container>", desc: "Stoppt einen laufenden Container" },
      { cmd: "docker rm <container>", desc: "Entfernt einen gestoppten Container" },
      { cmd: "docker build -t myapp .", desc: "Baut ein Image aus dem Dockerfile im aktuellen Verzeichnis" },
      { cmd: "docker-compose up -d", desc: "Startet alle Services aus docker-compose.yml im Hintergrund" },
      { cmd: "docker system prune -a", desc: "Entfernt alle ungenutzten Container, Images und Netzwerke" },
    ],
  },
  {
    id: "linux",
    titleKey: "resCheat.linux",
    entries: [
      { cmd: "ls -la", desc: "Listet alle Dateien inkl. versteckter mit Details auf" },
      { cmd: "cd /path/to/dir", desc: "Wechselt das Verzeichnis" },
      { cmd: "pwd", desc: "Zeigt das aktuelle Arbeitsverzeichnis" },
      { cmd: "chmod 755 file.sh", desc: "Setzt Dateiberechtigungen (rwxr-xr-x)" },
      { cmd: "chown user:group file", desc: "Ändert Besitzer und Gruppe einer Datei" },
      { cmd: "grep -r \"text\" /path", desc: "Durchsucht Dateien rekursiv nach Text" },
      { cmd: "find / -name \"*.log\"", desc: "Sucht Dateien nach Namen im gesamten Dateisystem" },
      { cmd: "ps aux | grep nginx", desc: "Zeigt laufende Prozesse gefiltert nach Namen" },
      { cmd: "systemctl status nginx", desc: "Zeigt den Status eines Systemd-Dienstes" },
      { cmd: "df -h", desc: "Zeigt Festplattenspeicher in lesbarem Format" },
      { cmd: "top", desc: "Zeigt laufende Prozesse mit Ressourcenverbrauch in Echtzeit" },
      { cmd: "tar -czvf archive.tar.gz /path", desc: "Erstellt ein komprimiertes tar-Archiv" },
    ],
  },
  {
    id: "powershell",
    titleKey: "resCheat.powershell",
    entries: [
      { cmd: "Get-Process", desc: "Zeigt laufende Prozesse an" },
      { cmd: "Get-Service", desc: "Zeigt Windows-Dienste und deren Status" },
      { cmd: "Get-ChildItem -Recurse", desc: "Listet Dateien/Ordner rekursiv auf (entspricht ls -R)" },
      { cmd: "Get-Content file.txt", desc: "Zeigt den Inhalt einer Datei an" },
      { cmd: "Set-ExecutionPolicy RemoteSigned", desc: "Erlaubt die Ausführung lokal erstellter Skripte" },
      { cmd: "Get-EventLog -LogName System", desc: "Liest Windows-Ereignisprotokolle aus" },
      { cmd: "Test-NetConnection -ComputerName host -Port 443", desc: "Prüft die Netzwerkverbindung zu Host und Port" },
      { cmd: "Get-ADUser -Filter *", desc: "Listet Active-Directory-Benutzer auf" },
      { cmd: "Restart-Service -Name spooler", desc: "Startet einen Windows-Dienst neu" },
      { cmd: "$PSVersionTable", desc: "Zeigt die installierte PowerShell-Version" },
    ],
  },
  {
    id: "git",
    titleKey: "resCheat.git",
    entries: [
      { cmd: "git init", desc: "Erstellt ein neues Git-Repository" },
      { cmd: "git clone <url>", desc: "Klont ein bestehendes Repository" },
      { cmd: "git status", desc: "Zeigt geänderte Dateien im Arbeitsverzeichnis" },
      { cmd: "git add .", desc: "Fügt alle Änderungen zum Staging hinzu" },
      { cmd: "git commit -m \"message\"", desc: "Erstellt einen Commit mit Nachricht" },
      { cmd: "git push origin main", desc: "Lädt Commits zum Remote-Branch hoch" },
      { cmd: "git pull", desc: "Holt und mergt Änderungen vom Remote" },
      { cmd: "git branch -b feature-x", desc: "Erstellt und wechselt zu neuem Branch" },
      { cmd: "git merge feature-x", desc: "Führt einen Branch in den aktuellen zusammen" },
      { cmd: "git log --oneline", desc: "Zeigt kompakte Commit-Historie" },
      { cmd: "git reset --hard HEAD~1", desc: "Verwirft den letzten Commit vollständig" },
      { cmd: "git stash", desc: "Speichert Änderungen temporär zwischen" },
    ],
  },
  {
    id: "terraform",
    titleKey: "resCheat.terraform",
    entries: [
      { cmd: "terraform init", desc: "Initialisiert ein Terraform-Arbeitsverzeichnis" },
      { cmd: "terraform plan", desc: "Zeigt geplante Änderungen an der Infrastruktur" },
      { cmd: "terraform apply", desc: "Wendet die geplanten Änderungen an" },
      { cmd: "terraform destroy", desc: "Entfernt die gesamte verwaltete Infrastruktur" },
      { cmd: "terraform validate", desc: "Prüft die Syntax der Konfigurationsdateien" },
      { cmd: "terraform fmt", desc: "Formatiert Konfigurationsdateien einheitlich" },
      { cmd: "terraform state list", desc: "Listet alle verwalteten Ressourcen auf" },
      { cmd: "terraform output", desc: "Zeigt definierte Output-Werte an" },
      { cmd: "terraform workspace new prod", desc: "Erstellt einen neuen Workspace" },
      { cmd: "terraform import <resource> <id>", desc: "Importiert bestehende Ressourcen in den State" },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="shrink-0 rounded-md p-1.5 text-text-faint hover:bg-panel-alt hover:text-text"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function CheatSheetsPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();
  const [active, setActive] = useState(SHEETS[0].id);

  if (checking) return null;
  const activeSheet = SHEETS.find((s) => s.id === active)!;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("resCheat.pageTitle")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{t("resCheat.pageDesc")}</p>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          {SHEETS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                active === s.id ? "border-primary bg-primary-light text-primary" : "border-border-soft text-text-muted hover:bg-panel-alt"
              }`}
            >
              <Terminal size={14} />
              {t(s.titleKey)}
            </button>
          ))}
        </div>

        <div className="mt-6 divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
          {activeSheet.entries.map((e) => (
            <div key={e.cmd} className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <code className="block truncate rounded bg-panel-alt px-2 py-1 font-mono text-xs text-primary">{e.cmd}</code>
                <p className="mt-1.5 text-xs text-text-muted">{e.desc}</p>
              </div>
              <CopyButton text={e.cmd} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
