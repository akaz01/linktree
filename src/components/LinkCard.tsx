"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LinkIcon } from "@/components/LinkIcon";
import type { LinkItem } from "@/types";

type Props = {
  link: LinkItem;
  /**
   * 나란히 놓이는 카드들의 라벨 전부.
   * 라벨 칸을 이 중 가장 긴 것에 맞춰, 카드마다 아이콘이 같은 x에 선다.
   * 넘기지 않으면 자기 라벨에만 맞춘다.
   */
  alignLabels?: readonly string[];
};

/** 토스트가 떴다가 사라지기까지. globals.css의 toast-pop 길이와 같아야 한다. */
const TOAST_MS = 1800;

/*
 * 이동 카드와 복사 카드는 생김새가 같아야 해서 클래스를 한 곳에 둔다.
 * px-12로 좌우 여백을 대칭으로 잡아야 아이콘과 라벨이 카드 정중앙에 온다.
 */
const CARD_CLASS =
  "group relative flex w-full items-center justify-center rounded-3xl border border-line bg-surface px-12 py-[1.125rem] shadow-card transition-colors duration-200 hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none";

const TRAILING_CLASS =
  "absolute right-6 h-4 w-4 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:text-accent motion-reduce:transition-none";

/** 바깥으로 나가는 카드. */
function GoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${TRAILING_CLASS} group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** 값을 복사하는 카드. 이동이 아니므로 화살표를 쓰지 않는다. */
function CopyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={TRAILING_CLASS}
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H16" />
    </svg>
  );
}

export function LinkCard({ link, alignLabels }: Props) {
  // id를 같이 들고 있어야 같은 문구를 연달아 띄울 때도 애니메이션이 다시 돈다.
  const [notice, setNotice] = useState<{ id: number; message: string } | null>(
    null,
  );
  const noticeCount = useRef(0);
  const timerRef = useRef<number | null>(null);
  // 포털은 document가 있어야 한다. 서버 렌더에는 없으므로 마운트 후에 붙인다.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showNotice = (message: string) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    noticeCount.current += 1;
    setNotice({ id: noticeCount.current, message });
    timerRef.current = window.setTimeout(() => setNotice(null), TOAST_MS);
  };

  // text-left는 빠뜨리면 안 된다. 복사 카드는 button이라 브라우저 기본
  // text-align:center가 걸려 있어서, 라벨이 칸 안에서 혼자 가운데로 밀린다.
  const labelClass = "text-left text-[0.9375rem] font-medium tracking-tight";

  const body = (
    <span className="flex min-w-0 items-center gap-3">
      {link.icon ? <LinkIcon name={link.icon} /> : null}

      {/*
       * 라벨 칸. 보이는 라벨과 "유령 라벨"을 같은 칸에 겹쳐 둔다.
       * 칸 너비는 둘 중 넓은 쪽을 따르므로, 모든 카드가 가장 긴 라벨의
       * 너비를 갖게 되고 아이콘이 한 줄로 정렬된다.
       * 너비를 숫자로 박지 않으니 라벨이 바뀌어도 따라온다.
       */}
      <span className="grid min-w-0">
        <span className={`col-start-1 row-start-1 truncate ${labelClass}`}>
          {link.label}
        </span>

        <span
          aria-hidden="true"
          className={`col-start-1 row-start-1 invisible h-0 overflow-hidden ${labelClass}`}
        >
          {(alignLabels ?? [link.label]).map((label) => (
            <span key={label} className="block">
              {label}
            </span>
          ))}
        </span>
      </span>
    </span>
  );

  if (link.copyText !== undefined) {
    const { copyText } = link;

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(copyText);
        showNotice("이메일 주소를 복사했습니다");
      } catch {
        // 클립보드는 보안 컨텍스트가 아니거나 권한이 없으면 거부된다.
        // 조용히 넘기면 눌러도 아무 일이 없는 버튼이 되므로 주소를 띄워 준다.
        showNotice(copyText);
      }
    };

    return (
      <>
        <button type="button" onClick={handleCopy} className={CARD_CLASS}>
          {body}
          <CopyGlyph />
        </button>

        {/*
         * 카드가 들어 있는 li는 등장 애니메이션 때문에 transform을 갖는데,
         * transform이 걸린 조상은 position:fixed의 기준이 되어 버린다.
         * 그대로 두면 알림이 화면 하단이 아니라 카드에 매달린다.
         * body로 포털해 기준을 뷰포트로 되돌린다.
         *
         * 버튼 없이 잠깐 떴다 사라진다. 스크린리더에는 읽어 주되 흐름은 끊지 않는다.
         */}
        {isMounted
          ? createPortal(
              <div
                role="status"
                aria-live="polite"
                className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-6"
              >
                {notice ? (
                  <span
                    key={notice.id}
                    className="toast flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.8125rem] tracking-tight shadow-card"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt"
                    />
                    {notice.message}
                  </span>
                ) : null}
              </div>,
              document.body,
            )
          : null}
      </>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={CARD_CLASS}
    >
      {body}
      <GoIcon />
    </a>
  );
}
