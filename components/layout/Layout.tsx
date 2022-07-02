import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "next-themes";
import { Fade } from "react-awesome-reveal";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  published?: string;
};

export default function Layout({
  children,
  title,
  description,
  published,
}: LayoutProps) {
  const router = useRouter();

  const metadata = {
    title: title
      ? title
      : "Anthony Riley | athlete, programmer and entrepreneur.",
    description: description ? description : "This page has no description.",
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="robots" content="follow, index" />
        <meta
          content={description ? description : "This page has no description."}
          name="description"
        />
        <meta property="og:url" content={`https://leerob.io${router.asPath}`} />
        <link rel="canonical" href={`https://leerob.io${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Anthony Riley" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:image" content="/images/anthony.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/images/anthony.jpg" />
        {published && (
          <meta property="article:published_time" content={published} />
        )}
      </Head>
      <Header />
      <Fade triggerOnce>
        <main id="skip" className="max-w-3xl mx-auto w-full my-8 p-8">
          {children}
        </main>
      </Fade>
      <Footer />
    </>
  );
}
