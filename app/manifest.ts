import type { MetadataRoute } from "next";

// Makes CertCoach installable as an app on phones (Android "Add to Home
// Screen"/Chrome install prompt) and on desktop (Chrome/Edge "Install
// app"). No native app store submission needed for this — it's the
// same site, just launched from an icon like a real app, in its own
// window without browser chrome. A real store app (Google Play) is a
// separate, much bigger project for later.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CertCoach – Lerne. Übe. Zertifiziere dich.",
    short_name: "CertCoach",
    description: "Bereite dich mit CertCoach praxisnah auf IT-Zertifizierungen vor: Labs, Übungsfragen, KI-Coach und strukturierte Lernpfade.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0a0612",
    theme_color: "#7c3aed",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
