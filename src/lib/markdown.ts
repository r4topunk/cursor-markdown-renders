import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dataDirectory = path.join(process.cwd(), 'src/data');

export type MarkdownPost = {
  slug: string;
  content: string;
  title: string;
  date?: string;
  excerpt?: string;
  [key: string]: any;
};

export function getAllPosts(): MarkdownPost[] {
  const fileNames = fs.readdirSync(dataDirectory).filter(file => file.endsWith('.md'));
  
  const posts = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(dataDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    
    // Generate a title from the filename if not present in frontmatter
    const title = data.title || slug.replace(/-/g, ' ');
    
    return {
      slug,
      content,
      title,
      ...data,
    } as MarkdownPost;
  });
  
  // Sort posts by date if available
  return posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getPostBySlug(slug: string): MarkdownPost | null {
  try {
    const fullPath = path.join(dataDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    
    // Generate a title from the filename if not present in frontmatter
    const title = data.title || slug.replace(/-/g, ' ');
    
    return {
      slug,
      content,
      title,
      ...data,
    } as MarkdownPost;
  } catch (error) {
    return null;
  }
} 