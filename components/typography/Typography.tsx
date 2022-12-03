import { ReactNode } from "react";

export default function Typography({
  variant,
  children,
  color = "gold",
}: {
  variant: "h1" | "h2" | "h3" | "h4" | "p";
  children: ReactNode;
  color?: "gold" | "blue" | "purple";
}) {
  const gradients = {
    gold: "bg-gradient-to-b from-orange-400 to-yellow-500",
    blue: "bg-gradient-to-b from-blue-500 to-blue-400",
    purple: "bg-gradient-to-b from-purple-600 to-purple-500",
  };

  if (variant == "h1")
    return (
      <div className="flex flex-row items-center my-8">
        <div className={`${gradients[color]} w-3 h-12 mr-4`} />
        <h1 className="text-4xl md:text-5xl font-bold">
          {children}
        </h1>
      </div>

    );
  else if (variant == "h2")
    return (
      <div className="flex flex-row items-center my-4">
        <div className={`${gradients[color]} w-2 h-10 mr-4`} />
        <h2 className="text-2xl md:text-3xl font-bold">
          {children}
        </h2>
      </div>
    );
  else if (variant == "h3")
    return (
      <div className="flex flex-row items-center my-4">
        <div className={`${gradients[color]} w-2 h-8 mr-2`} />
        <h3 className="text-xl md:text-2xl font-bold">
          {children}
        </h3>
      </div>
    );
  else if (variant == "h4")
    return (
      <div className="flex flex-row items-center my-16">
        <div className={`${gradients[color]} w-2 h-8 mr-2`} />
        <h4 className="text-lg md:text-xl font-bold">
          {children}
        </h4>
      </div>
    );
  return <p className="mb-4 text-lg">{children}</p>;
}
