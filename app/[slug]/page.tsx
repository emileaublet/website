import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getProjects } from "app/utils";
import { baseUrl } from "app/sitemap";
import { NameVal } from "app/components/nameval";
import { PasswordGate } from "app/components/password-gate";
import { isProjectUnlocked } from "app/actions/unlock-project";
import Image from "next/image";

function isLocked(metadata: { locked?: boolean | string }) {
  return metadata.locked === true || metadata.locked === "true";
}

export async function generateStaticParams() {
  let posts = getProjects();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  let post = getProjects().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  if (isLocked(post.metadata) && !(await isProjectUnlocked(post.slug))) {
    return {
      title: "Password Protected",
      description: "This case study is password-protected.",
      robots: { index: false, follow: false },
    };
  }

  let { title, summary: description } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/${post.slug}`,
    },
    images: [
      {
        url: `${baseUrl}/${post.metadata.image}`,
        width: 800,
        height: 600,
      },
    ],
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Project(props) {
  const params = await props.params;
  let post = getProjects().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const locked = isLocked(post.metadata);
  const unlocked = locked ? await isProjectUnlocked(post.slug) : true;

  if (locked && !unlocked) {
    return (
      <section>
        <PasswordGate slug={post.slug} />
      </section>
    );
  }

  return (
    <section>
      {post.metadata.isDraft && (
        <div className=" bg-orange-500/65 backdrop-blur-3xl w-full p-2 mb-8 rounded-lg text-sm font-medium">
          👋&ensp;Hello! I am still working on this project, some images/content
          may be missing.
        </div>
      )}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            about: post.metadata.title,
            abstract: post.metadata.summary,
            thumbnailUrl: `/og?title=${encodeURIComponent(
              post.metadata.title
            )}`,
            url: `${baseUrl}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Émile Aublet",
            },
          }),
        }}
      />
      <header className="subtle-border-b pb-6 mb-6">
        <h1 className="title font-semibold text-4xl md:text-6xl tracking-tighter max-w-4xl">
          {post.metadata.title}
        </h1>
        <div className="prose dark:prose-invert max-w-4xl flex flex-col-reverse md:flex-col gap-0">
          <CustomMDX
            source={`<p className="lead">${post.metadata.summary}</p>`}
          />
          {[
            post.metadata.employer,
            post.metadata.role,
            post.metadata.areas,
          ].some((v) => v) && (
            <div className="grid gap-1 md:gap-4 md:grid-cols-3 lg:grid-cols-4 mt-6">
              {post.metadata.employer && (
                <NameVal name="Employer" val={post.metadata.employer} />
              )}
              {post.metadata.role && (
                <NameVal name="Role" val={post.metadata.role} />
              )}
              {post.metadata.areas && (
                <NameVal name="Skills" val={post.metadata.areas} />
              )}
            </div>
          )}
        </div>
      </header>
      <article className="prose dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
