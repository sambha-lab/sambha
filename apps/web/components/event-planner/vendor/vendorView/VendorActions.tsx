"use client";

import { ButtonLink } from "@sambha/ui/buttonLink";

interface VendorActionsProps {
  vendorId: string;
}

export function VendorActions({ vendorId }: VendorActionsProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <ButtonLink href={`/vendor/vendors/view/${vendorId}/book-now`}>
        Book now
      </ButtonLink>
      <ButtonLink href={`/vendor/vendors/view/${vendorId}/make-offer`}>
        Make an offer
      </ButtonLink>
      <ButtonLink href={`/vendor/chats/`}>Message</ButtonLink>
    </div>
  );
}
