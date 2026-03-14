// app/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { IS_DEV_MODE } from "@/app/lib/notion/server-constants";
import notionCache from "@/app/lib/notion/cache";
import { PostProp } from "@/app/lib/notion/utils";
import { getBlogLink, getDateStr } from "@/app/lib/blog-helpers";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "@/components/Common/Image";
import styles from "./BlogGrid.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, tips, and thoughts on needle felting — from pet memorials to craft techniques.",
};

export const revalidate = 10;

async function getData() {
  const posts = await notionCache.listPostProps();
  return { posts };
}

export default async function Page() {
  const { posts } = await getData();

  let filteredPosts = posts;
  if (!IS_DEV_MODE) {
    filteredPosts = posts.filter((p) => p.publish);
  }

  const sortedPosts = [...filteredPosts].sort(
    (a, b) =>
      new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
  );

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
        description="My attitude & experience. Some thoughts to share."
      />

      <section>
        <div className="container">
          <div className={styles.specialGrid}>
            {sortedPosts.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center">
                There are no posts yet
              </p>
            ) : (
              sortedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: PostProp }) {
  return (
    <div className={`${styles.contentItemBox} group relative`}>
      <Link
        href={getBlogLink(post.slug)}
        className="hover:bg-gray-50 flex h-full flex-col transition-colors"
      >
        <div className="relative aspect-square w-full flex-1">
          {post.featuredImage && (
            <Image image={post.featuredImage} className="my-0" />
          )}
          {!post.publish && (
            <div className="text-gray-600 absolute left-0 top-0 bg-white/95 px-4 py-2 text-xs font-medium">
              Draft
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="text-gray-500 mb-2 flex items-center gap-2 text-xs">
            {post.created_time && <span>{getDateStr(post.created_time)}</span>}
          </div>

          <h2 className="text-gray-900 text-xl font-medium">{post.title}</h2>
        </div>
      </Link>
    </div>
  );
}
