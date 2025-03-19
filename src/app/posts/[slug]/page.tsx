import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";

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
        <BackButton href="/" label="Back to all posts" />
        
        <Card>
          <CardHeader>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{post.title}</h1>
            {post.date && (
              <p className="text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
} 