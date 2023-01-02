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
import GoogleLogin from "@/components/core/auth/GoogleLogin";

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
  source: any;
  length: number;
};

const Post: NextPage<Props> = ({ slug, source, length }) => {

  const [date, setDate] = useState<string>("Unknown Date");
  const [views, setViews] = useState<number | undefined>();

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then(async (res) => {
        const { views } = await res.json();
        setViews(views);
      })
      .catch((err) => console.error(err));
    setDate(getDateFromString(source.frontmatter.date))
  }, []);

  return (
    <Layout title={`Anthony Riley | ${source.frontmatter.title}`}>
      <article className="relative">
        <ResponsiveImage src={source.frontmatter.image} alt="Welcome Image" priority />
        <h1 className="text-5xl font-bold mb-8">{source.frontmatter.title}</h1>
        <div className="flex flex-row justify-between mb-16 gap-4 items-center text-gray-500 flex-wrap">
          <div className="flex flex-row items-center gap-2">
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
              { views != undefined ? 
                 <p className="whitespace-nowrap">{views} views</p> :
                 <div className="h-4 w-20 rounded bg-neutral-500 animate-pulse"/>
              }
            </>
          </div>
          <p className="whitespace-nowrap">
            {`${calculateReadingLength(length)} minute read`}
          </p>
        </div>
        <MDXRemote {...source} components={components} />
        {/* <h1 className="text-5xl font-bold my-8">Discussion</h1>
        <div className="rounded border border-neutral-500 p-4">
          <GoogleLogin />
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
  const { error } = await supabase_admin
            .from('posts')
            .insert({ slug: slug });
  if (error && error.code != "23505") return { notFound: true };
  return {
    props: {
      slug: slug,
      source: serialized,
      length: source.length,
    }
  };
};

export default Post;
