import { ReactNode } from "react";

export default function Title({
  children,
  color = "gold",
}: {
  children: string | ReactNode;
  color?: "gold" | "blue" | "purple";
}) {
  const gradients = {
    gold: "bg-gradient-to-b from-orange-400 to-yellow-500",
    blue: "bg-gradient-to-b from-blue-500 to-blue-400",
    purple: "bg-gradient-to-b from-purple-600 to-purple-500",
  };
  return (
    <div className="flex flex-row items-center my-16">
      <div className={`${gradients[color]} w-2 h-10 mr-4`} />
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
        {children}
      </h2>
    </div>
  );
}
