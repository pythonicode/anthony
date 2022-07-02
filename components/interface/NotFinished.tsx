import { MdConstruction } from "react-icons/md";

export default function NotFinished() {
  return (
    <div className="flex flex-col items-center text-center justify-center w-full aspect-square">
      <MdConstruction size="30%" />
      <h1 className="text-5xl my-8 font-bold">Oh no</h1>
      <p>
        This section of the website is not finished yet. <br /> Please try again
        later.
      </p>
    </div>
  );
}
