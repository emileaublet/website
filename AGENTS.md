# AGENTS.md

## Project overview

This repository is Émile Aublet's personal portfolio website. It presents Émile as a design systems leader and senior product designer based in Montreal, with case studies covering product design, design systems, hardware/physical computing, and personal work.

The site is a Next.js App Router application. Content is authored as MDX case studies in `app/posts/`, with reusable React components for galleries, videos, carousels, interactive 3D models, and project cards. Static media and downloadable resumes live in `public/`.

## Stack and runtime

- Next.js `16.4.2` with React `19.3.1` and TypeScript `5.9.3`.
- pnpm `9.15.9` is pinned by `package.json` and `pnpm-lock.yaml`.
- Tailwind CSS `4.3.3` through PostCSS.
- ESLint `9.39.5` with the Next.js flat config; this is the latest compatible lint toolchain for the current Next.js release.
- MDX rendered on the server with `next-mdx-remote-client`.
- Three.js / React Three Fiber and `<model-viewer>` power interactive 3D content.
- Vercel Analytics and Speed Insights are included in the root layout.
- The project expects Node.js 24.x in Vercel; use a current Node.js release locally.

TypeScript `5.9.3` and ESLint `9.39.5` are intentional compatibility pins. Newer TypeScript `7.x` is not supported by the current Next.js TypeScript-ESLint integration, and ESLint `10.x` is not yet accepted by Next.js' bundled lint plugins. Do not upgrade either without revalidating the Next.js toolchain.

## Important paths

- `app/page.tsx` — homepage introduction and project grid.
- `app/layout.tsx` — metadata, fonts, navigation, footer, analytics, and page transitions.
- `app/posts/*.mdx` — portfolio case studies and their frontmatter.
- `app/components/` — shared UI and MDX components.
- `app/utils.ts` — MDX discovery, frontmatter parsing, project navigation, and date formatting.
- `app/actions/unlock-project.ts` — optional password protection for locked case studies.
- `public/` — images, videos, 3D models, fonts, and PDF resumes.
- `next.config.mjs` — Next.js configuration.

## Local setup

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm run dev --hostname 127.0.0.1
```

The development site is served at `http://127.0.0.1:3000`. Next.js 16 uses Turbopack by default, so the scripts intentionally do not pass a separate `--turbopack` flag. Do not add a second `--` before `--hostname`; pnpm forwards the argument directly to the Next.js script.

Useful checks:

```bash
pnpm run lint
pnpm run build
pnpm start
```

`pnpm start` serves the production build and therefore requires `pnpm run build` first.

## Editing content

To add or update a case study, edit an existing `app/posts/*.mdx` file or add a new one with the same frontmatter shape. Keep referenced media in `public/` and use root-relative paths such as `/flo-ds-main.webp`. `app/components/mdx.tsx` defines the custom components available inside MDX; prefer those components over duplicating page markup.

Important frontmatter fields include `title`, `publishedAt`, `summary`, `image`, `employer`, `areas`, `role`, `color`, `accentColor`, `tagline`, and optional `locked` / `isDraft` flags. Keep slugs filename-based and URL-safe.

If a project is locked, the runtime reads `UNLOCK_PASSWORD`. Without that environment variable, locked projects are treated as unlocked for local development. Never commit passwords or environment files.

## Vercel reference

The deployed project is:

- Project name: `website`
- Project ID: `prj_CW2yN1dxkSzMLZDIcuoYL4g1iGmr`
- Team/account: `emileaublet1s-projects` (`team_sfVELVgZJ5WMH4oxDi4Cv3tf`)
- Primary domain: `https://aublet.ca`
- Canonical redirect: `https://www.aublet.ca` redirects to `https://aublet.ca`
- Vercel project dashboard: `https://vercel.com/emileaublet1s-projects/website`
- Git source: `emileaublet/website`, `main`

The current known production deployment is READY and was built from commit `9874f0281eba90a42d721e9d5c800d68693540b7`. The repository does not check in `.vercel/project.json`; if Vercel CLI work is needed, authenticate first and verify the intended project with `vercel project inspect --non-interactive` before linking or changing anything.

## Agent working rules

- Preserve the visual tone and portfolio content; avoid broad redesigns when making maintenance changes.
- Inspect existing components and MDX conventions before introducing new abstractions.
- Keep large media files in `public/` and use Next/Image for raster images where practical.
- Do not expose or print secrets from Vercel, local environment files, or protected case-study configuration.
- After code changes, run at least `pnpm run lint` and `pnpm run build`; for runtime changes, also smoke-test `pnpm run dev` with an HTTP request.
- Do not deploy to production or change Vercel settings unless explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
