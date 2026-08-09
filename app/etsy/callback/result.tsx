"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => setCopied(true),
          () => setCopied(false),
        );
      }}
      className="rounded border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

export function CallbackResult() {
  const params = useSearchParams();
  const [fullUrl, setFullUrl] = useState("");

  // Read on the client so the value reflects exactly what Etsy redirected to,
  // including the host, which the auth script validates.
  useEffect(() => setFullUrl(window.location.href), []);

  const error = params.get("error");
  const code = params.get("code");

  if (error) {
    return (
      <>
        <p className="mb-4">
          Etsy declined the request: <strong>{error}</strong>
        </p>
        {params.get("error_description") && (
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            {params.get("error_description")}
          </p>
        )}
        <p className="mb-4">Run the authorize script again to retry.</p>
      </>
    );
  }

  if (!code) {
    return (
      <p className="mb-4">
        No authorization code in this URL. This page is only meaningful as the
        redirect target of an Etsy OAuth request.
      </p>
    );
  }

  return (
    <>
      <p className="mb-4">
        Authorization granted. Copy this URL and paste it into the terminal
        prompt.
      </p>
      <pre className="mb-4 overflow-x-auto rounded bg-neutral-100 p-3 text-sm dark:bg-neutral-900">
        <code className="break-all">{fullUrl || "…"}</code>
      </pre>
      <div className="mb-8 flex gap-2">
        <CopyButton value={fullUrl} label="Copy full URL" />
        <CopyButton value={code} label="Copy code only" />
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        This code is single-use, expires shortly, and cannot be exchanged
        without the PKCE verifier held locally.
      </p>
    </>
  );
}
