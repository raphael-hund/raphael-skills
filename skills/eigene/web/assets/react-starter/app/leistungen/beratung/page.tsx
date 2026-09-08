import type { Metadata } from "next";
export const metadata: Metadata = { title: "Beratung", description: "Probe-Unterseite",
  alternates: { canonical: "/leistungen/beratung/" },
};
export default function Page() { return <main><h1>Beratung</h1><p>Statischer Inhalt im HTML.</p><a href="/kontakt/">Kontakt</a></main>; }
