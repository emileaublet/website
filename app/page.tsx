import Balancer from "react-wrap-balancer";
import { Columns } from "./components/columns";
import { Project } from "./components/project";
import { PasswordGate } from "./components/password-gate";
import { isProjectUnlocked } from "./actions/unlock-project";
import { getProjects } from "./utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

export default async function Page() {
  const projects = [...getProjects()].sort(
    (a, b) => Number(isLocked(b.metadata)) - Number(isLocked(a.metadata))
  );
  const unlockedBySlug = Object.fromEntries(
    await Promise.all(
      projects
        .filter((p) => isLocked(p.metadata))
        .map(async (p) => [p.slug, await isProjectUnlocked(p.slug)] as const)
    )
  );
  return (
    <>
      <section className="mt-8 lg:mt-16">
        <Balancer className="text-3xl md:text-5xl font-semibold mt-5 lg:mt-12 max-w-4xl font-mono">
          I'm Émile, a design systems leader & senior product designer based in
          Montreal, Canada.
        </Balancer>
        <Balancer as="p" className="text-lg md:text-xl mt-4 lg:mt-8 max-w-3xl">
          I can help you build a design system, shape your next product or
          enhance your existing digital experiences.{" "}
          <Link
            className="group text-emerald-700 dark:text-emerald-500 font-semibold hover:text-emerald-600"
            href="mailto:emileaublet@gmail.com"
          >
            Let's get in touch
            <FaArrowRight className="size-4 inline-table ml-1.5 -mt-0.5 group-hover:tranemerald-x-1 transition-transform duration-300" />
          </Link>
        </Balancer>
      </section>
      <section className="border-t border-current/5 mt-12 lg:mt-16">
        <h2>Projects</h2>
        <Columns>
          {projects.map((project) =>
            isLocked(project.metadata) && !unlockedBySlug[project.slug] ? (
              <PasswordGate
                key={project.slug}
                slug={project.slug}
                variant="card"
              />
            ) : (
              <Project
                key={project.slug}
                metadata={project.metadata}
                slug={project.slug}
              />
            )
          )}
        </Columns>
      </section>
    </>
  );
}
