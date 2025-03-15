import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import { PostProp, getPlainFromRich, RenderBlock } from "./utils";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export class NotionClient {
  private client: Client;

  constructor(authToken: string) {
    this.client = new Client({ auth: authToken });
  }

  async getAllPages(databaseId: string) {
    let { results, next_cursor, has_more } = await this.client.databases.query({
      database_id: databaseId,
    });
    while (has_more) {
      const more = await this.client.databases.query({
        database_id: databaseId,
        start_cursor: next_cursor,
      });
      results = [...results, ...more.results];
      has_more = more.has_more;
      next_cursor = more.next_cursor;
    }
    return results.filter(isFullPage);
  }

  async getUpdatedPagesSince(databaseId: string, since: string) {
    console.log(
      `Getting updated pages since ${since} with a tolerance of 1 hour...`
    );
    const resp = await this.client.databases.query({
      database_id: databaseId,
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    let results = resp.results.filter(isFullPage);
    let has_more = resp.has_more;
    let next_cursor = resp.next_cursor;

    const foundIdle = (page: PageObjectResponse) => {
      const lastEditedTime = page.last_edited_time;
      // allow 1 hour of updates for redundancy
      return (
        new Date(lastEditedTime).getTime() <
        new Date(since).getTime() - 3600 * 1000
      );
    };

    while (has_more && !results.some(foundIdle)) {
      const more = await this.client.databases.query({
        database_id: databaseId,
        sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        start_cursor: next_cursor,
      });
      results.push(...more.results.filter(isFullPage));
      has_more = more.has_more;
      next_cursor = more.next_cursor;
    }

    results = results.filter((page) => !foundIdle(page));

    console.log(`Found ${results.length} updated pages since ${since}`);

    return results;
  }

  async getChildrenBlocks(blockId: string) {
    let { results, next_cursor, has_more } =
      await this.client.blocks.children.list({
        block_id: blockId,
      });
    while (has_more && next_cursor !== null) {
      const more = await this.client.blocks.children.list({
        block_id: blockId,
        start_cursor: next_cursor,
      });
      results = [...results, ...more.results];
      has_more = more.has_more;
      next_cursor = more.next_cursor;
    }
    return results.filter(isFullBlock);
  }

  async getBlocks(blockId: string): Promise<RenderBlock[]> {
    let results = await this.getChildrenBlocks(blockId);
    results = await Promise.all(
      results.map(async (block) => {
        if (block.has_children) {
          return { ...block, children: await this.getBlocks(block.id) };
        }
        return block;
      })
    );
    return results;
  }

  static getPageProp(page: PageObjectResponse): PostProp | null {
    let title = "";
    let slug = "";
    let tags: string[] = [];
    let publish = false;
    let featuredImage;

    for (const [name, prop] of Object.entries(page.properties)) {
      if (prop.type === "title") {
        title = getPlainFromRich(prop.title);
      }
      if (name === "Slug" && prop.type === "rich_text") {
        slug = getPlainFromRich(prop.rich_text);
      }
      if (name === "Tags" && prop.type === "multi_select") {
        tags = prop.multi_select.map((t) => t.name);
      }
      if (name === "Publish" && prop.type === "checkbox") {
        publish = prop.checkbox;
      }
      if (name === "Featured Image" && prop.type === "files") {
        //@ts-ignore
        featuredImage = prop.files[0];
      }
    }

    if (slug === "" || title === "") {
      console.log(`Skipping page ${page.id} due to missing slug or title`);
      return null;
    }

    return {
      id: page.id,
      title,
      slug,
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
      url: page.url,
      tags,
      publish,
      featuredImage,
    };
  }
}
