import { ReactNode } from "react";

export default function Typography({
  variant,
  children,
  gradient,
  color,
}: {
  variant: "h1" | "h2" | "h3" | "h4" | "p";
  children: ReactNode;
  gradient?: boolean;
  color?: "gold" | "orange";
}) {
  const gradients = {
    gold: "text-transparent bg-clip-text dark:bg-gradient-to-b dark:from-orange-500 dark:to-yellow-300 bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r",
    orange:
      "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400",
  };
  if (variant == "h1")
    return (
      <h1
        className={`text-4xl md:text-5xl font-bold mb-8 ${
          gradients[color || "gold"]
        }`}
      >
        {children}
      </h1>
    );
  else if (variant == "h2")
    return (
      <h2
        className={`text-2xl md:text-3xl font-bold mb-8 ${
          gradients[color || "gold"]
        }`}
      >
        {children}
      </h2>
    );
  else if (variant == "h3")
    return (
      <h3
        className={`text-xl md:text-2xl font-bold mb-4 ${
          gradients[color || "gold"]
        }`}
      >
        {children}
      </h3>
    );
  else if (variant == "h4")
    return (
      <h4
        className={`text-lg md:text-xl font-bold mb-4 ${
          gradients[color || "gold"]
        }`}
      >
        {children}
      </h4>
    );
  return <p className="mb-4 text-lg">{children}</p>;
}
