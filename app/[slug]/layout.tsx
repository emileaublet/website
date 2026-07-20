import { Columns } from "app/components/columns";
import { Project } from "app/components/project";
import { PasswordGate } from "app/components/password-gate";
import { isProjectUnlocked } from "app/actions/unlock-project";
import { getAdjacentProjects } from "app/utils";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

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

  const previousLocked =
    isLocked(previous.metadata) && !(await isProjectUnlocked(previous.slug));
  const nextLocked =
    isLocked(next.metadata) && !(await isProjectUnlocked(next.slug));

  return (
    <>
      <div className="mt-24">{children}</div>
      <div className="border-t border-current/5 mt-24">
        <h2>More projects</h2>
        <Columns>
          {previousLocked ? (
            <PasswordGate slug={previous.slug} variant="card" />
          ) : (
            <Project metadata={previous.metadata} slug={previous.slug} />
          )}
          {nextLocked ? (
            <PasswordGate slug={next.slug} variant="card" />
          ) : (
            <Project metadata={next.metadata} slug={next.slug} />
          )}
        </Columns>
      </div>
    </>
  );
}
