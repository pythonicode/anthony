import { calculateReadingLength } from "@/lib/core";
import { Frontmatter } from "@/lib/types";
import Card from "../core/Card";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  created: number;
};

type Props = {
  posts: Array<Post>;
};

export default function Featured({ posts }: Props) {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold mb-8 mt-16 text-center md:text-left">
        Featured Posts
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {posts.map((post, i) => (
          <Card
            key={i}
            index={i}
            image={post.frontmatter.image}
            minutes={calculateReadingLength(post.content)}
            slug={post.slug}
            href={`/posts/${post.slug}`}
          >
            <h3 className="text-xl font-bold">{post.frontmatter.title}</h3>
            <p className="my-2 text-gray-500">
              {post.frontmatter.description
                ? post.frontmatter.description.length < 164
                  ? post.frontmatter.description
                  : post.frontmatter.description.slice(0, 164) + "..."
                : post.content.length < 164
                ? post.content
                : post.content.slice(0, 164) + "..."}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
