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

function buildArticleJsonLd(postProp: any, description?: string) {
  const ogImage = postProp.featuredImage?.file?.url
    ? `https://feltwith.love/api/images/${postProp.id}/${postProp.featuredImage.file.url.split("/").pop()}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postProp.title,
    ...(description && { description }),
    ...(ogImage && { image: ogImage }),
    datePublished: postProp.created_time,
    dateModified: postProp.last_edited_time,
    url: `https://feltwith.love/blog/${postProp.slug}`,
    author: {
      "@type": "Person",
      name: "Wendy Zhang",
      url: "https://feltwith.love/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Felt With Love",
      url: "https://feltwith.love",
      logo: {
        "@type": "ImageObject",
        url: "https://feltwith.love/images/logo/logo.svg",
      },
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
  const blocks = post as Block[];
  const description = extractDescription(blocks);

  const jsonLdItems: object[] = [buildArticleJsonLd(postProp, description)];

  // "How to Order" post has FAQ content — add FAQPage schema
  if (postProp.slug === "how-to-order-custom-needle-felted-pet-portrait") {
    jsonLdItems.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to make a custom needle felted pet portrait?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Creation takes 30–40 days (longer for intricate patterns). Shipping takes 10–25 business days after approval.",
          },
        },
        {
          "@type": "Question",
          name: "What photos should I send for my custom pet portrait?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Share multiple angles (front, side, top). Pick one main photo for pose/expression and one for fur color. Natural light works best.",
          },
        },
        {
          "@type": "Question",
          name: "Can I request changes during the creation process?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Progress photos are sent for your feedback. Adjustments can be made to ensure it feels perfect.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer gift wrapping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — gift wrapping is available for +$10, and a handwritten note on eco-friendly stationery is free.",
          },
        },
      ],
    });
  }

  return (
    <>
      {jsonLdItems.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
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
