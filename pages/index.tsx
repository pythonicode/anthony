import Featured from "@/components/interface/index/Featured";
import Subscribe from "@/components/interface/index/Subscribe";
import Welcome from "@/components/interface/index/Welcome";
import Layout from "@/components/layout/Layout";
import { Frontmatter } from "@/lib/types";
import type { GetStaticProps, NextPage } from "next";
import Portfolio from "@/components/interface/index/Portfolio";
import Resume from "@/components/interface/index/Resume";
import { admin } from "@/lib/supabase-admin";
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

  return (
    <Layout>
      <Welcome />
      <Featured posts={posts} />
      <Portfolio />
      <Resume />
      <Subscribe />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const popular = await admin
    .from("posts").select()
    .order('views', { ascending: false })
    .limit(1);
  if (popular.error) return { props: { posts: [] } }

  const latest = await admin
    .from("posts").select()
    .order('created_at', { ascending: false })
    .limit(1);

  if (latest.error) throw Error("Should not be reached");

  const popular_posts = popular.data.map((post) => {
    const result = read(`./public/posts/${post.slug}.mdx`);
    return {
      slug: post.slug,
      frontmatter: result.data,
      content: result.content,
      created_at: post.created_at,
    };
  });

  const latest_posts = latest.data.map((post) => {
    const result = read(`./public/posts/${post.slug}.mdx`);
    return {
      slug: post.slug,
      frontmatter: result.data,
      content: result.content,
      created_at: post.created_at,
    };
  });

  const latest_post = latest_posts[0];
  const popular_post = popular_posts.find((post) => post.slug != latest_post.slug)!;

  return {
    props: {
      posts: [popular_post, latest_post]
    }
  }

};

export default Home;
