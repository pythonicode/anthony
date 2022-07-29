import NotFinished from "@/components/interface/NotFinished";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import type { NextPage } from "next";

const Discharge: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.img
          animate={{
            scale: [1, 0.5, 0.5, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            transition: {
              duration: 2,
            },
          }}
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src="/images/portfolio/discharge/chainlink.svg"
          alt="Chainlink"
          className="w-full md:w-1/2"
        />
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-8">Discharge</h1>
          <a
            href="https://chain.link/hackathon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code className="font-bold text-5xl hover:text-blue-500 transition-colors duration-300">
              chainlink 2022 spring hackathon winner!
            </code>
          </a>
          <code className="text-xl mt-8">$7,500 Filecoin - On the Tools</code>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="bg-black dark:bg-white w-2 h-20" />
        <h2 className="w-full text-3xl font-bold my-20">
          Free, secure, unlimited data storage powered by FileCoin.
        </h2>
      </div>
    </Layout>
  );
};

export default Discharge;
