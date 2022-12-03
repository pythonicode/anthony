import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: string;
  square?: boolean;
  priority?: boolean;
};

export default function ResponsiveImage({
  src,
  alt,
  width = "100%",
  square = false,
  priority = false,
}: Props) {

  return <a title={alt} href={`/_next/image?url=${src}&w=3840&q=75`} >
    <div
      className={`relative w-[${width}] aspect-${square ? "square" : "video"
        } bg-gray-500 rounded my-8`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded object-center object-cover"
        priority={priority}
      />
    </div>
  </a>
}
