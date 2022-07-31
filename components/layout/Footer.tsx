import Link from "next/link";
import { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-3xl mx-auto w-full mb-8 p-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid gap-4 pb-16 grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/posts">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Posts
            </a>
          </Link>
          <Link href="/#portfolio">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Portfolio
            </a>
          </Link>

          <Link href="/dashboard">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Dashboard
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://www.youtube.com/channel/UCuSNyLAKa5keYy7zaMGS2TA">
            YouTube
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/anthony-riley/">
            LinkedIn
          </ExternalLink>
          <ExternalLink href="https://www.instagram.com/aj.riley/">
            Instagram
          </ExternalLink>
          <ExternalLink href="https://github.com/pythonicode">
            GitHub
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="mailto:anthonyriley@stanford.edu">
            Orienteering
          </ExternalLink>
          <ExternalLink href="mailto:anthonyriley@stanford.edu">
            Sponsorship
          </ExternalLink>
          <ExternalLink href="mailto:anthonyriley@stanford.edu">
            Advertisers
          </ExternalLink>
          <ExternalLink href="mailto:anthonyriley@stanford.edu">
            Contact
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
