import NextLink from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MobileMenu from "../core/MobileMenu";
import { motion } from "framer-motion";

type NavItemProps = {
  href: string;
  text: string;
};

function NavItem({ href, text }: NavItemProps) {
  return (
    <NextLink href={href}>
      <motion.a
        whileTap={{ scale: 0.9 }}
        className="text-gray-500 transition-all duration-300 px-4 py-1 rounded hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 nav-item hidden md:inline-block text-lg cursor-pointer font-bold"
        title={text}
      >
        {text}
      </motion.a>
    </NextLink>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="flex flex-row justify-between items-center max-w-3xl mx-auto w-full px-4 py-8">
      <nav className="relative flex flex-row gap-2">
        <MobileMenu />
        <NavItem href="/" text="Home" />
        <NavItem href="/posts" text="Posts" />
        <NavItem href="/dashboard" text="Dashboard" />
      </nav>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-700 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        )}
      </button>
    </header>
  );
}