import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { firestore } from "@/lib/firebase";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDocFromServer,
} from "firebase/firestore";
import { motion } from "framer-motion";

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

const useDocumentDataOnce = (
  ref: DocumentReference<DocumentData>
): [DocumentData | undefined, boolean] => {
  const [data, setData] = useState<DocumentData | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const doc = await getDocFromServer(ref);
    setData(doc.data());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return [data, loading];
};

const imageMotion = {
  rest: {
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    rotate: -5,
    y: 32,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const textMotion = {
  rest: {
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    rotate: -95,
    x: -210,
    y: -100,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const textMotion2 = {
  rest: {
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    rotate: 85,
    x: 220,
    y: -80,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const paragraphMotion = {
  rest: {
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export default function Card({
  children,
  index,
  image,
  href = "",
  slug,
  minutes,
  title,
  description,
}: CardProps) {
  const [data, loading] = useDocumentDataOnce(doc(firestore, "post", slug));

  return (
    <Link href={href}>
      <motion.a
        className="grow md:max-w-[50%]"
        initial="rest"
        whileHover="hover"
        animate="rest"
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col justify-between rounded cursor-pointer transition-all duration-300 w-full h-full group">
          <motion.div
            variants={imageMotion}
            className="relative rounded aspect-video w-full"
          >
            <Image
              src={image}
              alt="Featured Post Header"
              layout="fill"
              objectPosition="center"
              objectFit="cover"
              className="rounded"
            />
          </motion.div>
          <motion.h3
            variants={index == 0 ? textMotion : textMotion2}
            className="text-xl md:text-2xl font-bold my-4 text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-orange-500 dark:to-yellow-500 bg-gradient-to-b from-black to-black whitespace-nowrap overflow-x-hidden"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={paragraphMotion}
            className="my-2 text-gray-500 dark:group-hover:text-white group-hover:text-black transition-colors"
          >
            {description}
          </motion.p>
          <div className="flex flex-row justify-between mb-4">
            <p>{minutes ? minutes + " minute read" : ""}</p>
            {!loading && (
              <div className="flex flex-row items-center justify-center gap-2">
                <FiEye />
                <p>{data ? data.views : "No Views"}</p>
              </div>
            )}
          </div>
        </div>
      </motion.a>
    </Link>
  );
}
