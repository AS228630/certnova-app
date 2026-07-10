"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiCoachMessageContent({ content }: { content: string }) {
  return (
    <div className="prose-ai-coach text-sm leading-relaxed text-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h3 className="mb-2 mt-4 text-base font-bold text-text first:mt-0" {...props} />,
          h2: (props) => <h3 className="mb-2 mt-4 text-base font-bold text-text first:mt-0" {...props} />,
          h3: (props) => <h4 className="mb-1.5 mt-3 text-sm font-bold text-text first:mt-0" {...props} />,
          p: (props) => <p className="mb-3 last:mb-0" {...props} />,
          strong: (props) => <strong className="font-bold text-text" {...props} />,
          ul: (props) => <ul className="mb-3 ml-4 list-disc space-y-1" {...props} />,
          ol: (props) => <ol className="mb-3 ml-4 list-decimal space-y-1" {...props} />,
          li: (props) => <li className="leading-relaxed" {...props} />,
          code: (props) => (
            <code className="rounded bg-panel-alt px-1.5 py-0.5 font-mono text-xs text-primary" {...props} />
          ),
          pre: (props) => (
            <pre className="mb-3 overflow-x-auto rounded-lg bg-panel-alt p-3 text-xs" {...props} />
          ),
          table: (props) => (
            <div className="mb-3 overflow-x-auto rounded-lg border border-border-soft">
              <table className="w-full text-left text-xs" {...props} />
            </div>
          ),
          thead: (props) => <thead className="bg-panel-alt" {...props} />,
          th: (props) => <th className="border-b border-border-soft px-3 py-2 font-bold text-text" {...props} />,
          td: (props) => <td className="border-b border-border-soft px-3 py-2 text-text-muted" {...props} />,
          a: (props) => <a className="text-primary underline" target="_blank" rel="noopener noreferrer" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
