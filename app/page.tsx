import { Columns } from "./components/columns";
import { Project } from "./components/project";
import { getProjects } from "./utils";

export default function Page() {
  const projects = getProjects();
  return (
    <>
      <section className="mt-8 lg:mt-16">
        <p className="text-3xl md:text-5xl font-normal mt-5 lg:mt-12 max-w-4xl">
          I'm Émile, a design systems leader & senior product designer based in
          Montreal, Canada. Currently shaping digital experiences across
          innovative tech companies.
        </p>
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
