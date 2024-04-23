import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  style: ["italic", "normal"],
  subsets: ["latin"],
  weight: ["100", "400"],
});

export const metadata: Metadata = {
  title: "Terminal",
  description: "Terminal simulation in nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} bg-black text-white`}>{children}</body>
    </html>
  );
}
