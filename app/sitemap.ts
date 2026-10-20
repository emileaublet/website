import { getProjects } from "app/utils";

export const baseUrl = "https://aublet.ca";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

export default async function sitemap() {
  const projects = getProjects()
    .filter((post) => !isLocked(post.metadata))
    .map((post) => ({
      url: `${baseUrl}/${post.slug}`,
    }));

  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  return [...routes, ...projects];
}
