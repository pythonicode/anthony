import { useEffect, useState } from "react";

export function calculateReadingLength(content: string | number) {
  if (typeof content === "string") return Math.ceil(content.length / 1000);
  else return Math.ceil(content / 1000);
}

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobile(isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}


