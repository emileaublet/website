import { getProjects } from 'app/projects/utils'

export const baseUrl = 'https://aublet.ca' 

export default async function sitemap() {
  let projects = getProjects().map((post) => ({
    url: `${baseUrl}/projects/${post.slug}`,
  }))

  let routes = ['', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  return [...routes, ...projects]
}