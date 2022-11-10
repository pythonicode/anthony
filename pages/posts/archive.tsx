import type { GetStaticProps, NextPage } from "next";
import Layout from "@/components/layout/Layout";
import fs from "fs";
import Link from "next/link";

type Post = {
  title: string;
  url: string;
};

type Props = {
  posts: Post[];
};

const Archive: NextPage<Props> = ({ posts }) => {
  return (
    <Layout title="Anthony Riley | Archive">
      <h2 className="text-5xl font-bold mb-4">Archived Posts</h2>
      <h4 className="text-neutral-500 mb-8">
        Here is a list of all my old posts. Links redirect to a WordPress blog.
      </h4>
      <div className="flex flex-col gap-4">
        {posts.reverse().map((post, i) => (
          <Link key={i} href={post.url} className="hover:underline">
            {post.title}
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
