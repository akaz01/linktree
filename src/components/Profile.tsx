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
    </header>
  );
}
