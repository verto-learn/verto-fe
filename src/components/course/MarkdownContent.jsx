import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Anda bisa ganti gaya lain seperti "atom-one-dark.css"

export const MarkdownContent = ({ content }) => {
  return (
    <article
      className="
        prose prose-invert max-w-none text-justify
        prose-headings:font-semibold prose-headings:text-white
        prose-h1:text-3xl prose-h1:mb-4 prose-h1:border-b prose-h1:border-gray-700 prose-h1:pb-2
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-accent
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-3
        prose-strong:text-white prose-code:text-accent prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-[#111827] prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6 prose-pre:border prose-pre:border-gray-700
        prose-li:my-1 prose-li:text-gray-300
        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-blockquote:italic
        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
        prose-a:text-cyan-400 prose-a:underline hover:prose-a:text-cyan-300
      "
    >
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};
