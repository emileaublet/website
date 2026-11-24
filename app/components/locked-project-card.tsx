"use client";

import { useEffect, useState } from "react";
import { PasswordGate } from "./password-gate";
import { Project, type ProjectCardMetadata } from "./project";

export function LockedProjectCard({ slug }: { slug: string }) {
  const [metadata, setMetadata] = useState<ProjectCardMetadata | null>(null);

  useEffect(() => {
    const request = new AbortController();

    async function loadCard() {
      const response = await fetch(
        `/api/project-card/${encodeURIComponent(slug)}`,
        { cache: "no-store", signal: request.signal }
      );
      if (response.status !== 200) return;

      const card: ProjectCardMetadata = await response.json();
      if (!request.signal.aborted) setMetadata(card);
    }

    void loadCard().catch(() => {
      // Keep the password form available when the private request fails.
    });
    return () => request.abort();
  }, [slug]);

  return metadata ? (
    <Project metadata={metadata} slug={slug} />
  ) : (
    <PasswordGate slug={slug} variant="card" />
  );
}
