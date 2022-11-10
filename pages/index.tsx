import Featured from "@/components/interface/index/Featured";
import Subscribe from "@/components/interface/index/Subscribe";
import Welcome from "@/components/interface/index/Welcome";
import Layout from "@/components/layout/Layout";
import { Frontmatter } from "@/lib/types";
import { Dirent } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { read } from "to-vfile";
import { matter, VFile } from "vfile-matter";
import fs from "fs";
import { admin } from "@/lib/firebase-admin";
import Portfolio from "@/components/interface/index/Portfolio";
import Resume from "@/components/interface/index/Resume";

type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  created: number;
};

type Props = {
  posts: Array<Post>;
  mostViews: any;
};

const Home: NextPage<Props> = ({ posts, mostViews }) => {
  const sorted = posts.sort((post1, post2) => post2.created - post1.created);
  const topPost = posts.find((post) => post.slug == mostViews)!;
  const recentPost = topPost == sorted[0] ? sorted[1] : sorted[0];

  return (
    <Layout>
      <Welcome />
      <Featured posts={[topPost, recentPost]} />
      <Portfolio />
      <Resume />
      <Subscribe />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // MDX text - can be from a local file, database, anywhere
  const posts: Array<Post> = [];
  const dir: Dirent[] = fs.readdirSync("./posts", { withFileTypes: true });
  const mostViews = (
    await admin
      .firestore()
      .collection("post")
      .orderBy("views", "desc")
      .limit(1)
      .get()
  ).docs[0].id;
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
  return { props: { posts, mostViews } };
};

export default Home;
