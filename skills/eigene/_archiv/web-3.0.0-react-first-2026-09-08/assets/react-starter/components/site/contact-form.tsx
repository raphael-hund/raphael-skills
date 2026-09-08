"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type State = "idle" | "sending" | "sent" | "failed";

export function ContactForm({ endpoint }: { endpoint?: string }) {
  const [state, setState] = useState<State>("idle");
  if (!endpoint) {
    return <p role="status">Formular noch nicht angebunden. Bitte per E-Mail oder Telefon melden.</p>;
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(endpoint!, { method: "POST", body: new FormData(e.currentTarget) });
      setState(res.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-busy={state === "sending"}>
      <label className="block">Name<input name="name" required className="mt-1 block w-full rounded-md border p-2" /></label>
      <label className="block">E-Mail<input type="email" name="email" required className="mt-1 block w-full rounded-md border p-2" /></label>
      <label className="block">Anliegen<textarea name="message" required className="mt-1 block w-full rounded-md border p-2" /></label>
      <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Wird gesendet…" : "Absenden"}</Button>
      {state === "sent" && <p role="status">Danke, die Nachricht ist angekommen.</p>}
      {state === "failed" && <p role="alert">Senden fehlgeschlagen. Bitte per E-Mail oder Telefon melden.</p>}
    </form>
  );
}
