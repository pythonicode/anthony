import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Layout from "@/components/layout/Layout";
import { serialize } from "next-mdx-remote/serialize";
import ResponsiveImage from "@/components/core/ResponsiveImage";
import { MDXRemote } from "next-mdx-remote";
import Typography from "@/components/typography/Typography";
import fs, { Dirent } from "fs";
import { getDate } from "@/lib/date";
import List from "@/components/typography/List";
import Link from "next/link";
import { admin } from "@/lib/firebase-admin";
import { calculateReadingLength } from "@/lib/core";
import { useEffect, useState } from "react";

const components = {
  Link,
  ResponsiveImage,
  img: (props: any) => <ResponsiveImage {...props} />,
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  p: (props: any) => <Typography variant="p" {...props} />,
  a: (props: any) => <a className="text-blue-500" {...props} />,
  ol: (props: any) => <List variant="ordered" {...props} />,
  ul: (props: any) => <List variant="unordered" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-l-gray-500 pl-4 text-gray-500 rounded"
      {...props}
    />
  ),
};

type Props = {
  slug: string;
  source: any;
  created: number;
  length: number;
};

const Post: NextPage<Props> = ({ slug, source, created, length }) => {
  const [views, setViews] = useState<number | undefined>();

  const getViews = async (): Promise<number> => {
    const response = await fetch(`/api/views/${slug}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const { views } = await response.json();
    return views;
  };

  useEffect(() => {
    getViews().then((views) => setViews(views));
  }, []);

  return (
    <Layout>
      <article>
        <ResponsiveImage src={source.frontmatter.image} alt="Welcome Image" />
        <h1 className="text-5xl font-bold mb-8">{source.frontmatter.title}</h1>
        <div className="flex flex-row justify-between mb-16 items-center text-gray-500 overflow-x-hidden">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap">{getDate(created)}</p>
            {source.frontmatter.tags && (
              <>
                <p>&bull;</p>
                <p>{source.frontmatter.tags[0]}</p>
              </>
            )}
            <>
              <p>&bull;</p>
              <p>{views} views</p>
            </>
          </div>
          <p>{`${calculateReadingLength(length)} minute read`}</p>
        </div>
        <MDXRemote {...source} components={components} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Dirent[] = fs
    .readdirSync("./posts", { withFileTypes: true })
    .filter((path) => !path.isDirectory());
  return {
    paths: paths.map((path) => ({
      params: { slug: path.name.slice(0, path.name.lastIndexOf(".")) },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const source = fs.readFileSync(`./posts/${params?.slug}.mdx`, "utf8");
  const serialized = await serialize(source, { parseFrontmatter: true });
  const created = fs.statSync(`./posts/${params?.slug}.mdx`).birthtime;
  return {
    props: {
      slug: params?.slug,
      source: serialized,
      created: created.getTime(),
      length: source.length,
    },
  };
};

export default Post;
