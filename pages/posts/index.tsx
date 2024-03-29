import type { GetStaticProps, NextPage } from "next";
import Layout from "@/components/layout/Layout";
import fs from "fs";
import { Frontmatter } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDateFromString } from "@/lib/date";
import { calculateReadingLength } from "@/lib/core";
import { motion } from "framer-motion";
import { read } from "gray-matter";

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

type Props = {
  posts: Array<Post>;
};

const Post: FC<{ post: Post }> = ({ post }) => {
  const [date, setDate] = useState<string | undefined>();

  useEffect(() => {
    setDate(getDateFromString(post.frontmatter.date));
  }, [post.frontmatter.date]);

  return (
    <Link href={`/posts/${post.slug}`}>
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className="flex flex-col md:flex-row my-4 gap-8 md:h-40 cursor-pointer transition hover:bg-neutral-100  dark:hover:bg-neutral-800 w-full p-4 rounded"
      >
        <motion.div
          variants={{ hover: { rotate: -2 } }}
          className="relative w-full md:w-[unset] h-[unset] md:h-full aspect-video md:aspect-square bg-neutral-500 rounded"
        >
          <Image
            src={post.frontmatter.image}
            alt="Blog Post Featured Image"
            fill
            className="rounded object-center object-cover"
          />
        </motion.div>
        <div
          className="flex flex-col grow min-w-0 justify-between"
        >
          <h3 className="text-2xl font-bold mb-2 md:whitespace-nowrap md:overflow-hidden">
            {post.frontmatter.title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm md:max-h-[2.5rem] overflow-hidden">
            {post.frontmatter.description
              ? post.frontmatter.description.length < 164
                ? post.frontmatter.description
                : post.frontmatter.description.slice(0, 164) + "..."
              : post.content.length < 164
                ? post.content
                : post.content.slice(0, 164) + "..."}
          </p>
          <div className="flex flex-row py-1 mt-2 justify-between items-center gap-4">
            <div className="flex flex-row flex-wrap gap-2 grow md:whitespace-nowrap md:overflow-hidden">
              {date ? <div>{date}</div>
                : <div>Unknown Date</div>}
              <div>&bull;</div>
              <div>{`${calculateReadingLength(post.content)} minute read`}</div>
              {post.frontmatter.tags && (
                <>
                  <div>&bull;</div>
                  <div>{post.frontmatter.tags[0]}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Posts: NextPage<Props> = ({ posts }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const filtered = posts.filter(
    (post) =>
      post.frontmatter.title
        .toLowerCase()
        .includes(search ? search.toLowerCase() : "") ||
      post.frontmatter.tags?.some((tag: string) =>
        tag.toLowerCase().includes(search ? search.toLowerCase() : "")
      )
  );

  return (
    <Layout title="Anthony Riley | Posts">
      <div
        className="hidden md:block relative w-full aspect-video bg-gray-500 rounded mb-8"
      >
        <Image
          src="/images/blog/home.jpg"
          alt="Blog Header"
          fill
          className="rounded object-center object-cover"
          priority
        />
      </div>
      <div className="relative w-full mb-8">
        <input
          aria-label="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="block w-full px-4 py-2 text-neutral-900 bg-white border border-neutral-200 rounded-md dark:border-neutral-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100"
        />
        <svg
          className="absolute w-5 h-5 text-neutral-400 right-3 top-3 dark:text-neutral-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {filtered
        .sort(
          (post1, post2) =>
            new Date(post2.frontmatter.date).getTime() -
            new Date(post1.frontmatter.date).getTime()
        )
        .map((post, i) => (
          <Post key={i} post={post} />
        ))}
      <Link href="/posts/archive">
        <div className="text-center text-neutral-500 my-8">
          Click Here for Archived Posts
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = fs.readdirSync("./public/posts", { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((file) => {
      const result = read(`./public/posts/${file.name}`);
      const created = fs.statSync(`./public/posts/${file.name}`).birthtime;
      return {
        slug: file.name.slice(0, file.name.lastIndexOf(".")),
        frontmatter: result.data as Frontmatter,
        content: (result.content.match(/[A-Za-z0-9 _.,!"?']*/g) || []).join(" "),
      }
    });
  return { props: { posts } };
};

export default Posts;
