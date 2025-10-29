import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextAuthProvider } from "./lib/provider";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
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
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
