import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const borderAnimation = {
  rest: {
    rotate: -135,
  },
  hover: {
    rotate: -45,
  },
};

const imageAnimation = {
  rest: {
    rotate: 0,
  },
  hover: {
    rotate: -5,
  },
};

export default function Welcome() {
  const now = new Date();

  const calculateAge = () => {
    let age = now.getUTCFullYear() - 2001;
    if (now.getMonth() < 1) age -= 1;
    else if (now.getUTCMonth() == 1 && now.getUTCDate() < 5) age -= 1;
    return age;
  };

  const [age, setAge] = useState(0);

  useEffect(() => {
    setAge(calculateAge());
  }, []);

  return (
    <div className="flex flex-col-reverse justify-between items-center md:flex-row">
      <div className="grow">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
          Anthony Riley
        </h1>
        <div className="flex flex-row gap-2 my-4 justify-center md:justify-start">
          <h3>{age}</h3>
          <h3>&bull;</h3>
          <h3>Athlete </h3>
          <h3>&bull;</h3>
          <h3>Programmer</h3>
          <h3>&bull;</h3>
          <h3>Entrepreneur</h3>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 text-center md:text-left">
          Welcome to my website! Here you can find all information related to my
          work including blog posts, code snippets and other content.
        </p>
      </div>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative w-4/5 p-1 m-2 cursor-pointer"
      >
        <motion.div
          variants={borderAnimation}
          className="absolute z-10 top-0 left-0 bottom-0 right-0 border-8 border-transparent border-b-dark dark:border-b-white border-t-dark dark:border-t-white rounded-full w-full h-full rotate-[145deg]"
        ></motion.div>
        <motion.div variants={imageAnimation} className="relative w-full">
          <Image
            src="/images/anthony.jpg"
            alt="An action shot of Anthony orienteering."
            layout="responsive"
            height={300}
            width={300}
            className="rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
