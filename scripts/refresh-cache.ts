import { Command } from "commander";
import {
  NOTION_INTEGRATION_TOKEN,
  BLOG_INDEX_ID,
  CACHE_DIRECTORY,
} from "@/app/lib/notion/server-constants";
import { NotionClient } from "@/app/lib/notion/client";
import { NotionCache } from "@/app/lib/notion/cache";
import { downloadImage } from "@/app/lib/notion/image-downloader";

// // Ensure required environment variables are set
// const NOTION_INTEGRATION_TOKEN = process.env.NOTION_INTEGRATION_TOKEN;
// const BLOG_INDEX_ID = process.env.BLOG_INDEX_ID;
// const CACHE_DIRECTORY = process.env.CACHE_DIRECTORY || './cache';

if (!NOTION_INTEGRATION_TOKEN || !BLOG_INDEX_ID) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

// Initialize NotionClient and NotionCache
const notionClient = new NotionClient(NOTION_INTEGRATION_TOKEN);
const notionCache = new NotionCache(
  notionClient,
  CACHE_DIRECTORY,
  BLOG_INDEX_ID
);

// Set up the command-line interface
const program = new Command();

program
  .name("refresh-cache")
  .description("Refresh the Notion blog post cache")
  .option("-f, --force", "Force a full refresh of the cache", false)
  .option("-d, --download", "Download a single image", false)
  .action(async (options) => {
    try {
      if (options.download) {
        await downloadImage(
          "https://prod-files-secure.s3.us-west-2.amazonaws.com/61e9ba4e-4efe-4181-b506-4bdedf4d4f93/4fb5acfb-55d2-45d0-94bc-0c90252c2af8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45FSPPWI6X%2F20250118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250118T144229Z&X-Amz-Expires=3600&X-Amz-Signature=06bc7c743a2f525d5930bfe4e9fdfa48d470b4561747bf7aa9a56add26bba626&X-Amz-SignedHeaders=host&x-id=GetObject",
          "61e9ba4e-4efe-4181-b506-4bdedf4d4f93",
          0,
          "./cache/images"
        );
        return;
      }
      console.log("Refreshing cache...");
      if (options.force) {
        console.log("Forcing a full refresh...");
        await notionCache.reset();
      }
      const cache = await notionCache.getCache();
      console.log("Cache refreshed successfully!");
      console.log(
        `Last updated time: ${cache.last_updated_time}, takes ${
          cache.last_update_takes / 1000
        }s`
      );
      console.log(`Total posts cached: ${cache.ordered_ids.length}`);
    } catch (error) {
      console.error("Error refreshing cache:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
