import { title } from "app/const";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const spaceGroteskBold = await readFile(
    join(process.cwd(), "/public/SpaceGrotesk-Bold.ttf")
  );

  const spaceGroteskRegular = await readFile(
    join(process.cwd(), "/public/SpaceGrotesk-Regular.ttf")
  );

  const emileData = await readFile(
    join(process.cwd(), "/app/static/emile_aublet.webp")
  );
  const emileSrc = Uint8Array.from(emileData).buffer;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 96,
          display: "flex",
          fontWeight: 700,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#09090b",
          color: "#fafafa",
          width: "100%",
          height: "100%",
        }}
      >
        {
          <img
            //@ts-expect-error
            src={emileSrc}
            style={{
              borderRadius: "100%",
              width: 196,
              height: 196,
              display: "block",
            }}
          />
        }
        Émile Aublet
        <span style={{ fontSize: 48, fontWeight: 400 }}>{title}</span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Space Grotesk",
          data: spaceGroteskRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
