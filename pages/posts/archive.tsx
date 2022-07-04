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
  title: string;
  url: string;
};

type Props = {
  posts: Post[];
};

const Archive: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <h2 className="text-5xl font-bold mb-4">Archived Posts</h2>
      <h4 className="text-gray-500 mb-8">
        Here is a list of all my old posts. Links redirect to a WordPress blog.
      </h4>
      <div className="flex flex-col gap-4">
        {posts.reverse().map((post, i) => (
          <Link key={i} href={post.url}>
            <a className="hover:underline">{post.title}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = JSON.parse(
    fs.readFileSync("./posts/archived/info.json").toString()
  );
  return { props: { posts } };
};

export default Archive;
