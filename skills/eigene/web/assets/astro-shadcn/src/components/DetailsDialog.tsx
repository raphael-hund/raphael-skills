import { useEffect, useState } from 'react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/registry/new-york-v4/ui/dialog';

export function DetailsDialog() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!ready} className="min-h-11">
          {ready ? 'Open service quick view' : 'Loading quick view…'}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Service details</DialogTitle>
          <DialogDescription>A focused overview of this integration service.</DialogDescription>
        </DialogHeader>
        <p>Keep content, navigation and service pages in HTML. Add a React island only where an interaction needs it.</p>
        <a className="underline text-primary" href="/service/#details">Read the complete service details</a>
        <DialogClose asChild>
          <Button variant="outline" className="min-h-11">Close quick view</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
