import Image from "next/image";
import { FaGithub, FaLink, FaTrophy, FaYoutube } from "react-icons/fa";

export default function Featured() {
  return (
    <div className="flex flex-col justify-between rounded-xl transition-all duration-300 w-full h-full border dark:border-gray-700">
      <div className="relative rounded aspect-video w-full">
        <Image
          src="/images/portfolio/discharge.jpg"
          alt="Portfolio Featured Item"
          layout="fill"
          objectPosition="center"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <a
          href="https://chain.link/hackathon"
          target="_blank"
          rel="noopener noreferer"
          className="flex flex-row gap-2 w-full items-center justify-center bg-yellow-300 dark:bg-opacity-50 rounded p-2"
        >
          <FaTrophy />
          <h3 className="uppercase font-bold text-center text-sm md:text-base">
            Chainlink Hackathon Winner
          </h3>
        </a>
        <div className="flex flex-row gap-2 mt-4 items-center text-xl">
          <h2 className="font-semibold">Discharge</h2>
          <p>&bull;</p>
          <p>Fullstack</p>
          <p>&bull;</p>
          <p>Blockchain</p>
        </div>
        <h4 className="text-gray-500">
          Free, secure, unlimited data storage powered by FileCoin.
        </h4>
        <div className="flex flex-col md:flex-row flex-wrap my-2 gap-4">
          <a
            href="https://devpost.com/software/discharge"
            target="_blank"
            rel="noopener noreferer"
            className="flex justify-center items-center gap-2 text-lg p-2 rounded cursor-pointer"
          >
            <FaLink /> Website
          </a>
          <a
            href="https://github.com/pythonicode/discharge"
            target="_blank"
            rel="noopener noreferer"
            className="flex justify-center items-center gap-2 text-lg p-2 rounded cursor-pointer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.youtube.com/watch?v=eDOFad7iedQ"
            target="_blank"
            rel="noopener noreferer"
            className="flex justify-center items-center gap-2 text-lg p-2 rounded cursor-pointer"
          >
            <FaYoutube /> YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
