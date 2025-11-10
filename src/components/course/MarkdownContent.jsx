/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownContent({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mb-4 text-dark" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold mb-3 text-dark" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-semibold mb-2 text-dark" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-dark mb-4 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 text-dark" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          const lang = match ? match[1] : "text";

          return !inline && match ? (
            <div className="my-4 rounded-md overflow-hidden shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-center bg-gray-900 text-gray-200 px-4 py-2 text-sm font-mono">
                <span className="capitalize">{lang}</span>
                <button
                  onClick={() => handleCopy(codeString)}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Code Block */}
              <SyntaxHighlighter
                style={oneDark}
                language={lang}
                PreTag="div"
                className="rounded-b-md !m-0"
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}