"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * next-themes는 클라이언트 전용이라 Server Component인 layout에서 직접 쓸 수 없다.
 * 이 얇은 래퍼 하나만 클라이언트 경계로 두고, 나머지 트리는 서버에서 렌더한다.
 */
export function ThemeProvider({ children }: Props) {
  return (
    // 사이버 방향은 어두운 화면이 기본 인상이다. 시스템 설정은 그대로 따르되,
    // 설정을 알 수 없을 때는 밝은 화면이 아니라 어두운 화면으로 시작한다.
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
