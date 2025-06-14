import { Metadata } from "app/utils";
import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  metadata: Metadata;
  slug: string;
};
export const Project = ({ metadata, slug }: ProjectProps) => {
  return (
    <article className="mb-12">
      <Link href={`/${slug}`}>
        <Image
          src={metadata.image ?? "/project.jpg"}
          alt={metadata.title}
          width={540}
          height={300}
          className="rounded-lg w-full"
        />
        <p className="text-2xl font-semibold mt-6">{metadata.title}</p>
      </Link>
      <p className="mt-2 max-w-sm">{metadata.summary}</p>
    </article>
  );
};
