import "./globals.css";
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

const font = Jost({
  subsets: ['latin'],
  variable: '--font-sans',
});


export const metadata: Metadata = {
  title: 'Anthony Riley | Home',
  description: 'Personal website of Anthony Riley.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}
