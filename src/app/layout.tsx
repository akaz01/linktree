import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes가 마운트 전 html에 class를 주입하므로 경고를 억제한다.
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
