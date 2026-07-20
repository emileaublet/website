import { getProjects } from "app/utils";

export const baseUrl = "https://aublet.ca";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

export default async function sitemap() {
  let projects = getProjects()
    .filter((post) => !isLocked(post.metadata))
    .map((post) => ({
      url: `${baseUrl}/${post.slug}`,
    }));

  let routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  return [...routes, ...projects];
}
