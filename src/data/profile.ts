import type { LinkItem, Profile } from "@/types";

/**
 * 페이지에 보여줄 내용은 전부 여기서 관리한다.
 * 내용을 바꾸고 싶으면 이 파일만 수정하면 된다.
 *
 * 지금 값은 전부 화면 확인용 더미다. 실제 내용으로 바꿀 때:
 * - 프로필 사진: public/에 사진을 넣고 avatarUrl 경로를 바꾼다.
 * - 링크: url을 실제 주소로 바꾼다. id는 클릭 수 집계 키라 한 번 정하면 유지한다.
 */
export const profile: Profile = {
  name: "이수훈",
  bio: "대한민국 역사 교사 | AI 개발 공부중",
  avatarUrl: "/profile.jpg",
};

export const links: readonly LinkItem[] = [
  {
    id: "github",
    label: "깃허브",
    url: "https://github.com/akaz01",
    icon: "github",
  },
  {
    id: "instagram",
    label: "인스타그램",
    url: "https://www.instagram.com/suhoon_ing",
    icon: "instagram",
  },
  {
    id: "email",
    label: "이메일",
    // 메일 앱을 여는 대신 주소를 복사한다. 웹메일만 쓰는 사람에게는
    // mailto:가 아무 반응 없는 버튼처럼 보이기 때문이다.
    copyText: "k2tngnsdl@gmail.com",
    icon: "gmail",
  },
];
