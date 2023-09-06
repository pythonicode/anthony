"use client";

import Title from "@/components/typography/Title";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ItemProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
};

export function PortfolioItem({
  title,
  description,
  tags,
  image,
  link,
}: ItemProps) {
  return (
    <Link href={link}>
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95, rotate: -5 }}
        className="flex flex-col gap-4 grow cursor-pointer items-center justify-center relative mt-20"
      >
        <motion.div
          variants={{ hover: { y: -40 } }}
          className="absolute -top-20 -z-10"
        >
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            style={{ width: "200", height: "200" }}
            className="rounded-xl"
          />
        </motion.div>
        <div
          className="relative w-full flex flex-col border-2 border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700 p-4 z-10 bg-white dark:bg-dark gap-2 rounded transition-all duration-500"
        >
          <h3 className="font-bold text-3xl">{title}</h3>
          <div className="flex flex-row items-center gap-2">
            {tags.map((tag, i) =>
              i < tags.length - 1 ? (
                <div key={i}>{tag} &bull;</div>
              ) : (
                <div key={i}>{tag}</div>
              )
            )}
          </div>
          <p className="text-neutral-500">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Portfolio() {
  return (
    <>
      <Title color="gold" id="portfolio">
        Portfolio
      </Title>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative">
        <PortfolioItem
          title="Discharge"
          description="Free, secure, unlimited data storage powered by FileCoin."
          tags={["Fullstack", "Blockchain"]}
          image="/images/portfolio/discharge/logo_edited.png"
          link="/portfolio/discharge"
        />
        <PortfolioItem
          title="Essays with Ori"
          description="Website for premium essay editing services."
          tags={["Fullstack"]}
          image="/images/portfolio/essayswithori/logo.jpg"
          link="/portfolio/essayswithori"
        />
        {/* <PortfolioItem
          title="Nearsound"
          description="Decentralized music platform on NEAR Protocol."
          tags={["Fullstack", "Blockchain"]}
          image="/images/portfolio/nearsound/logo.png"
          link="/portfolio/nearsound"
        /> */}
      </div>
    </>
  );
}
