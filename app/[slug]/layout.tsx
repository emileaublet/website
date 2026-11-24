import { Columns } from "app/components/columns";
import { Project } from "app/components/project";
import { LockedProjectCard } from "app/components/locked-project-card";
import { getAdjacentProjects, isProjectLocked } from "app/utils";

export default async function MdxLayout(props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const { slug } = params;
  const { previous, next } = getAdjacentProjects(slug);

  if (!previous || !next) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="mt-24">{children}</div>
      <div className="border-t border-current/5 mt-24">
        <h2>More projects</h2>
        <Columns>
          {isProjectLocked(previous.metadata) ? (
            <LockedProjectCard key={previous.slug} slug={previous.slug} />
          ) : (
            <Project metadata={previous.metadata} slug={previous.slug} />
          )}
          {isProjectLocked(next.metadata) ? (
            <LockedProjectCard key={next.slug} slug={next.slug} />
          ) : (
            <Project metadata={next.metadata} slug={next.slug} />
          )}
        </Columns>
      </div>
    </>
  );
}
