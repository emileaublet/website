import { getProjects } from "app/utils";

export const baseUrl = "https://aublet.ca";

export default async function sitemap() {
  let projects = getProjects().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
  }));

  let routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  return [...routes, ...projects];
}
