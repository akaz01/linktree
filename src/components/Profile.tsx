import Image from "next/image";
import type { Profile as ProfileData } from "@/types";

type Props = {
  profile: ProfileData;
};

export function Profile({ profile }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 테두리 링으로 사진에 깊이를 준다. 사진 자체는 정원으로 잘린다. */}
      <div className="rounded-full bg-surface p-1.5 shadow-card ring-1 ring-line">
        <Image
          src={profile.avatarUrl}
          alt={`${profile.name} 프로필 사진`}
          width={160}
          height={160}
          priority
          className="h-40 w-40 rounded-full object-cover"
        />
      </div>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        {profile.name}
      </h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{profile.bio}</p>
    </header>
  );
}
