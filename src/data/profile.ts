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
  awards: [
    {
      year: 2026,
      items: [
        {
          emoji: "📜",
          title: "제24회 전국중고등학생 우리역사바로알기 대회 장려상 (학생 지도)",
        },
        {
          emoji: "📜",
          title:
            "제17회 삼국유사 퀴즈대회(전국 고교생 역사퀴즈 대항전) 장려상 (학생 지도)",
        },
      ],
    },
    {
      year: 2025,
      items: [
        { emoji: "🥇", title: "학생생활지도 및 학교폭력예방 유공 표창 (교육감)" },
        { emoji: "🎬", title: "안보지킴이 공모전 영상 분야 우수상 (경찰청장)" },
        { emoji: "🎬", title: "학교폭력예방 친구사랑3운동 영상 공모전 금상" },
      ],
    },
    {
      year: 2024,
      items: [
        { emoji: "🌱", title: "대전동부교육지원청 인성교육 활성화 유공 표창 (교육장)" },
        { emoji: "🎵", title: "대전광역시 초중학생음악경연대회 지도교사상 (교육감)" },
      ],
    },
    {
      year: 2023,
      items: [
        { emoji: "🎨", title: "학교예술교육활성화 유공 표창 (교육감)" },
        { emoji: "🎵", title: "대전광역시 초중학생음악경연대회 지도교사상 (교육감)" },
      ],
    },
  ],
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
    url: "https://www.instagram.com/shoon_zip/",
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
