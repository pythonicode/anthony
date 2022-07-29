import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-0 right-0 left-0 h-4 bg-black dark:bg-white origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
