import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { Columns } from "./columns";
import { Model } from "./model-viewer";
import { WireframeScene } from "./wireframe-scene";
import { Carousel } from "./carousel";
import { GalleryStrip } from "./gallery-strip";
import { SizeGrid } from "./size-grid";
import { FaCamera, FaVideo } from "react-icons/fa";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link className="hover:text-emerald-700" href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a className="hover:text-emerald-700" {...props} />;
  }

  return (
    <a
      className="hover:text-emerald-700 dark:hover:text-emerald-500 underline text-emerald-800 dark:text-emerald-300"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function RoundedVideo(props) {
  return (
    <figure className="w-full">
      <video
        className="rounded-lg border border-neutral-200 w-full dark:border-transparent shadow-xl shadow-black/20 dark:shadow-black/50"
        controls
        autoPlay
        muted
        loop
        src={props.src}
        {...props}
      />
      {props.alt && (
        <figcaption className="text-current/75 text-sm mt-4 mb-2 text-center">
          {props.alt}
        </figcaption>
      )}
    </figure>
  );
}

function RoundedImage({ aspect, border = true, ...props }: any) {
  const shared = `rounded-lg ${
    border ? "border border-neutral-200 dark:border-transparent" : ""
  } shadow-xl shadow-black/20 dark:shadow-black/50`;

  return (
    <figure className="w-full">
      {aspect ? (
        <div
          className={`relative w-full overflow-hidden ${shared}`}
          style={{ aspectRatio: aspect }}
        >
          <Image
            quality={80}
            alt={props.alt}
            fill
            className="object-cover"
            {...props}
          />
        </div>
      ) : (
        <Image
          quality={80}
          alt={props.alt}
          className={`w-full ${shared}`}
          {...props}
        />
      )}

      {props.alt && (
        <figcaption className="text-current/75 text-sm mt-4 mb-2 text-center">
          {props.alt}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({
  aspect = "16/9",
  kind = "image",
  children,
}: {
  aspect?: string;
  kind?: "image" | "video";
  children: React.ReactNode;
}) {
  const Icon = kind === "video" ? FaVideo : FaCamera;
  return (
    <figure className="w-full">
      <div
        className="w-full rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center gap-3 p-8 text-center"
        style={{ aspectRatio: aspect }}
      >
        <Icon className="size-6 text-zinc-400 dark:text-zinc-600" />
        <span className="text-xs uppercase tracking-wide font-mono text-zinc-400 dark:text-zinc-600">
          {kind === "video" ? "Video needed" : "Photo needed"}
        </span>
        <div className="text-sm max-w-md text-zinc-500 dark:text-zinc-400 leading-snug">
          {children}
        </div>
      </div>
    </figure>
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Img: RoundedImage,
  Video: RoundedVideo,
  a: CustomLink,
  code: Code,
  Table,
  lead: (props) => <p className="lead">{props.children}</p>,
  Columns,
  Placeholder,
  Model,
  WireframeScene,
  Carousel,
  GalleryStrip,
  SizeGrid,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
      }}
    />
  );
}
