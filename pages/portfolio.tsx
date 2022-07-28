import Image from "next/image";
import Featured from "@/components/interface/portfolio/Featured";
import Layout from "@/components/layout/Layout";
import type { NextPage } from "next";
import { FC, ReactNode } from "react";
import { FaGithub, FaLink, FaYoutube } from "react-icons/fa";
import NotFinished from "@/components/interface/NotFinished";

type PortfolioItemProps = {
  image: string;
  title: string;
  description: string;
  link?: string;
  youtube?: string;
  github?: string;
  tag?: string;
};

const PortfolioItem: FC<PortfolioItemProps> = ({
  image,
  title,
  description,
  link,
  youtube,
  github,
  tag,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-xl transition-all duration-300 w-full h-full border dark:border-gray-700">
      <div className="relative rounded aspect-video w-full">
        <Image
          src={image}
          alt="Portfolio Item"
          layout="fill"
          objectPosition="center"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-row gap-2 mt-4 items-center text-xl">
          <h2 className="font-semibold">{title}</h2>
          {tag && (
            <>
              <p>&bull;</p>
              <p>{tag}</p>
            </>
          )}
        </div>
        <h4 className="text-gray-500">{description}</h4>
        <div className="flex flex-col md:flex-row my-2 gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              className="flex justify-center items-center gap-2 p-2 rounded cursor-pointer"
            >
              <FaLink /> Website
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener"
              className="flex justify-center items-center gap-2 p-2 rounded cursor-pointer"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noopener"
              className="flex justify-center items-center gap-2 p-2 rounded cursor-pointer"
            >
              <FaYoutube /> YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold my-8">Projects</h1>
      <Featured />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mt-8">
        <PortfolioItem
          image="/images/portfolio/essayswithori.jpg"
          title="Essays with Ori"
          description="Website for premium essay editing services."
          link="https://www.essayswithori.com/"
          github="https://github.com/pythonicode/essays-with-ori"
          tag="Fullstack"
        />
        <PortfolioItem
          image="/images/portfolio/nearsound.jpg"
          title="Nearsound"
          description="Decentralized music platform on NEAR."
          link="https://testnet.drykk14fnsz4v.amplifyapp.com"
          github="https://github.com/pythonicode/nearsound"
          youtube="https://www.youtube.com/watch?v=IQjTl6MdCps"
          tag="Blockchain"
        />
      </div>
      <h1 className="text-5xl font-bold my-8">Code Snippets</h1>
      <NotFinished />
    </Layout>
  );
};

export default Portfolio;
