import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "绘本生成智能体",
  description: "使用 Seedream 4.5 生成连环绘本",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
