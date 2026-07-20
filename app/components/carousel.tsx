"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt?: string;
};

export function Carousel({
  images,
  aspect = "16/10",
  interval = 4000,
}: {
  images: Slide[];
  aspect?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <figure className="w-full">
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-xl shadow-black/20 dark:shadow-black/50"
        style={{ aspectRatio: aspect }}
      >
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt || ""}
            fill
            quality={95}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            priority={i === 0}
          />
        ))}
      </div>
    </figure>
  );
}
