"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import emile_aublet from "../static/emile_aublet.png";
import arcamile_aublet from "../static/arcamile_aublet.png";
import claymile_aublet from "../static/claymile_aublet.png";
import feltmile_aublet from "../static/feltmile_aublet.png";
import figurimile_aublet from "../static/figurimile_aublet.png";
import muppetmile_aublet from "../static/muppetmile_aublet.png";
import classNames from "classnames";

export const Emiles = ({ small }: { small?: boolean }) => {
  const all_the_emiles: StaticImageData[] = [
    arcamile_aublet,
    claymile_aublet,
    feltmile_aublet,
    figurimile_aublet,
    muppetmile_aublet,
  ];

  const [emile, setEmile] = useState(0);

  const handleNextEmile = () => {
    setEmile((e) => (e === all_the_emiles.length - 1 ? 0 : e + 1));
  };
  return (
    <div
      className={classNames(
        "relative group rounded-full overflow-hidden shrink-0",
        small ? "size-8" : "size-28 md:size-40 mb-6 "
      )}
      onMouseOut={handleNextEmile}
    >
      <Image
        src={all_the_emiles[emile]}
        alt={"Émile Aublet"}
        fill
        sizes="50vw, 100vw"
      />
      <Image
        src={emile_aublet}
        alt={"Émile Aublet"}
        fill
        sizes="50vw, 100vw"
        className="absolute top-0 left-0 group-hover:opacity-0 transition-opacity"
      />
    </div>
  );
};
