import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export const MarkdownContent = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none text-justify">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
