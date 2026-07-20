import Image from "next/image";

const SCALE_PATTERN = [1, 0.85, 0.95, 0.8, 1, 0.9];
const REFERENCE_VIEWPORT = 1440;

function responsiveHeight(maxPx: number) {
  const vw = +((maxPx / REFERENCE_VIEWPORT) * 100).toFixed(2);
  const min = Math.round(maxPx * 0.22);
  return `clamp(${min}px, ${vw}vw, ${maxPx}px)`;
}

type GalleryImage = { src: string; ratio: number };

function Row({
  images,
  heightExpr,
  duration,
  reverse,
}: {
  images: GalleryImage[];
  heightExpr: string;
  duration: number;
  reverse: boolean;
}) {
  const track = [...images, ...images];

  return (
    <div
      className="w-full overflow-x-hidden overflow-y-visible"
      style={{ height: heightExpr }}
    >
      <div
        className="flex items-center w-max animate-gallery-scroll"
        style={{
          // @ts-expect-error custom property
          "--gallery-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((image, i) => {
          const scale = SCALE_PATTERN[i % SCALE_PATTERN.length];
          const itemHeightExpr = `calc(${heightExpr} * ${scale})`;
          const itemWidthExpr = `calc(${heightExpr} * ${scale} * ${image.ratio})`;
          return (
            <div
              key={`${image.src}-${i}`}
              className="relative shrink-0"
              style={{
                height: itemHeightExpr,
                width: itemWidthExpr,
                marginLeft: i === 0 ? 0 : `calc(${heightExpr} * 0.04)`,
                zIndex: i,
              }}
            >
              <Image
                src={image.src}
                alt=""
                fill
                quality={95}
                sizes="360px"
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GalleryStrip({
  images,
  height = 900,
  duration,
  rows = 2,
}: {
  images: GalleryImage[];
  height?: number;
  duration?: number;
  rows?: number;
}) {
  const rowImages: GalleryImage[][] = Array.from({ length: rows }, (_, r) =>
    images.filter((_, i) => i % rows === r)
  );
  const rowHeightExpr = `calc(${responsiveHeight(height)} / ${rows})`;
  const resolvedDuration =
    duration ?? Math.max(...rowImages.map((r) => r.length)) * 20;

  const fadeMask =
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

  return (
    <div
      className="w-full flex flex-col"
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    >
      {rowImages.map((row, r) => (
        <div
          key={r}
          style={{ marginTop: r === 0 ? 0 : `calc(${rowHeightExpr} * 0.04)` }}
        >
          <Row
            images={row}
            heightExpr={rowHeightExpr}
            duration={resolvedDuration}
            reverse={r % 2 === 1}
          />
        </div>
      ))}
    </div>
  );
}
