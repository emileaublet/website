import React from "react";
import {
  FLOLogo,
  MontrealLogo,
  NBCLogo,
  ShopifyLogo,
} from "./components/logos";
import { Emiles } from "./components/emiles";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const linkClasses =
    "flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 py-1.5 px-3 rounded-lg hover:dark:bg-zinc-800 hover:bg-zinc-200 hover:cursor-pointer w-max";
  return (
    <section className="mt-20">
      <Emiles />
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">
        Émile Aublet
        <span className="sr-only">{", "}</span>
        <span className="block font-normal opacity-80">
          Product Designer | UX Engineer
        </span>
      </h1>
      <div className="mt-2 flex flex-row gap-2 flex-wrap">
        <Link
          target="_blank"
          className={linkClasses}
          href="https://github.com/emileaublet"
        >
          <FaGithub className="w-4 h-4 dark:text-white text-zinc-900" />
          Github
        </Link>
        <Link
          target="_blank"
          className={linkClasses}
          href="https://www.linkedin.com/in/emileaublet/"
        >
          <FaLinkedin className="w-4 h-4 dark:text-white text-zinc-900" />
          LinkedIn
        </Link>
        <Link
          target="_blank"
          className={linkClasses}
          href="mailto:emileaublet@gmail.com"
        >
          <FaEnvelope className="w-4 h-4 dark:text-white text-zinc-900" />
          emileaublet@gmail.com
        </Link>
      </div>
      <p className="text-lg md:text-2xl font-normal leading-normal dark:text-zinc-400 mt-12">
        I’m a design leader passionate about building seamless, user-centered
        experiences. My background spans design systems, product design, and
        front-end development, allowing me to shape products at companies like{" "}
        <Token icon={FLOLogo}>FLO EV Charging</Token>
        {", "}
        <Token icon={ShopifyLogo}>Shopify</Token>
        {" and"} the <Token icon={NBCLogo}>National Bank of Canada.</Token> I’m
        committed to cross-functional collaboration, bridging the gap between
        design and development to deliver cohesive, scalable solutions.
      </p>
      <small className="mt-12 block dark:text-zinc-300">
        Based in{" "}
        <Token small icon={MontrealLogo}>
          Montreal, Canada
        </Token>
        .<br />
        Working remotely, anywhere.
      </small>
    </section>
  );
}

const Token = ({
  children,
  icon: Icon,
  small,
}: React.PropsWithChildren<{
  icon: typeof ShopifyLogo;
  small?: boolean;
}>) => {
  return (
    <span className="inline-flex items-baseline flex-wrap">
      <Icon
        className={[
          "self-center",
          small ? "w-3 h-3 mr-1" : "w-5 h-5 mr-1.5",
        ].join(" ")}
      />
      {children}
    </span>
  );
};
