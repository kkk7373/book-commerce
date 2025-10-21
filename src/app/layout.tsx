import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });
export const metadata: Metadata = {
  title: "Book Commerce",
  description: "web app for who want to start selling their creation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
