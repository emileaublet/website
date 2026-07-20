import { Metadata } from "app/utils";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Balancer from "react-wrap-balancer";

type ProjectProps = {
  metadata: Metadata;
  slug: string;
};

function getLuminance(hex?: string) {
  if (!hex) return 1;
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const Project = ({ metadata, slug }: ProjectProps) => {
  const scrim =
    metadata.scrim ||
    (getLuminance(metadata.color) < 0.5 ? "light" : "dark");

  return (
    <Link href={`/${slug}`} className="group">
      <article
        className="relative aspect-[5/6] lg:aspect-[5/4] rounded-lg overflow-hidden border border-zinc-800/10"
        style={{
          color: metadata.color || "black",
        }}
      >
        <Image
          src={metadata.image}
          alt={metadata.title}
          fill
          className="object-cover object-top group-hover:scale-[102%] transition-transform origin-top duration-700"
        />

        {scrim !== "none" && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 35%, color-mix(in srgb, ${
                metadata.scrimColor ||
                metadata.accentColor ||
                (scrim === "light" ? "white" : "black")
              } 35%, ${scrim === "light" ? "white" : "black"}) 100%)`,
            }}
          />
        )}

        <div className="w-full flex-col justify-end h-full  absolute bottom-0 flex items-start p-6 md:p-8">
          {/*    <div
            className="size-10 mb-4 rounded-full flex justify-center items-center overflow-hidden"
            style={{ backgroundColor: metadata.color || "black" }}
          >
            {metadata.employerLogo && (
              <Image
                src={metadata.employerLogo}
                alt={`${metadata.employer}`}
                width={100}
                height={100}
                className={classNames(
                  metadata.employer !== "Personal Project" && "size-7"
                )}
              />
            )}
          </div> */}

          <Balancer
            as="h3"
            className="text-xl lg:text-2xl xl:text-4xl leading-tight! font-bold mb-2 font-mono"
          >
            {metadata.title}
          </Balancer>
          <Balancer className="font-normal xl:text-lg leading-tight! mt-1 md:mt-2 text-current/85">
            {metadata.tagline}&nbsp;
            <FaArrowRight
              className="size-4 inline-table -mt-0.5 text-white rounded-full group-hover:tranemerald-x-1 transition-transform duration-300"
              style={{ color: metadata.accentColor }}
            />
          </Balancer>
        </div>
      </article>
    </Link>
  );
};
