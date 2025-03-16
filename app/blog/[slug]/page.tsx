// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getBlogLink, getDateStr } from "@/app/lib/blog-helpers";
import { Block, PostProp, aggregate } from "@/app/lib/notion/utils";
import notionCache from "@/app/lib/notion/cache";
import PostContent from "@/components/Common/PostContent";
import { RiCalendarLine, RiAlertLine } from "@/public/icons/Index";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Generate static paths at build time
export async function generateStaticParams() {
  const props = await notionCache.listPostProps();
  return props.map(({ slug }) => ({ slug }));
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const postProp = await notionCache.getPostPropBySlug(slug);
  if (!postProp) return {};

  return {
    title: postProp.title,
    openGraph: {
      title: postProp.title,
      publishedTime: postProp.created_time,
      url: getBlogLink(postProp.slug),
    },
  };
}

// Lazy-load Cusdis client component
// const CusdisComments = dynamic(() => import("@/components/CusdisComments"), {
//   ssr: false,
// });

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
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

        {/* Comments */}
        <div className="mt-16">
          {/* <CusdisComments postProp={postProp} className="cusdis-comments" /> */}
        </div>
      </div>
    </>
  );
}
