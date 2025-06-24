import { Metadata } from "app/utils";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  metadata: Metadata;
  slug: string;
};
export const Project = ({ metadata, slug }: ProjectProps) => {
  return (
    <Link href={`/${slug}`} className="group">
      <article
        className="relative aspect-[7/8] rounded-lg overflow-hidden border border-zinc-800/10"
        style={{
          color: metadata.color || "black",
        }}
      >
        <Image
          src={metadata.image}
          alt={metadata.title}
          fill
          className="object-cover group-hover:scale-[102%] transition-transform duration-700"
        />

        <div className="h-2/3 w-full relative text-center flex-col justify-center flex items-center">
          <div
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
          </div>
          <div className="font-bold text-xl lg:text-2xl xl:text-4xl leading-tight max-w-[90%]">
            {metadata.tagline}
          </div>
          <div
            className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-300 cursor-pointer"
            style={{
              backgroundColor: metadata.accentColor,
            }}
          >
            <span>View Project</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
