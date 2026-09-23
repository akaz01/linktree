"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** 해 아이콘. currentColor를 쓰므로 버튼의 글자색을 그대로 따라간다. */
function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/** 달 아이콘. */
function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // 서버는 사용자의 테마를 알 수 없다. 마운트 전까지 아이콘을 비워 hydration
  // 불일치를 피하고, 버튼 자리는 미리 차지해 레이아웃이 밀리지 않게 한다.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // 마운트 전에는 서버와 같은 중립 라벨을 쓴다. 테마에 따라 달라지는 값을
  // 첫 렌더에 넣으면 서버 출력과 어긋나 hydration 경고가 난다.
  const label = !isMounted
    ? "화면 테마 전환"
    : isDark
      ? "밝은 화면으로 전환"
      : "어두운 화면으로 전환";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-card transition-colors duration-200 hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
    >
      {isMounted ? isDark ? <SunIcon /> : <MoonIcon /> : null}
    </button>
  );
}
