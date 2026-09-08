export type Route = { path: string; label: string; indexable: boolean };
export const routes: Route[] = [
  { path: "/", label: "Start", indexable: true },
  { path: "/leistungen/beratung/", label: "Beratung", indexable: true },
  { path: "/kontakt/", label: "Kontakt", indexable: true },
];
