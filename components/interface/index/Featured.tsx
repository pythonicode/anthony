import Title from "@/components/typography/Title";
import { calculateReadingLength } from "@/lib/core";
import { Frontmatter } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Card from "./Card";

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
      <Title color="gold">Featured Posts</Title>
      <div className="flex flex-col md:flex-row gap-8">
        {posts.map((post, i) => (
          <Card
            key={i}
            index={i}
            title={post.frontmatter.title}
            description={
              post.frontmatter.description
                ? post.frontmatter.description.length < 164
                  ? post.frontmatter.description
                  : post.frontmatter.description.slice(0, 164) + "..."
                : post.content.length < 164
                ? post.content
                : post.content.slice(0, 164) + "..."
            }
            image={post.frontmatter.image}
            minutes={calculateReadingLength(post.content)}
            slug={post.slug}
            href={`/posts/${post.slug}`}
          />
        ))}
      </div>

      <Link href="/posts">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-row items-center justify-center w-full my-8 group cursor-pointer"
        >
          <hr className="grow border-b border-gray-500 group-hover:border-black dark:group-hover:border-white" />
          <div className="flex flex-col items-center justify-center">
            <motion.a className="text-gray-500 group-hover:text-black dark:group-hover:text-white text-xl transition-colors mx-10">
              More Posts
            </motion.a> 
          </div>
          <hr className="grow border-b border-gray-500 group-hover:border-black dark:group-hover:border-white" />
        </motion.div>
      </Link>
    </>
  );
}
