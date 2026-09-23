import { render, screen } from "@testing-library/react";
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
});
