import { Columns } from "app/components/columns";
import { Project } from "app/components/project";
import { getAdjacentProjects } from "app/utils";

export default function MdxLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const { previous, next } = getAdjacentProjects(slug);

  if (!previous || !next) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="relative mt-24">{children}</div>
      <div className="border-t border-current/5 mt-24">
        <h2>More projects</h2>
        <Columns>
          <Project metadata={previous.metadata} slug={previous.slug} />
          <Project metadata={next.metadata} slug={next.slug} />
        </Columns>
      </div>
    </>
  );
}
