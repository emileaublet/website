import Balancer from "react-wrap-balancer";
import { Columns } from "./components/columns";
import { Project } from "./components/project";
import { LockedProjectCard } from "./components/locked-project-card";
import { getProjects, isProjectLocked } from "./utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Page() {
  const projects = [...getProjects()].sort(
    (a, b) =>
      Number(isProjectLocked(b.metadata)) - Number(isProjectLocked(a.metadata))
  );
  return (
    <>
      <section className="mt-8 lg:mt-16">
        <Balancer className="text-3xl md:text-5xl font-semibold mt-5 lg:mt-12 max-w-4xl font-mono">
          I&apos;m Émile, a senior product builder and design systems leader based
          in Montreal, Canada.
        </Balancer>
        <Balancer as="p" className="text-lg md:text-xl mt-4 lg:mt-8 max-w-4xl">
          I turn complex ideas into clear, useful products and build the systems
          that help them scale.
          <br />
          <br />
          <span className="text-sm md:text-base">
            I work across product strategy, UX, interface design, prototyping,
            technology, and design systems. I&apos;m interested in the space between
            an idea and a working product: shaping the direction, understanding
            how it should be built, and creating the tools and systems that make
            it possible. AI is a newer part of my toolkit, whether I&apos;m building
            an AI-powered product or helping a team find practical ways to use it
            in its own work. The underlying work is the same: understand the
            problem, set a direction, and make something useful.{" "}
            <Link
              className="group text-emerald-700 dark:text-emerald-500 font-semibold hover:text-emerald-600"
              href="mailto:emileaublet@gmail.com"
            >
              Let&apos;s get in touch
              <FaArrowRight className="size-4 inline-table ml-1.5 -mt-0.5 group-hover:tranemerald-x-1 transition-transform duration-300" />
            </Link>
          </span>
        </Balancer>
      </section>
      <section className="border-t border-current/5 mt-12 lg:mt-16">
        <h2>Projects</h2>
        <Columns>
          {projects.map((project) =>
            isProjectLocked(project.metadata) ? (
              <LockedProjectCard
                key={project.slug}
                slug={project.slug}
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
