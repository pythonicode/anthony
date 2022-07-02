import { ReactNode } from "react";

export default function Typography({
  variant,
  children,
}: {
  variant: "h1" | "h2" | "h3" | "h4" | "p";
  children: ReactNode;
}) {
  if (variant == "h1")
    return <h1 className="text-4xl md:text-5xl font-bold my-8">{children}</h1>;
  else if (variant == "h2")
    return <h2 className="text-2xl md:text-3xl font-bold my-8">{children}</h2>;
  else if (variant == "h3")
    return <h3 className="text-xl md:text-2xl font-bold my-4">{children}</h3>;
  else if (variant == "h4")
    return <h4 className="text-lg md:text-xl font-bold my-4">{children}</h4>;
  return <p className="mb-4 text-lg">{children}</p>;
}
