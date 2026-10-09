import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Profile } from "@/components/Profile";
import type { Profile as ProfileData } from "@/types";

const profile: ProfileData = {
  name: "이수훈",
  bio: "대한민국 역사 교사",
  avatarUrl: "/profile.svg",
};

describe("Profile", () => {
  test("이름을 페이지 대표 제목으로 보여준다", () => {
    render(<Profile profile={profile} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "이수훈" }),
    ).toBeInTheDocument();
  });

  test("한줄소개를 보여준다", () => {
    render(<Profile profile={profile} />);

    expect(screen.getByText("대한민국 역사 교사")).toBeInTheDocument();
  });

  test("프로필 사진에 이름이 담긴 대체 텍스트를 붙인다", () => {
    render(<Profile profile={profile} />);

    const avatar = screen.getByAltText("이수훈 프로필 사진");
    expect(avatar).toHaveAttribute("src", "/profile.svg");
  });

  test("수상 이력을 연도별로 묶어 보여준다", () => {
    render(
      <Profile
        profile={{
          ...profile,
          awards: [
            {
              year: 2025,
              items: [
                { emoji: "🥇", title: "학교폭력예방 유공 표창" },
                { emoji: "🎬", title: "영상 공모전 금상" },
              ],
            },
            { year: 2024, items: [{ emoji: "🌱", title: "인성교육 유공 표창" }] },
          ],
        }}
      />,
    );

    const awards = screen.getByRole("group");
    expect(within(awards).getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(within(awards).getAllByRole("listitem")).toHaveLength(3);
    expect(within(awards).getByText("영상 공모전 금상")).toBeInTheDocument();
  });

  test("수상 이력은 처음엔 접혀 있고 눌러야 펼쳐진다", async () => {
    const user = userEvent.setup();
    render(
      <Profile
        profile={{
          ...profile,
          awards: [{ year: 2024, items: [{ emoji: "🌱", title: "표창" }] }],
        }}
      />,
    );

    const awards = screen.getByRole("group");
    expect(awards).not.toHaveAttribute("open");

    await user.click(screen.getByText("수상 이력"));

    expect(awards).toHaveAttribute("open");
  });

  test("수상 이력이 없으면 해당 영역을 그리지 않는다", () => {
    render(<Profile profile={profile} />);

    expect(screen.queryByText("수상 이력")).not.toBeInTheDocument();
  });
});
