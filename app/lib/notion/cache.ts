import { readFile, writeFile, mkdir } from "./fs-helpers";
import path from "path";
import { cacheImages, PostProp, RenderBlock } from "./utils";
import { NotionClient } from "./client";
import {
  BLOG_INDEX_ID,
  NOTION_INTEGRATION_TOKEN,
  CACHE_DIRECTORY,
} from "./server-constants";
import pLimit from "p-limit";
import { downloadImage } from "./image-downloader";

interface CacheIndex {
  ordered_ids: string[];
  id_by_slug: Record<string, string>;
  last_updated_time: string;
  last_update_takes: number;
  prop_by_id: Record<string, PostProp>;
}

export class NotionCache {
  private cacheDirectory: string;
  private pagesDirectory: string;
  private blogIndexFile: string;
  private notionClient: NotionClient;
  private databaseId: string;
  private cache: CacheIndex | null = null;

  constructor(
    notionClient: NotionClient,
    cacheDirectory: string,
    databaseId: string
  ) {
    this.cacheDirectory = cacheDirectory;
    this.pagesDirectory = path.join(cacheDirectory, "pages");
    this.blogIndexFile = path.join(cacheDirectory, "blog-index.json");
    this.notionClient = notionClient;
    this.databaseId = databaseId;
  }

  private async readIndex(): Promise<CacheIndex> {
    try {
      this.cache = JSON.parse((await readFile(this.blogIndexFile)).toString());
    } catch (e) {
      console.log(`Error reading index, creating new one. \n${e}`);
      this.reset();
    }

    return this.cache;
  }

  private async persistIndex() {
    await mkdir(this.cacheDirectory, { recursive: true });
    // Cache feature images and update their URLs
    for (const postId of this.cache.ordered_ids) {
      const prop = this.cache.prop_by_id[postId];
      if (prop.featuredImage) {
        try {
          const localImageUrl = await downloadImage(
            prop.featuredImage.file.url,
            postId,
            0, // imageIdx
            this.cacheDirectory // Pass the root cache directory here
          );
          if (localImageUrl) {
            prop.featuredImage.file.url = localImageUrl;
            prop.featuredImage.file.expiry_time = "never";
          }
        } catch (error) {
          console.error(
            `Failed to cache feature image for post ${postId}:`,
            error
          );
        }
      }
    }

    await writeFile(
      this.blogIndexFile,
      JSON.stringify(this.cache, null, 2),
      "utf8"
    );
  }

  async reset() {
    this.cache = {
      ordered_ids: [],
      id_by_slug: {},
      prop_by_id: {},
      last_updated_time: "2001-11-10T05:48:00.000Z",
      last_update_takes: 10 * 60 * 1000,
    };
    await this.persistIndex();
  }

  async getCache(
    refresh: boolean = true,
    lazy_threshold: number = 10 * 60 * 1000 // 10 minutes
  ): Promise<CacheIndex> {
    await this.readIndex();
    const waitForUpdate =
      new Date(this.cache.last_updated_time).getTime() +
      lazy_threshold -
      new Date().getTime();
    if (!refresh || waitForUpdate > 0) {
      console.log(
        `Skipping cache refresh, next update in ${waitForUpdate / 1000}s`
      );
      return this.cache;
    }

    const updatedPages = await this.notionClient.getUpdatedPagesSince(
      this.databaseId,
      this.cache.last_updated_time
    );

    this.cache.last_updated_time = new Date().toISOString();
    const limit = pLimit(2);

    const promises = updatedPages.map((page) =>
      limit(async () => {
        const prop = NotionClient.getPageProp(page);
        if (!prop) {
          console.log(`Skipping page ${page.id} due to missing slug or title`);
          return;
        }

        let retry = 0;
        while (true) {
          try {
            const post = await this.notionClient.getBlocks(prop.id);
            await this.writePostCache(prop, post);
            return prop;
          } catch (error) {
            if (retry < 3) {
              retry++;
              continue;
            }
            console.error(`Error processing page ${page.id}:`, error);
            break;
          }
        }
      })
    );

    // Execute all promises concurrently
    const updatedProps = await Promise.all(promises);
    updatedProps.forEach((prop) => {
      if (prop) {
        this.cache.prop_by_id[prop.id] = prop;
        this.cache.id_by_slug[prop.slug] = prop.id;
      }
    });

    // order the ids by created time descending
    this.cache.ordered_ids = Object.values(this.cache.prop_by_id)
      .map((prop: PostProp) => prop.id)
      .sort(
        (a, b) =>
          new Date(this.cache.prop_by_id[b].created_time).getTime() -
          new Date(this.cache.prop_by_id[a].created_time).getTime()
      );
    this.cache.last_update_takes =
      new Date().getTime() - new Date(this.cache.last_updated_time).getTime();
    console.log(`Cache updated in ${this.cache.last_update_takes}ms`);

    await this.persistIndex();

    return this.cache;
  }

  async writePostCache(prop: PostProp, postBlocks: RenderBlock[]) {
    await mkdir(this.pagesDirectory, { recursive: true });
    const cacheFile = path.join(this.pagesDirectory, `${prop.id}.json`);
    const result = await cacheImages(prop.id, postBlocks, this.cacheDirectory);
    await writeFile(
      cacheFile,
      JSON.stringify(result.blocks, null, 2),
      "utf8"
    ).catch((e) => {
      console.log(`Error writing post cache: ${e}`);
    });
    console.log(
      `${prop.slug}: ${result.blocks.length} blocks with ${result.numImage} last edited at ${prop.last_edited_time} written to ${cacheFile}`
    );
  }

  async getPost(prop: PostProp): Promise<RenderBlock[]> {
    const cacheFile = path.join(this.pagesDirectory, `${prop.id}.json`);
    try {
      const cachedPost = JSON.parse(
        await readFile(cacheFile, "utf8")
      ) as RenderBlock[];
      console.log(
        `${cachedPost.length} blocks for ${prop.slug} read from ${cacheFile}`
      );
      return cachedPost;
    } catch (e) {
      console.log(`Error reading post cache: ${e}`);
      return this.notionClient.getBlocks(prop.id);
    }
  }

  async listPostProps() {
    await this.getCache();
    return this.cache.ordered_ids.map((id) => this.cache.prop_by_id[id]);
  }

  async getPostPropBySlug(slug: string) {
    await this.getCache();
    return this.cache.prop_by_id[this.cache.id_by_slug[slug]];
  }
}

const notionClient = new NotionClient(NOTION_INTEGRATION_TOKEN);
const notionCache = new NotionCache(
  notionClient,
  CACHE_DIRECTORY,
  BLOG_INDEX_ID
);

export default notionCache;
