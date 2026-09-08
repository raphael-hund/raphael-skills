import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/registry/new-york-v4/ui/card';

export function StaticCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><h3>Service overview</h3></CardTitle>
        <CardDescription>Upstream shadcn Card, rendered at build time.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This content is already in the HTML response. Reading it needs no React download.</p>
      </CardContent>
    </Card>
  );
}
