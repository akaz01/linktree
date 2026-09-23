/** 페이지 주인의 프로필 정보. */
export interface Profile {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 절대 URL. */
  avatarUrl: string;
}

/** 링크 카드 한 장에 필요한 정보. */
export interface LinkItem {
  /** 클릭 수 집계에서 링크를 식별할 키. 변하지 않아야 한다. */
  id: string;
  label: string;
  url: string;
}
