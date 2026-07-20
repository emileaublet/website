"use client";

import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

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
        {/* @ts-expect-error web component */}
        <model-viewer
          ref={ref}
          src={src}
          alt={alt}
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="16deg"
          camera-controls
          disable-zoom
          disable-pan
          interaction-prompt="none"
          environment-image="neutral"
          tone-mapping="aces"
          exposure="0.5"
          shadow-intensity="0"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            filter: "grayscale(1) contrast(1.3) brightness(1.15)",
          }}
        />
      </div>
      {alt && (
        <figcaption className="text-current/75 text-sm mt-4 mb-2 text-center">
          {alt} (drag to rotate)
        </figcaption>
      )}
    </figure>
  );
}
