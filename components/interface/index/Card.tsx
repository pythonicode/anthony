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
  const [data, loading, error] = useDocumentDataOnce(doc(firestore, "post", slug));


  useEffect(() => {
    console.log(data, loading, error);
  }, [data, loading, error]);

  return (
    <Link href={href} className="grow">
      <motion.div whileHover="hover" whileTap={{ scale: 0.95 }} className="relative flex flex-col justify-start rounded cursor-pointer transition-all duration-300 w-full h-full group">
        <motion.div
          variants={{ hover: { rotate: -2 } }}
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
              {description}
            </motion.p>
            <div className="flex flex-row justify-between mb-4">
              {minutes ? <div>{minutes ? minutes + " minute read" : ""}</div> : <div className="w-20 h-full bg-neutral-300 dark:bg-neutral-700 animate-pulse rounded" />}
              {!loading ?
                <div className="flex flex-row items-center justify-center gap-2">
                  <FiEye />
                  <p>{error || !data ? "No Views" : data.views}</p>
                </div>
                : <div className="w-20 h-full bg-neutral-300 dark:bg-neutral-700 animate-pulse rounded" />
              }
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
