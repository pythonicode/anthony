import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { firestore } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

type CardProps = {
  index?: number;
  children?: ReactNode;
  image: string;
  href?: string;
  slug: string;
  minutes?: number;
  views?: number;
  title: string;
  description: string;
};

export default function Card({
  image,
  href = "",
  slug,
  minutes,
  title,
  description,
}: CardProps) {
  const [data, loading, _] = useDocumentDataOnce(doc(firestore, "post", slug));

  return (
    <Link href={href} className="grow md:max-w-[50%]">
      <motion.div whileHover="hover" whileTap={{ scale: 0.95 }} className="flex flex-col justify-between rounded cursor-pointer transition-all duration-300 w-full h-full group">
        <motion.div
          variants={{ hover: { rotate: -2 } }}
          className="relative rounded aspect-video w-full"
        >
          <Image
            src={image}
            alt="Featured Post Header"
            fill
            className="rounded object-center object-cover"
          />
        </motion.div>
        <motion.h3
          variants={{ hover: { x: 10 } }}
          className="text-xl md:text-2xl font-bold my-4 text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-orange-400 dark:to-yellow-400 bg-gradient-to-b from-black to-black overflow-x-hidden"
        >
          {title}
        </motion.h3>
        <motion.p
          className="mb-2 text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white group-hover:text-black transition-colors"
        >
          {description}
        </motion.p>
        {minutes && data && !loading ? <div className="flex flex-row justify-between mb-4">
          <p>{minutes ? minutes + " minute read" : ""}</p>
          <motion.div variants={{ hover: { y: -5 } }} className="flex flex-row items-center justify-center gap-2">
            <FiEye />
            <p>{data.views}</p>
          </motion.div>
        </div> : <div className="flex flex-row justify-between h-4 mt-2 mb-4 bg-neutral-300 dark:bg-neutral-700 animate-pulse rounded" />
        }
      </motion.div>
    </Link>
  );
}
