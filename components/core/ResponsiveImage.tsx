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
  const gradients = [
    "bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400",
    "bg-gradient-to-l from-yellow-500 via-purple-500 to-blue-500",
    "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700",
  ];

  return (
    <a href={`/_next/image?url=${src}&w=3840&q=75`}>
      <div
        className={`relative w-[${width}] aspect-${
          square ? "square" : "video"
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
