"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

type ResponsiveVideoProps = ComponentPropsWithoutRef<"video">;

export function ResponsiveVideo(props: ResponsiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const syncPlayback = () => {
      const shouldAutoplay = !mobileQuery.matches;
      video.autoplay = shouldAutoplay;

      if (shouldAutoplay) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    syncPlayback();
    mobileQuery.addEventListener("change", syncPlayback);

    return () => mobileQuery.removeEventListener("change", syncPlayback);
  }, []);

  return <video {...props} ref={videoRef} autoPlay={false} playsInline />;
}
