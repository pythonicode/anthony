import Image from "next/image";
import { Fade } from "react-awesome-reveal";

export default function Welcome() {
  const now = new Date();

  const calculateAge = () => {
    let age = now.getUTCFullYear() - 2001;
    if (now.getMonth() < 1) age -= 1;
    else if (now.getUTCMonth() == 1 && now.getUTCDate() < 5) age -= 1;
    return age;
  };

  return (
    <div className="flex flex-col-reverse justify-between items-center md:flex-row">
      <div className="grow">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
          Anthony Riley
        </h1>
        <div className="flex flex-row gap-2 my-4 justify-center md:justify-start">
          <h3>{calculateAge()}</h3>
          <h3>&bull;</h3>
          <h3>Athlete </h3>
          <h3>&bull;</h3>
          <h3>Programmer</h3>
          <h3>&bull;</h3>
          <h3>Entrepreneur</h3>
        </div>
        <p className="text-gray-500 text-center md:text-left">
          Welcome to my website! Here you can find all information related to my
          work including blog posts, code snippets and other content.
        </p>
      </div>
      <div className="relative w-4/5 p-2 m-2">
        <div className="absolute z-10 top-0 left-0 bottom-0 right-0 border-8 border-transparent border-b-gray-700 dark:border-b-gray-200 border-t-gray-700 dark:border-t-gray-200 rounded-full w-full h-full rotate-[145deg]"></div>
        <Image
          src="/images/anthony.jpg"
          alt="An action shot of Anthony orienteering."
          layout="responsive"
          height="300px"
          width="300px"
          className="rounded-full absolute z-0"
        />
      </div>
    </div>
  );
}
