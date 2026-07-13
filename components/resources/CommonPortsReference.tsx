"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// A real, browser-safe port scanner isn't technically possible — browsers
// deliberately block raw socket/network scanning for security reasons,
// so a "Port Scanner" tool here would have to fake results. Instead this
// is a genuinely useful real reference: the standard, well-known ports
// every IT professional needs to memorize for certification exams.
const PORTS = [
  { port: 20, name: "FTP (Data)", proto: "TCP" },
  { port: 21, name: "FTP (Control)", proto: "TCP" },
  { port: 22, name: "SSH", proto: "TCP" },
  { port: 23, name: "Telnet", proto: "TCP" },
  { port: 25, name: "SMTP", proto: "TCP" },
  { port: 53, name: "DNS", proto: "TCP/UDP" },
  { port: 67, name: "DHCP (Server)", proto: "UDP" },
  { port: 68, name: "DHCP (Client)", proto: "UDP" },
  { port: 80, name: "HTTP", proto: "TCP" },
  { port: 110, name: "POP3", proto: "TCP" },
  { port: 123, name: "NTP", proto: "UDP" },
  { port: 143, name: "IMAP", proto: "TCP" },
  { port: 161, name: "SNMP", proto: "UDP" },
  { port: 389, name: "LDAP", proto: "TCP" },
  { port: 443, name: "HTTPS", proto: "TCP" },
  { port: 445, name: "SMB", proto: "TCP" },
  { port: 465, name: "SMTPS", proto: "TCP" },
  { port: 587, name: "SMTP (Submission)", proto: "TCP" },
  { port: 636, name: "LDAPS", proto: "TCP" },
  { port: 993, name: "IMAPS", proto: "TCP" },
  { port: 995, name: "POP3S", proto: "TCP" },
  { port: 1433, name: "Microsoft SQL Server", proto: "TCP" },
  { port: 1521, name: "Oracle DB", proto: "TCP" },
  { port: 3306, name: "MySQL", proto: "TCP" },
  { port: 3389, name: "RDP", proto: "TCP" },
  { port: 5432, name: "PostgreSQL", proto: "TCP" },
  { port: 5900, name: "VNC", proto: "TCP" },
  { port: 6379, name: "Redis", proto: "TCP" },
  { port: 8080, name: "HTTP (Alt)", proto: "TCP" },
  { port: 27017, name: "MongoDB", proto: "TCP" },
];

export default function CommonPortsReference() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q.length === 0 ? PORTS : PORTS.filter((p) => p.name.toLowerCase().includes(q) || String(p.port).includes(q));

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <p className="mb-4 text-xs text-text-faint">{t("resTools.portsNote")}</p>
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("resTools.portsSearch")}
          className="w-full rounded-lg border border-border-soft bg-panel-alt py-2.5 pl-9 pr-3 text-sm text-text focus:border-primary focus:outline-none"
        />
      </div>
      <div className="max-h-80 overflow-y-auto rounded-lg border border-border-soft">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-panel-alt text-xs text-text-faint">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">{t("resTools.portsPort")}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("resTools.portsService")}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("resTools.portsProtocol")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {filtered.map((p) => (
              <tr key={p.port}>
                <td className="px-3 py-2 font-mono font-bold text-primary">{p.port}</td>
                <td className="px-3 py-2 text-text">{p.name}</td>
                <td className="px-3 py-2 text-text-faint">{p.proto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
