import React from "react";
import {
  Equation as EquationProp,
  Mention as MentionProp,
  Text as TextProp,
} from "@/app/lib/notion/utils";
import Equation from "./Equation";

export function renderText(text: (TextProp | EquationProp | MentionProp)[]) {
  return text.map((text, textId) => {
    return <Text text={text} key={textId} />;
  });
}

export const Text = (props: {
  text: TextProp | EquationProp | MentionProp;
}) => {
  if (props.text.type === "text") {
    const text = props.text.text;
    const annotations = props.text.annotations;

    if (text.link) {
      return (
        <a href={text.link.url} className="border-b-primary hover:border-b-2">
          {text.content}
        </a>
      );
    }
    return (
      <span
        style={{
          color: annotations.color,
          textDecoration:
            (annotations.underline ? "underline " : "") +
            (annotations.strikethrough ? "line-through " : ""),
        }}
        className={
          (annotations.bold ? "bold " : "") +
          (annotations.italic ? "italic " : "") +
          (annotations.code ? "code " : "")
        }
      >
        {text.content}
      </span>
    );
  } else if (props.text.type === "equation") {
    return (
      <Equation displayMode={false}>{props.text.equation.expression}</Equation>
    );
  }
};
