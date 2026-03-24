// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogLink, getDateStr } from "@/app/lib/blog-helpers";
import { Block, aggregate } from "@/app/lib/notion/utils";
import notionCache from "@/app/lib/notion/cache";
import PostContent from "@/components/Common/PostContent";
import { RiCalendarLine } from "@/public/icons/Index";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Generate static paths at build time
export async function generateStaticParams() {
  const props = await notionCache.listPostProps();
  return props.map(({ slug }) => ({ slug }));
}

// Extract plain text from the first paragraph block for meta description
function extractDescription(blocks: Block[]): string | undefined {
  for (const block of blocks) {
    if ("type" in block && block.type === "paragraph" && "paragraph" in block) {
      const richText = (block as any).paragraph.rich_text;
      if (Array.isArray(richText) && richText.length > 0) {
        const text = richText.map((t: any) => t.plain_text || "").join("");
        if (text.trim()) {
          return text.trim().slice(0, 160);
        }
      }
    }
  }
  return undefined;
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postProp = await notionCache.getPostPropBySlug(slug);
  if (!postProp) return {};

  const blocks = aggregate(await notionCache.getPost(postProp)) as Block[];
  const description = extractDescription(blocks);

  const ogImage = postProp.featuredImage?.file?.url
    ? `/api/images/${postProp.id}/${postProp.featuredImage.file.url
        .split("/")
        .pop()}`
    : undefined;

  return {
    title: postProp.title,
    ...(description && { description }),
    openGraph: {
      type: "article",
      title: postProp.title,
      ...(description && { description }),
      publishedTime: postProp.created_time,
      url: getBlogLink(postProp.slug),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postProp = await notionCache.getPostPropBySlug(slug);
  if (!postProp) notFound();

  const post = aggregate(await notionCache.getPost(postProp));

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "My Blog", href: "/blog" },
        ]}
      />
      <div className="container">
        {/* Main Content */}
        <article className="mt-8">
          <header className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{postProp.title || ""}</h1>
            {postProp.created_time && (
              <div className="text-gray-600 flex items-center text-sm">
                <RiCalendarLine className="mr-1 h-4 w-4" />
                {getDateStr(postProp.created_time)}
              </div>
            )}
          </header>

          <PostContent blocks={post as Block[]} />
        </article>
      </div>
    </>
  );
}
