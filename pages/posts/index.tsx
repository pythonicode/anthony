import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { matter, VFile } from "vfile-matter";
import { read } from "to-vfile";
import fs, { Dirent } from "fs";
import { Frontmatter } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ResponsiveImage from "@/components/core/ResponsiveImage";
import { getDate } from "@/lib/date";
import { calculateReadingLength } from "@/lib/core";

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  created: number;
};

type Props = {
  posts: Array<Post>;
};

const Post: FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="flex flex-col md:flex-row my-4 gap-8 md:h-40 cursor-pointer transition hover:bg-gray-100  dark:hover:bg-gray-800 w-full p-4 rounded">
        <div className="relative w-full md:w-[unset] h-[unset] md:h-full aspect-video md:aspect-square bg-gray-500 rounded">
          <Image
            src={post.frontmatter.image}
            alt="Blog Post Featured Image"
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <div className="flex flex-col grow min-w-0 justify-between">
          <h3 className="text-xl md:text-3xl font-bold mb-2 whitespace-nowrap overflow-hidden">
            {post.frontmatter.title}
          </h3>
          <p className="text-gray-500 text-sm md:max-h-[2.5rem] overflow-hidden">
            {post.frontmatter.description
              ? post.frontmatter.description.length < 164
                ? post.frontmatter.description
                : post.frontmatter.description.slice(0, 164) + "..."
              : post.content.length < 164
              ? post.content
              : post.content.slice(0, 164) + "..."}
          </p>
          <div className="flex flex-row py-1 mt-2 justify-between items-center gap-4">
            <div className="flex flex-row gap-2 grow whitespace-nowrap overflow-hidden">
              <p>{getDate(post.created)}</p>
              <p>&bull;</p>
              <p>{`${calculateReadingLength(post.content)} minute read`}</p>
              {post.frontmatter.tags && (
                <>
                  <p>&bull;</p>
                  <p>{post.frontmatter.tags[0]}</p>
                </>
              )}
            </div>
            <a className="whitespace-nowrap text-blue-500">Read More</a>
          </div>
        </div>
      </div>
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
      post.frontmatter.tags?.some((tag) =>
        tag.toLowerCase().includes(search ? search.toLowerCase() : "")
      )
  );

  return (
    <Layout>
      <ResponsiveImage
        src="/images/blog/home.jpg"
        alt="Blog Home Page Action Shot"
      />
      <div className="relative w-full mb-8 md:text-xl">
        <input
          aria-label="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles"
          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <svg
          className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
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
        .sort((post1, post2) => post2.created - post1.created)
        .map((post, i) => (
          <Post key={i} post={post} />
        ))}
      <Link href="/posts/archive">
        <a>
          <div className="text-center text-gray-500 my-8">
            Click Here for Archived Posts
          </div>
        </a>
      </Link>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // MDX text - can be from a local file, database, anywhere
  const posts: Array<Post> = [];
  const dir: Dirent[] = fs.readdirSync("./posts", { withFileTypes: true });
  for (const file of dir) {
    if (file.isDirectory()) continue;
    const source: VFile = await read(`./posts/${file.name}`);
    const content = source.value
      .toString()
      .trim()
      .slice(source.value.toString().trim().indexOf("---", 3) + 3);
    matter(source, { strip: true });
    const created = fs.statSync(`./posts/${file.name}`).birthtime;
    posts.push({
      slug: file.name.slice(0, file.name.lastIndexOf(".")),
      frontmatter: source.data.matter as Frontmatter,
      content: (content.match(/[A-Za-z0-9 _.,!"?']*/g) || []).join(" "),
      created: created.getTime(),
    });
  }
  return { props: { posts } };
};

export default Posts;
