'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

interface CodeComponentProps {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold my-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-bold my-2">{children}</h4>,
          h5: ({ children }) => <h5 className="text-base font-bold my-1">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-bold my-1">{children}</h6>,
          p: ({ children }) => <p className="my-2">{children}</p>,
          a: ({ href, children }) => (
            <Link href={href || ''} className="text-blue-600 hover:underline">{children}</Link>
          ),
          ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
          li: ({ children }) => <li className="my-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-3 italic">{children}</blockquote>
          ),
          code: ({ inline, className, children }: CodeComponentProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return inline ? (
              <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">
                {children}
              </code>
            ) : (
              <pre className="my-4">
                <code className={`${match ? match[1] : ''} block p-4 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm overflow-x-auto`}>
                  {children}
                </code>
              </pre>
            );
          },
          img: ({ src, alt }) => (
            <Image 
              src={src || ''} 
              alt={alt || ''} 
              width={1920}
              height={1080}
              className="w-full h-auto my-4" 
              sizes="100vw"
              priority={false}
            />
          ),
          hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">{children}</tr>,
          th: ({ children }) => <th className="py-3 px-4 text-left font-medium">{children}</th>,
          td: ({ children }) => <td className="py-3 px-4">{children}</td>,
          iframe: ({ src, ...props }) => (
            <div className="relative w-full my-4 aspect-video">
              {src && (
                <iframe 
                  src={src} 
                  className="w-full h-full border-0 rounded" 
                  allowFullScreen 
                  {...props} 
                />
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 