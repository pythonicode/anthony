import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Figtree } from "next/font/google";

const font = Figtree({
  subsets: ["latin"],
  variable: "--font-sans"
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${font.variable} font-sans`}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default App;
