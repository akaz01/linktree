import Image from "next/image";
import { Fragment } from "react";
import type { Profile as ProfileData } from "@/types";

type Props = {
  profile: ProfileData;
};

export function Profile({ profile }: Props) {
  // 소개글이 이미 "|"로 두 정체성을 나눠 놓았다. 그 구분자를 지우지 않고
  // 강조색을 주는 유일한 글자로 쓴다.
  const bioParts = profile.bio.split("|").map((part) => part.trim());

  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {/* 링 색이 배경으로 번져 나가는 것처럼 보이게 하는 광원. */}
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full bg-[var(--ring-glow)] blur-2xl"
        />

        {/*
         * 시그니처 — 핑크에서 라임으로 도는 링.
         * 두 강조색이 화면에서 직접 맞닿는 단 하나의 자리다.
         */}
        <div className="relative rounded-full bg-[conic-gradient(from_150deg,var(--accent),var(--volt),var(--accent))] p-[2px]">
          <div className="rounded-full bg-canvas p-[5px]">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name} 프로필 사진`}
              width={256}
              height={256}
              priority
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-7 text-[2rem] font-bold leading-none tracking-[-0.045em]">
        {profile.name}
      </h1>

      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm tracking-tight text-muted">
        {bioParts.map((part, index) => (
          <Fragment key={part}>
            {index > 0 ? (
              <span aria-hidden="true" className="text-volt">
                /
              </span>
            ) : null}
            <span>{part}</span>
          </Fragment>
        ))}
      </p>

      {profile.awards && profile.awards.length > 0 ? (
        // 이력이 길어 링크 카드를 화면 밖으로 밀어내지 않도록 접어 둔다.
        // 네이티브 <details>라 클라이언트 JS 없이 열고 닫힌다.
        <details className="group mt-5 w-full">
          <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs tracking-tight text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            수상 이력
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3 w-3 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </summary>

          {/*
           * 이력은 한 줄에 하나씩 끊기지 않게 보여준다. 가장 긴 줄이 본문 폭보다
           * 길어서, 카드는 본문 여백 밖으로 넓히고 좁은 화면에서는 글자를
           * 화면 폭에 맞춰 줄인다.
           */}
          <div className="relative left-1/2 mt-4 w-[min(30rem,calc(100vw_-_1rem))] -translate-x-1/2 space-y-5 rounded-2xl border border-line bg-surface px-3 py-5 text-left shadow-card sm:px-5">
            {profile.awards.map((group) => (
              <div key={group.year}>
                <h2 className="text-xs font-semibold tabular-nums tracking-wide text-foreground">
                  {group.year}
                </h2>
                <ul className="mt-2 space-y-1.5 text-[length:min(0.8125rem,calc((100vw_-_70px)/29.5))] leading-snug tracking-tight text-muted">
                  {group.items.map((award) => (
                    <li key={award.title} className="flex gap-2 whitespace-nowrap">
                      <span aria-hidden="true" className="shrink-0">
                        {award.emoji}
                      </span>
                      <span>{award.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      ) : null}
    </header>
  );
}
