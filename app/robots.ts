import { baseUrl } from "app/sitemap";
import { getProjects } from "app/utils";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

function assetPaths(content: string) {
  const matches = Array.from(
    content.matchAll(/\/[\w-]+\.(?:png|jpe?g|webp|gif|mp4|mov)/g)
  );
  return Array.from(new Set(matches.map((m) => m[0])));
}

export default function robots() {
  const lockedPosts = getProjects().filter((post) => isLocked(post.metadata));

  const disallow = lockedPosts.flatMap((post) => [
    `/${post.slug}`,
    ...(post.metadata.image ? [post.metadata.image] : []),
    ...assetPaths(post.content),
  ]);

  return {
    rules: [
      {
        userAgent: "*",
        disallow: Array.from(new Set(disallow)),
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
