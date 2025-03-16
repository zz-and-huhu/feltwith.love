const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const normalizeId = (id) => {
  if (!id) return id;
  if (id.length === 36) return id;
  if (id.length !== 32) {
    throw new Error(
      `Invalid blog-index-id: ${id} should be 32 characters long. Info here https://github.com/ijjk/notion-blog#getting-blog-index-and-token`
    );
  }
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`;
};

const NOTION_INTEGRATION_TOKEN = process.env.NOTION_INTEGRATION_TOKEN;
const IS_DEV_MODE = process.env.NODE_ENV == "development";
const BLOG_INDEX_ID = normalizeId(process.env.BLOG_INDEX_ID);
const API_ENDPOINT = "https://www.notion.so/api/v3";
const CACHE_DIRECTORY = "cache";
const BLOG_INDEX = "blog_index.json";
// revalidate in seconds
const REVALIDATE_AFTER = 10;
const PUBLIC_IMAGES_DIRECTORY = path.resolve("public", "images");

module.exports = {
  BLOG_INDEX_ID,
  API_ENDPOINT,
  BLOG_INDEX,
  NOTION_INTEGRATION_TOKEN,
  PUBLIC_IMAGES_DIRECTORY,
  REVALIDATE_AFTER,
  CACHE_DIRECTORY,
  IS_DEV_MODE,
  normalizeId,
};
