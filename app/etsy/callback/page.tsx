import { Suspense } from "react";
import type { Metadata } from "next";
import { CallbackResult } from "./result";

// This page exists solely as the registered OAuth redirect target for the Etsy
// app used to manage the shop's listings. Etsy requires an https redirect URI,
// and the migration scripts run locally with no web server of their own, so the
// authorization code lands here to be copied back into the terminal.
//
// The code shown is single-use, expires quickly, and is worthless without the
// PKCE code_verifier, which never leaves the local machine.

export const metadata: Metadata = {
  title: "Etsy authorization",
  robots: { index: false, follow: false },
};

export default function EtsyCallbackPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Etsy authorization
      </h1>
      <Suspense fallback={<p className="mb-4">Reading response…</p>}>
        <CallbackResult />
      </Suspense>
    </section>
  );
}
