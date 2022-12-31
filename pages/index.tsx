import Featured from "@/components/interface/index/Featured";
import Subscribe from "@/components/interface/index/Subscribe";
import Welcome from "@/components/interface/index/Welcome";
import Layout from "@/components/layout/Layout";
import { Frontmatter } from "@/lib/types";
import { Dirent } from "fs";
import type { GetStaticProps, NextPage } from "next";
import fs from "fs";
import Portfolio from "@/components/interface/index/Portfolio";
import Resume from "@/components/interface/index/Resume";
import { supabase_admin } from "@/lib/supabase";
import { read } from 'gray-matter';

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  created_at: string;
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {

  let seen = new Set();

  const unique = posts.filter((post: Post) => {
      seen.add(post.slug);
      return seen.has(post.slug);
  });

  return (
    <Layout>
      <Welcome />
      <Featured posts={unique.slice(0, 4)} />
      <Portfolio />
      <Resume />
      <Subscribe />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // MDX text - can be from a local file, database, anywhere
  const dir: Dirent[] = fs.readdirSync("./posts", { withFileTypes: true });
  const popular = await supabase_admin
    .from("posts").select()
    .order('views', { ascending: false })
    .limit(3);
  if (popular.error) return { notFound: true };

  const latest = await supabase_admin
    .from("posts").select()
    .order('created_at', { ascending: false })
    .limit(3);

  if(latest.error) return { notFound: true };

  const popular_posts = popular.data.map((post) => {
    const result = read(`./posts/${post.slug}.mdx`);
    return {
      slug: post.slug,
      frontmatter: result.data,
      content: result.content,
      created_at: post.created_at,
    };
  });

  const latest_posts = latest.data.map((post) => {
    const result = read(`./posts/${post.slug}.mdx`);
    return {
      slug: post.slug,
      frontmatter: result.data,
      content: result.content,
      created_at: post.created_at,
    };
  });

  return {
    props: {
      posts: [...popular_posts, ...latest_posts]
    }
  }

};

export default Home;
