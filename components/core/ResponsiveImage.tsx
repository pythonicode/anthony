import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: string;
};

export default function ResponsiveImage({ src, alt, width = "100%" }: Props) {
  const gradients = [
    "bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400",
    "bg-gradient-to-l from-yellow-500 via-purple-500 to-blue-500",
    "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700",
  ];

  return (
    <div
      className={`relative w-[${width}] ratio aspect-video bg-gray-500 rounded my-8`}
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
  );
}
