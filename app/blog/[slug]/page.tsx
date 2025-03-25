// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogLink, getDateStr } from "@/app/lib/blog-helpers";
import { Block, aggregate } from "@/app/lib/notion/utils";
import notionCache from "@/app/lib/notion/cache";
import PostContent from "@/components/Common/PostContent";
import { RiCalendarLine } from "@/public/icons/Index";
import Breadcrumb from "@/components/Common/Breadcrumb";
import dynamic from "next/dynamic";

// Generate static paths at build time
export async function generateStaticParams() {
  const props = await notionCache.listPostProps();
  return props.map(({ slug }) => ({ slug }));
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

  return {
    title: postProp.title,
    openGraph: {
      title: postProp.title,
      publishedTime: postProp.created_time,
      url: getBlogLink(postProp.slug),
    },
  };
}

const CusdisComments = dynamic(
  () => import("@/components/CusdisComments/CusdisComments")
);

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

        <div className="border-t py-12 mt-12 border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <svg
              className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h2
              id="comments-heading"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Leave Your Comments!
            </h2>
          </div>

          <CusdisComments
            attrs={{
              host: "https://cusdis.com",
              appId: "a3c8f4c8-7ee1-431b-abc3-bd00ececd582",
              pageId: postProp.slug,
              pageTitle: postProp.title,
              pageUrl: "http://localhost:3000" + getBlogLink(postProp.slug),
            }}
          />
        </div>
      </div>
    </>
  );
}
