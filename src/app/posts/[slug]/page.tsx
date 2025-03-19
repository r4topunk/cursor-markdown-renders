import { getPostBySlug, getAllPosts, MarkdownPost } from "@/lib/markdown";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center mb-8 text-blue-600 hover:underline"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to all posts
        </Link>
        
        <article className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{post.title}</h1>
            {post.date && (
              <p className="text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
            )}
          </header>
          
          <div className="prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </main>
      
      <footer className="mt-20 text-center text-gray-500 dark:text-gray-400">
        <p>Built with Next.js and Tailwind CSS</p>
      </footer>
    </div>
  );
} 