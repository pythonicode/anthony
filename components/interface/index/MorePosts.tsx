import { calculateReadingLength } from "@/lib/core";
import { Frontmatter } from "@/lib/types";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

type RowItemProps = {
  title: string;
  minutes?: number;
  href?: string;
};

function RowItem({ title, minutes, href = "" }: RowItemProps) {
  return (
    <Link href={href}>
      <div className="flex flex-row gap-4 items-center justify-between w-full border-t border-t-gray-500 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all cursor-pointer overflow-hidden whitespace-nowrap">
        <h3 className="md:text-lg font-semibold">{title}</h3>
        {minutes && <p className="text-gray-500">{minutes} minute read</p>}
      </div>
    </Link>
  );
}

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  created: number;
};

type Props = {
  posts: Array<Post>;
};

export default function MorePosts({ posts }: Props) {
  if (posts.length === 0) return null;
  return (
    <>
      <div className="w-full mt-8 border-b border-b-gray-500">
        <Fade triggerOnce cascade>
          <>
            {posts.map((post, i) => (
              <RowItem
                key={i}
                title={post.frontmatter.title}
                minutes={calculateReadingLength(post.content)}
              />
            ))}
          </>
        </Fade>
      </div>
      <div className="p-4">
        <Link href="/posts">
          <a className="md:text-lg font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-all">
            Read More &rarr;
          </a>
        </Link>
      </div>
    </>
  );
}
