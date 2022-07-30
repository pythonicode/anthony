import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github, monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCheck, FaCopy, FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {
  title?: string;
  children: string | string[];
  language?: string;
  link?: string;
};

export default function CodeBlock({ title, children, language, link }: Props) {
  const { theme } = useTheme();
  const [color, setColor] = useState("light");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (theme) setColor(theme);
  }, [theme]);

  const onCopy = () => {
    if (copied) return;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      {title && (
        <h3 className="font-mono font-bold text-xl my-8">&gt; {title}</h3>
      )}
      <div className="rounded bg-[#F8F8F8] dark:bg-[#272822]">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row gap-2">
            <div className="rounded-full p-2 bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="rounded-full p-2 bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="rounded-full p-2 bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          <div className="flex flex-row gap-8">
            {link && (
              <motion.a
                whileHover={{ rotate: 2 }}
                href={link}
                className="text-blue-500 font-mono font-bold"
              >
                open in github
              </motion.a>
            )}
            <CopyToClipboard text={children as string} onCopy={onCopy}>
              <motion.button
                whileHover={{ rotate: -2, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                title="Copy"
              >
                {copied ? <FaCheck size="24px" /> : <FaRegCopy size="24px" />}
              </motion.button>
            </CopyToClipboard>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          showLineNumbers
          style={color == "dark" ? monokai : github}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
