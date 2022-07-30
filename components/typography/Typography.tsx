import { ReactNode } from "react";

export default function Typography({
  variant,
  children,
  gradient = true,
}: {
  variant: "h1" | "h2" | "h3" | "h4" | "p";
  children: ReactNode;
  gradient?: boolean;
}) {
  const gradients = gradient
    ? "text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-orange-400 dark:to-yellow-300 bg-gradient-to-b from-blue-700 to-blue-400 pb-2"
    : "pb-2";

  if (variant == "h1")
    return (
      <h1 className={`text-4xl md:text-5xl font-bold mb-8 ${gradients}`}>
        {children}
      </h1>
    );
  else if (variant == "h2")
    return (
      <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${gradients}`}>
        {children}
      </h2>
    );
  else if (variant == "h3")
    return (
      <h3 className={`text-xl md:text-2xl font-bold mb-4 ${gradients}`}>
        {children}
      </h3>
    );
  else if (variant == "h4")
    return (
      <h4 className={`text-lg md:text-xl font-bold mb-4 ${gradients}`}>
        {children}
      </h4>
    );
  return <p className="mb-4 text-lg">{children}</p>;
}
