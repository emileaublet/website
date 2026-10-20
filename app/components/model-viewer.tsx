"use client";

import { createElement, useEffect, useRef } from "react";

const ModelViewer = "model-viewer" as unknown as React.ElementType;

export function Model({
  src,
  alt,
  aspect = "4/3",
}: {
  src: string;
  alt: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <figure className="w-full">
      <div
        className="w-full rounded-lg overflow-hidden bg-zinc-950"
        style={{ aspectRatio: aspect }}
      >
        {createElement(ModelViewer, {
          ref,
          src,
          alt,
          "auto-rotate": true,
          "auto-rotate-delay": "0",
          "rotation-per-second": "16deg",
          "camera-controls": true,
          "disable-zoom": true,
          "disable-pan": true,
          "interaction-prompt": "none",
          "environment-image": "neutral",
          "tone-mapping": "aces",
          exposure: "0.5",
          "shadow-intensity": "0",
          style: {
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            filter: "grayscale(1) contrast(1.3) brightness(1.15)",
          },
        })}
      </div>
      {alt && (
        <figcaption className="text-current/75 text-sm mt-4 mb-2 text-center">
          {alt} (drag to rotate)
        </figcaption>
      )}
    </figure>
  );
}
