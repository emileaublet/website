import Balancer from "react-wrap-balancer";
import { Columns } from "./components/columns";
import { Project } from "./components/project";
import { getProjects } from "./utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Page() {
  const projects = getProjects();
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
          {projects.map((project) => (
            <Project
              key={project.slug}
              metadata={project.metadata}
              slug={project.slug}
            />
          ))}
        </Columns>
      </section>
    </>
  );
}
