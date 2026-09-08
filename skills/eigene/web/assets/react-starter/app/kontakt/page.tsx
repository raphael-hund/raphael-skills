import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
export const metadata: Metadata = { title: "Kontakt", description: "Ersetzen.",
  alternates: { canonical: "/kontakt/" },
};
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Kontakt</h1>
      <p>Telefon und E-Mail als echte Links hier, unabhängig vom Formular.</p>
      <ContactForm endpoint={process.env.NEXT_PUBLIC_FORM_ENDPOINT} />
    </main>
  );
}
