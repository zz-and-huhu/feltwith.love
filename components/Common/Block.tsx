import React from "react";
import Equation from "./Equation";
import { renderText } from "./Text";
import Image from "./Image";
import {
  RenderBlock,
  getPlainFromRich,
  BlockWithChildren,
} from "@/app/lib/notion/utils";

function renderChildren(block: RenderBlock) {
  const b = block as BlockWithChildren;
  return b.children.map((b, i) => <Block key={i} block={b}></Block>);
}

export default function Block(props: { block: RenderBlock }) {
  const block = props.block;

  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 leading-relaxed">
          {renderText(block.paragraph.rich_text)}
        </p>
      );
    case "heading_1":
      return (
        <h1 className="mb-4 mt-8 text-3xl font-bold">
          {renderText(block.heading_1.rich_text)}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="mb-4 mt-6 text-2xl font-bold">
          {renderText(block.heading_2.rich_text)}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mb-3 mt-4 text-xl font-semibold">
          {renderText(block.heading_3.rich_text)}
        </h3>
      );
    case "aggregated_bulleted_list":
      return (
        <ul>
          {block.children.map((item, i) => {
            if (item.type === "bulleted_list_item") {
              return (
                <li key={i} className="mb-2 ml-6 list-disc">
                  {renderText(item.bulleted_list_item.rich_text)}
                  {item.has_children && renderChildren(item)}
                </li>
              );
            } else {
              return <></>;
            }
          })}
        </ul>
      );
    case "aggregated_numbered_list":
      return (
        <ol>
          {block.children.map((item, i) => {
            if (item.type === "numbered_list_item") {
              return (
                <li key={i} className="mb-2 ml-6 list-decimal">
                  {renderText(item.numbered_list_item.rich_text)}
                  {item.has_children && renderChildren(item)}
                </li>
              );
            } else {
              return <></>;
            }
          })}
        </ol>
      );
    case "bulleted_list_item":
      return (
        <ul>
          <li className="mb-2 ml-6 list-disc">
            {renderText(block.bulleted_list_item.rich_text)}
          </li>
        </ul>
      );
    case "numbered_list_item":
      return (
        <ol>
          <li className="mb-2 ml-6 list-decimal">
            {renderText(block.numbered_list_item.rich_text)}
            {block.has_children && renderChildren(block)}
          </li>
        </ol>
      );
    case "equation":
      return (
        <Equation displayMode={true}>{block.equation.expression}</Equation>
      );
    case "code":
      return (
        <pre className="bg-gray-100 mb-4 overflow-x-auto rounded-lg border p-2 hover:shadow-md">
          <code className="font-mono text-sm">
            {getPlainFromRich(block.code.rich_text)}
          </code>
        </pre>
      );
    case "toggle":
      return (
        <details className="mb-4">
          <summary className="hover:text-gray-600 cursor-pointer">
            {renderText(block.toggle.rich_text)}
          </summary>
          {block.has_children && renderChildren(block)}
        </details>
      );
    case "image":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image image={block.image} className="fx-8 my-6"></Image>;

    case "divider":
      return <hr className="border-gray-200 my-8 border-t" />;
    case "callout":
      const icon = block.callout.icon;
      const emoji = icon.type === "emoji" ? icon.emoji : "";
      return (
        <div className="bg-gray-50 border-gray-400 my-4 flex w-full rounded border p-4 pl-3 transition-shadow duration-300 hover:shadow-md">
          <div>{emoji}</div>
          <div className="ml-2">
            {renderText(block.callout.rich_text)}
            {block.has_children && renderChildren(block)}
          </div>
        </div>
      );
    case "quote":
      const quote = block.quote;
      return (
        <blockquote className="border-gray-200 my-4 border-l-4 pl-4 hover:border-primary">
          <p>{renderText(quote.rich_text)}</p>
          {block.has_children && renderChildren(block)}
        </blockquote>
      );
    default:
      console.log("can't display", block);
      return <></>;
  }
}
