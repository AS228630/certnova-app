"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export default function SubnetCalculator() {
  const { t } = useLocale();
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);

  const ipInt = ipToInt(ip);
  const valid = ipInt !== null && cidr >= 0 && cidr <= 32;

  let result: {
    network: string;
    broadcast: string;
    firstHost: string;
    lastHost: string;
    totalHosts: number;
    usableHosts: number;
    subnetMask: string;
  } | null = null;

  if (valid && ipInt !== null) {
    const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    result = {
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost: cidr >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
      lastHost: cidr >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
      totalHosts,
      usableHosts,
      subnetMask: intToIp(maskInt),
    };
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("resTools.ipAddress")}</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.0"
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-sm text-text focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("resTools.cidrPrefix")}</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-faint">/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-20 rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {!valid && <p className="mt-4 text-sm text-danger">{t("resTools.invalidInput")}</p>}

      {result && (
        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-border-soft pt-5 sm:grid-cols-2">
          {[
            { labelKey: "resTools.networkAddr", value: result.network },
            { labelKey: "resTools.broadcastAddr", value: result.broadcast },
            { labelKey: "resTools.subnetMask", value: result.subnetMask },
            { labelKey: "resTools.usableHosts", value: result.usableHosts.toLocaleString("de-DE") },
            { labelKey: "resTools.firstHost", value: result.firstHost },
            { labelKey: "resTools.lastHost", value: result.lastHost },
          ].map((r) => (
            <div key={r.labelKey} className="rounded-lg bg-panel-alt px-3 py-2.5">
              <p className="text-[11px] text-text-faint">{t(r.labelKey)}</p>
              <p className="font-mono text-sm font-bold text-text">{r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
