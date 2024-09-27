import { getProjects } from 'app/projects/utils'

export const baseUrl = 'https://super-duper-invention-jwp57q7vx6hpvx6-3000.app.github.dev' 

export default async function sitemap() {
  let projects = getProjects().map((post) => ({
    url: `${baseUrl}/projects/${post.slug}`,
  }))

  let routes = ['', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  return [...routes, ...projects]
}