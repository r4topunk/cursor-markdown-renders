import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default function Home() {
  const posts = getAllPosts();
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="max-w-4xl mx-auto">
        <header className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Markdown Renderer</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
            A beautiful way to display your Markdown content
          </p>
        </header>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/posts/${post.slug}`} 
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              {post.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              )}
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              )}
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="mt-20 text-center text-gray-500 dark:text-gray-400">
        <p>Built with Next.js and Tailwind CSS</p>
      </footer>
    </div>
  );
}
