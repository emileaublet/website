"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import emile_aublet from "../static/emile_aublet.png";
import arcamile_aublet from "../static/arcamile_aublet.png";
import claymile_aublet from "../static/claymile_aublet.png";
import feltmile_aublet from "../static/feltmile_aublet.png";
import figurimile_aublet from "../static/figurimile_aublet.png";
import muppetmile_aublet from "../static/muppetmile_aublet.png";

const randomIndex = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const Emiles = () => {
  const all_the_emiles: StaticImageData[] = [
    arcamile_aublet,
    claymile_aublet,
    feltmile_aublet,
    figurimile_aublet,
    muppetmile_aublet,
  ];

  const [emile, setEmile] = useState(randomIndex(0, all_the_emiles.length - 1));

  const handleNextEmile = () => {
    setTimeout(() => {
      setEmile(randomIndex(0, all_the_emiles.length - 1));
    }, 200);
  };
  return (
    <div
      className="w-28 h-28 md:w-40 md:h-40 mb-6 relative group rounded-full overflow-hidden"
      onMouseOut={handleNextEmile}
    >
      <Image src={all_the_emiles[emile]} alt={"Émile Aublet"} fill />
      <Image
        src={emile_aublet}
        alt={"Émile Aublet"}
        fill
        className="absolute top-0 left-0 group-hover:opacity-0 transition-opacity"
      />
    </div>
  );
};
