import Image from "next/image";

type SizeImage = {
  src: string;
  size: string;
  alt?: string;
};

export function SizeGrid({ images }: { images: SizeImage[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl shadow-black/20 dark:shadow-black/50"
        >
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            quality={92}
            sizes="(min-width: 768px) 33vw, 33vw"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-black text-white text-[10px] md:text-xs font-mono px-1.5 py-0.5 md:px-2 md:py-1 rounded">
            {image.size}
          </span>
        </div>
      ))}
    </div>
  );
}
