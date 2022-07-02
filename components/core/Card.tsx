import { ReactNode, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "@/lib/firebase";
import { doc } from "firebase/firestore";

type CardProps = {
  index?: number;
  children?: ReactNode;
  image: string;
  href?: string;
  slug: string;
  minutes?: number;
  views?: number;
};

export default function Card({
  index,
  children,
  image,
  href = "",
  slug,
  minutes,
  views,
}: CardProps) {
  const [value, loading, error, snapshot] = useDocumentData(
    doc(firestore, "post", slug)
  );

  return (
    <Link href={href}>
      <a className="transition-all rounded grow">
        <div className="flex flex-col justify-between rounded cursor-pointer transition-all duration-300 w-full h-full">
          <div className="relative rounded aspect-video w-full">
            <Image
              src={image}
              alt="Featured Post Header"
              layout="fill"
              objectPosition="center"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="py-4 px-2">
            {children}
            <div className="flex flex-row justify-between">
              <p>{minutes ? minutes + " minutes" : ""}</p>
              {!loading && (
                <div className="flex flex-row items-center justify-center gap-2">
                  <FiEye />
                  <p>
                    {value ? value.views : Math.ceil(Math.random() * 10 + 10)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
