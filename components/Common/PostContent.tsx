import React from "react";
import { RenderBlock } from "@/app/lib/notion/utils";
import Block from "./Block";

const PostContent = ({ blocks }: { blocks: RenderBlock[] }) => {
  return (
    <article className="w-full">
      {blocks.map((block, id) => {
        return <Block key={id} block={block} />;
      })}
    </article>
  );
};

export default PostContent;
