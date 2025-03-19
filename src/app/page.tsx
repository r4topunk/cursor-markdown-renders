import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  const posts = getAllPosts();
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="max-w-4xl mx-auto">
        <PageHeader 
          title="Markdown Renderer" 
          description="A beautiful way to display your Markdown content" 
        />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                {post.date && (
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                )}
              </CardContent>
              
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={`/posts/${post.slug}`}>
                    Read more →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
