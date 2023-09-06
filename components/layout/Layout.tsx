"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
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
      : "Anthony Riley | Welcome",
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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Anthony Riley" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:image" content="/images/anthony.jpg" />
        {published && (
          <meta property="article:published_time" content={published} />
        )}
      </Head>
      <Header />
      <Fade triggerOnce>
        <main id="skip" className="relative max-w-3xl mx-auto w-full my-8 p-8">
          <div className="absolute top-20 -left-80">
            {/* <Canvas
              shadows={true}
              camera={{
                position: [-6, 7, 7],
              }}
            >
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.25} />
              <directionalLight intensity={1} position={[10, 10, 10]} />
              <mesh rotation={[90, 0, 20]}>
                <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
                <meshLambertMaterial attach="material" color="gray" />
              </mesh>
            </Canvas> */}
          </div>
          {children}
        </main>
      </Fade>
      <Footer />
    </>
  );
}
