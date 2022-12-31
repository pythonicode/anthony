import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type CardProps = {
  index?: number;
  children?: ReactNode;
  image: string;
  href?: string;
  slug: string;
  minutes?: number;
  title: string;
  description: string;
  tags?: string[];
};

export default function Card({
  image,
  href = "",
  slug,
  minutes,
  title,
  description,
  tags
}: CardProps) {
  return (
    <Link href={href} className="grow">
      <motion.div whileHover="hover" whileTap={{ scale: 0.95 }} className="relative flex flex-col justify-start rounded cursor-pointer transition-all duration-300 w-full h-full group">
        <motion.div
          variants={{ hover: { y: -2 } }}
          className="relative rounded aspect-video w-full"
        >
          <Image
            src={image}
            alt="Featured Post Header"
            fill
            className="rounded object-center object-cover aspect-video"
          />
        </motion.div>
        <div className="flex flex-col justify-between grow">
          <h3
            className="text-xl md:text-2xl font-bold my-4 text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-orange-400 dark:to-yellow-400 bg-gradient-to-b from-black to-black overflow-hidden"
          >
            {title}
          </h3>
          <div className="relative flex flex-col justify-end">
            <motion.p
              className="mb-2 text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white group-hover:text-black transition-colors"
            >
              {(description.match(/[A-Za-z0-9 _.,!"?']*/g) || []).join(" ")}
            </motion.p>
            <div className="flex flex-row gap-4 justify-between mb-4">
              {tags ? <div>&rarr; {tags[0]}</div> : <div>&rarr; Uncategorized</div>}
              {minutes ? <div>{minutes} minute read</div> : null}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
