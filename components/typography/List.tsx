import { ReactNode } from "react";

export default function List({
  variant,
  children,
}: {
  variant: "ordered" | "unordered";
  children: ReactNode;
}) {
  if (variant == "ordered") {
    return <ol className="list-decimal ml-8 text-lg mb-4">{children}</ol>;
  }
  return <ul className="list-disc ml-8 text-lg mb-4">{children}</ul>;
}
