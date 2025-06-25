import { Metadata } from "app/utils";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Balancer from "react-wrap-balancer";

type ProjectProps = {
  metadata: Metadata;
  slug: string;
};
export const Project = ({ metadata, slug }: ProjectProps) => {
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
