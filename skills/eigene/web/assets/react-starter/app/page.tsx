import type { Metadata } from "next";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: { absolute: "Ersetzen: Marke: Angebot in einem Satz" },
  description: "Ersetzen: echter Titel und echte Beschreibung aus PRODUCT.md.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-12 p-8">
      <h1 className="text-4xl font-semibold tracking-tight">Echte Überschrift aus PRODUCT.md</h1>
      <p className="max-w-prose text-lg">Inhalt steht im ersten HTML. Diese Seite ist eine Server Component.</p>
      <Button asChild><a href="/kontakt/">Anfrage stellen</a></Button>
      <Marquee pauseOnHover className="[--duration:30s]">
        <span className="mx-6">Referenz A</span><span className="mx-6">Referenz B</span>
      </Marquee>
      <nav aria-label="Seiten"><ul>{routes.map((r) => <li key={r.path}><a href={r.path}>{r.label}</a></li>)}</ul></nav>
    </main>
  );
}
