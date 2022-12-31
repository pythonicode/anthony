import type {
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
import { getDateFromString } from "@/lib/date";
import List from "@/components/typography/List";
import Link from "next/link";
import { calculateReadingLength } from "@/lib/core";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/interface/blog/ProgressBar";
import { supabase_admin } from "@/lib/supabase";
import Title from "@/components/typography/Title";

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
  hr: (props: any) => <hr className="my-8" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-l-gray-500 pl-4 text-gray-500 rounded"
      {...props}
    />
  ),
};

type Props = {
  slug: string;
  views: number;
  source: any;
  length: number;
};

const Post: NextPage<Props> = ({ slug, views, source, length }) => {

  const [date, setDate] = useState<string>("Unknown Date");

  useEffect(() => {
    setDate(getDateFromString(source.frontmatter.date));
  }, []);

  return (
    <Layout title={`Anthony Riley | ${source.frontmatter.title}`}>
      <article className="relative">
        <ResponsiveImage src={source.frontmatter.image} alt="Welcome Image" priority />
        <h1 className="text-5xl font-bold mb-8">{source.frontmatter.title}</h1>
        <div className="flex flex-row justify-between mb-16 gap-4 items-center text-gray-500 flex-wrap">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap">
              {date}
            </p>
            {source.frontmatter.tags && (
              <>
                <p>&bull;</p>
                <p className="whitespace-nowrap">
                  {source.frontmatter.tags[0]}
                </p>
              </>
            )}
            <>
              <p>&bull;</p>
              <p className="whitespace-nowrap">{views} views</p>
            </>
          </div>
          <p className="whitespace-nowrap">
            {`${calculateReadingLength(length)} minute read`}
          </p>
        </div>
        <MDXRemote {...source} components={components} />
        {/* <h1 className="text-5xl font-bold my-8">Discussion</h1>
        <div className="rounded border border-neutral-500 p-4">
          
        </div> */}
        <ProgressBar />
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
  const slug = params ? params.slug : "";
  const source = fs.readFileSync(`./posts/${slug}.mdx`, "utf8");
  const serialized = await serialize(source, { parseFrontmatter: true });
  const response = await supabase_admin
    .from('posts')
    .select()
    .eq('slug', slug);
  if (response.error) return { notFound: true };
  if (response.data.length == 0) {
    const { error } = await supabase_admin
      .from('posts')
      .insert({ slug: slug });
    if (error) return { notFound: true };
  }
  const views = response.data && (response.data.length == 0 ? 0 : response.data[0].views);
  if (process.env.NODE_ENV === 'production') {
    if (response.data[0].published == false) return { notFound: true };
    const { error } = await supabase_admin
      .from('posts')
      .update({ views: views + 1 })
      .eq('slug', slug);
    if (error) return { notFound: true };
  }
  return {
    props: {
      slug: slug,
      views: views,
      source: serialized,
      length: source.length,
    },
    revalidate: 60
  };
};

export default Post;
