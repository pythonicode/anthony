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
      <motion.a
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95, rotate: -5 }}
        className="flex flex-col gap-4 grow cursor-pointer items-center justify-center relative mt-40"
      >
        <motion.div
          variants={{ hover: { y: -100 } }}
          className="absolute -top-20 -z-10"
        >
          <Image
            src={image}
            alt={title}
            width="200px"
            height="200px"
            className="rounded-xl"
            objectFit="cover"
            objectPosition="center"
          />
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          className="relative flex flex-col border p-4 z-10 bg-white dark:bg-dark gap-2 rounded"
        >
          <h3 className="font-bold text-3xl">{title}</h3>
          <div className="flex flex-row items-center gap-2">
            {tags.map((tag, i) =>
              i < tags.length - 1 ? <div>{tag} &bull;</div> : <div>{tag}</div>
            )}
          </div>
          <p className="text-gray-500">{description}</p>
        </motion.div>
      </motion.a>
    </Link>
  );
}

export default function Portfolio() {
  return (
    <>
      <Title color="gold">Portfolio</Title>
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
