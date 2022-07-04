import NotFinished from "@/components/interface/NotFinished";
import Layout from "@/components/layout/Layout";
import type { NextPage } from "next";
import { FC, ReactNode } from "react";

type PortfolioItemProps = {
  image: string;
  title: string;
  description: string;
  link?: string;
  youtube?: string;
  github?: string;
};

const PortfolioItem: FC<PortfolioItemProps> = () => {
  return <div></div>;
};

const Portfolio: NextPage = () => {
  return (
    <Layout>
      <NotFinished />
    </Layout>
  );
};

export default Portfolio;
