import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";
import "./globals.css";

/*
 * IBM Plex Sans KR — 한 가족만 쓴다.
 * 본문이 대부분 한글이라 라틴 전용 디스플레이 폰트를 얹으면 한글만 대체 글꼴로
 * 빠져 인상이 무너진다. Plex는 한글을 직접 지원하면서 각진 기하학적 골격이
 * 사이버 방향과 맞고, 기본값처럼 쓰이는 Noto Sans KR과도 구분된다.
 * 굵기는 3단계만 받고, 위계는 크기와 자간으로 만든다.
 */
const plexKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  variable: "--font-plex-kr",
  display: "swap",
  // subsets를 지정하면 그 범위의 글리프만 받는데, next/font에 들어 있는 구글
  // 폰트 목록에는 korean 서브셋이 빠져 있어 한글이 통째로 대체 글꼴로 빠진다.
  // preload를 끄면 서브셋 없이 전체 스타일시트를 받아 self-host하고,
  // 브라우저가 unicode-range를 보고 필요한 한글 조각만 내려받는다.
  preload: false,
});

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
    <html lang="ko" className={plexKr.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
