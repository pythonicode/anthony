import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: string;
  square?: boolean;
};

export default function ResponsiveImage({
  src,
  alt,
  width = "100%",
  square = false,
}: Props) {

  return (
    <a href={`/_next/image?url=${src}&w=3840&q=75`}>
      <div
        className={`relative w-[${width}] aspect-${square ? "square" : "video"
          } bg-gray-500 rounded my-8`}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            className="rounded"
          />
        )}
      </div>
    </a>
  );
}
