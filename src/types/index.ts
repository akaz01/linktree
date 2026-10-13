/** 페이지 주인의 프로필 정보. */
export interface Profile {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 절대 URL. */
  avatarUrl: string;
  /** 최신 연도부터 적는다. 생략하면 수상 이력 영역을 그리지 않는다. */
  awards?: readonly AwardYear[];
}

/** 수상 이력 한 줄. */
export interface Award {
  emoji: string;
  title: string;
}

/** 같은 해에 받은 수상 이력 묶음. */
export interface AwardYear {
  year: number;
  items: readonly Award[];
}

/** 링크 카드 앞에 붙일 수 있는 아이콘. */
export type LinkIconName = "github" | "instagram" | "gmail";

type LinkItemBase = {
  /** 클릭 수 집계에서 링크를 식별할 키. 변하지 않아야 한다. */
  id: string;
  label: string;
  /** 생략하면 라벨만 보여준다. */
  icon?: LinkIconName;
};

/**
 * 링크 카드 한 장에 필요한 정보.
 *
 * 카드는 주소 이동, 값 복사, 안내 표시 중 하나만 한다.
 * 동작을 동시에 지정하지 못하도록 타입 단계에서 막는다.
 */
export type LinkItem =
  | (LinkItemBase & { url: string; copyText?: never; noticeText?: never })
  | (LinkItemBase & { copyText: string; url?: never; noticeText?: never })
  | (LinkItemBase & { noticeText: string; url?: never; copyText?: never });
