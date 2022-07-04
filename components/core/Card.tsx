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

type CardProps = {
  index?: number;
  children?: ReactNode;
  image: string;
  href?: string;
  slug: string;
  minutes?: number;
  views?: number;
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

export default function Card({
  children,
  image,
  href = "",
  slug,
  minutes,
}: CardProps) {
  const [data, loading] = useDocumentDataOnce(doc(firestore, "post", slug));

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
              <p>{minutes ? minutes + " minute read" : ""}</p>
              {!loading && (
                <div className="flex flex-row items-center justify-center gap-2">
                  <FiEye />
                  <p>{data ? data.views : "No Views"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
