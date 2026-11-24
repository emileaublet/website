import { isProjectUnlocked } from "app/actions/unlock-project";
import type { ProjectCardMetadata } from "app/components/project";
import { getProjects, isProjectLocked } from "app/utils";

const privateHeaders = { "Cache-Control": "private, no-store" };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!(await isProjectUnlocked())) {
    return new Response(null, { status: 204, headers: privateHeaders });
  }

  const project = getProjects().find((item) => item.slug === slug);
  if (!project || !isProjectLocked(project.metadata)) {
    return new Response(null, { status: 404, headers: privateHeaders });
  }

  const { title, image, color, accentColor, scrim, scrimColor, year, tagline } =
    project.metadata;
  const card: ProjectCardMetadata = {
    title,
    image,
    color,
    accentColor,
    scrim,
    scrimColor,
    year,
    tagline,
  };

  return Response.json(card, { headers: privateHeaders });
}
