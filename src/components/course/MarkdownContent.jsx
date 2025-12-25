import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Terminal } from "lucide-react";

const CodeBlock = ({ language, codeString, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-700 shadow-2xl bg-[#282c34]">
      {/* Header Code Block */}
      <div className="flex justify-between items-center bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {/* Hiasan titik ala Mac OS */}
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            {language || "TERMINAL"}
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-md"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

  
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
        showLineNumbers={true} 
        lineNumberStyle={{ minWidth: "2em", paddingRight: "1em", color: "#5c6370" }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default function MarkdownContent({ content }) {
  return (
    <article className="prose prose-invert max-w-none text-gray-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-white border-b border-gray-700 pb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-indigo-300" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-indigo-200" {...props} />
          ),

          p: ({ node, ...props }) => (
            <p className="mb-6 leading-relaxed text-base md:text-lg text-gray-300" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-300" {...props} />
          ),
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-6 bg-gray-800/50 rounded-r-lg italic text-gray-400" {...props} />
          ),

          a: ({ node, ...props }) => (
            <a 
              className="text-indigo-400 font-medium hover:text-indigo-300 underline decoration-indigo-500/30 hover:decoration-indigo-300 transition-all" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props} 
            />
          ),

          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700 text-left text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-800" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 font-semibold text-white uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-gray-300 border-t border-gray-700" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img 
              className="rounded-xl shadow-lg border border-gray-700 my-6 max-h-[500px] w-auto mx-auto object-cover" 
              {...props} 
            />
          ),

          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const lang = match ? match[1] : null;

            return !inline && match ? (
              <CodeBlock language={lang} codeString={codeString} {...props} />
            ) : (
              <code className="bg-gray-700/50 border border-gray-600/50 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[0.9em]" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}