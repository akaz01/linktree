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
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
