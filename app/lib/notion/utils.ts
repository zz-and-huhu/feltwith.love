import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { downloadImage } from "./image-downloader";
import pLimit from "p-limit";

export type Await<T> = T extends PromiseLike<infer U> ? U : T;
export type ArrayElement<T> = T extends Array<infer U> ? U : T;
type ParagraphElement<T> = T extends { type: "paragraph" } ? T : never;
type TextElement<T> = T extends { type: "text" } ? T : never;
type MentionElement<T> = T extends { type: "mention" } ? T : never;
type EquationElement<T> = T extends { type: "equation" } ? T : never;
type HeadingOneElement<T> = T extends { type: "heading_1" } ? T : never;
type HeadingTwoElement<T> = T extends { type: "heading_2" } ? T : never;
type HeadingThreeElement<T> = T extends { type: "heading_3" } ? T : never;
type BulletedListItemElement<T> = T extends { type: "bulleted_list_item" }
  ? T
  : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToggleElement<T> = T extends { type: "toggle" } ? T : never;
type QuoteElement<T> = T extends { type: "quote" } ? T : never;
type CalloutElement<T> = T extends { type: "callout" } ? T : never;
type CodeElement<T> = T extends { type: "code" } ? T : never;
type ImageElement<T> = T extends { type: "image" } ? T : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type BookmarkElement<T> = T extends { type: "bookmark" } ? T : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DividerElement<T> = T extends { type: "divider" } ? T : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToCElement<T> = T extends { type: "table_of_contents" } ? T : never;

export type Block =
  | BlockObjectResponse
  | { type: "divider"; has_children: false };
export type Paragraph = ParagraphElement<Block>;
export type Text = TextElement<
  ArrayElement<Paragraph["paragraph"]["rich_text"]>
>;
export type Mention = MentionElement<
  ArrayElement<Paragraph["paragraph"]["rich_text"]>
>;
export type Equation = EquationElement<
  ArrayElement<Paragraph["paragraph"]["rich_text"]>
>;
export type Image = ImageElement<Block>;

type GetImageProp<T> = T extends { image: infer U } ? U : never;
// ImageProp type is the type of image inside Image
export type ImageProp = GetImageProp<Image>;

export type HeadingOne = HeadingOneElement<Block>;
export type HeadingTwo = HeadingTwoElement<Block>;
export type HeadingThree = HeadingThreeElement<Block>;
export type BulletedListItem = BulletedListItemElement<Block>;

export type Quote = QuoteElement<Block>;
export type Callout = CalloutElement<Block>;
export type Code = CodeElement<Block>;
export type BlockEquation = EquationElement<Block>;

export type BlockWithChildren =
  | (Block & { children: RenderBlock[]; has_children: true })
  | {
      type: "aggregated_bulleted_list";
      has_children: true;
      children: RenderBlock[];
    }
  | {
      type: "aggregated_numbered_list";
      has_children: true;
      children: RenderBlock[];
    };

export type RenderBlock = Block | BlockWithChildren;

export type Post = Array<RenderBlock>;

export interface PostProp {
  title: string;
  slug: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  url: string;
  tags: string[];
  publish: boolean;
  featuredImage: any;
}

export function getPlainFromRich(rich: { plain_text: string }[]) {
  return rich.reduce<string>((prev, cur) => prev + cur.plain_text, "");
}

function aggregateChildren(block: RenderBlock) {
  if (block.has_children) {
    // console.log(
    //   'aggregating children',
    //   (block as BlockWithChildren).children,
    //   aggregate((block as BlockWithChildren).children)
    // )
    return {
      ...block,
      children: aggregate((block as BlockWithChildren).children),
    };
  }
  return block;
}

export function aggregate(blocks: RenderBlock[]): RenderBlock[] {
  const result = [];
  let encounteredBulletedList = false;
  let encounteredNumberedList = false;
  let children = [];
  for (const block of blocks) {
    if (block.type === "bulleted_list_item" && !encounteredNumberedList) {
      encounteredBulletedList = true;
      children.push(aggregateChildren(block));
    } else if (
      block.type === "numbered_list_item" &&
      !encounteredBulletedList
    ) {
      encounteredNumberedList = true;
      children.push(aggregateChildren(block));
    } else {
      if (encounteredBulletedList || encounteredNumberedList) {
        result.push({
          type: encounteredNumberedList
            ? "aggregated_numbered_list"
            : "aggregated_bulleted_list",
          has_children: true,
          children: [...children],
        });
        children = [];
        encounteredBulletedList = false;
        encounteredNumberedList = false;
      }
      result.push(aggregateChildren(block));
    }
  }
  if (children.length > 0) {
    result.push({
      type: encounteredNumberedList
        ? "aggregated_numbered_list"
        : "aggregated_bulleted_list",
      has_children: true,
      children: [...children],
    });
  }
  return result;
}

export async function cacheImages(
  postId: string,
  postBlocks: RenderBlock[],
  cacheDirectory: string = "./cache"
): Promise<{ blocks: RenderBlock[]; numImage: number }> {
  let currentImage = 0;

  // Flatten the blocks into a single array for easier processing
  const flattenBlocks = (blocks: RenderBlock[]): RenderBlock[] => {
    return blocks.flatMap((block) => {
      if (block.has_children) {
        return [block, ...flattenBlocks((block as BlockWithChildren).children)];
      }
      return [block];
    });
  };

  const flattenedBlocks = flattenBlocks(postBlocks);
  const limit = pLimit(5);

  await Promise.all(
    flattenedBlocks.map((block) =>
      limit(async () => {
        if (block.type === "image") {
          const url =
            block.image?.type === "file"
              ? block.image.file.url
              : block.image?.external.url;
          if (url) {
            currentImage += 1;
            try {
              const filename = await downloadImage(
                url,
                postId,
                currentImage,
                cacheDirectory
              );
              if (!filename) {
                console.log(
                  `Error downloading ${currentImage}th image from ${url} for post ${postId}, skipping...`
                );
                return;
              }
              if (block.image?.type === "file") {
                block.image.file.url = filename;
                block.image.file.expiry_time = "never";
              } else if (block.image?.type === "external") {
                block.image = {
                  type: "file",
                  file: {
                    url: filename,
                    expiry_time: "never",
                  },
                  caption: block.image.caption,
                };
              }
            } catch (e) {
              console.log(
                `Error downloading ${currentImage}th image from ${url}: ${e}`
              );
            }
          }
        }
      })
    )
  );

  return { blocks: postBlocks, numImage: currentImage };
}
