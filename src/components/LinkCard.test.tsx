import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LinkCard } from "@/components/LinkCard";
import type { LinkItem } from "@/types";

const link: LinkItem = {
  id: "github",
  label: "GitHub",
  url: "https://github.com/example",
};

describe("LinkCard", () => {
  test("링크 명칭만 보여준다", () => {
    render(<LinkCard link={link} />);

    // 접근 가능한 이름이 라벨과 정확히 같으면 부가 텍스트가 없다는 뜻이다.
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
  });

  test("새 탭으로 열되 opener 참조를 넘기지 않는다", () => {
    render(<LinkCard link={link} />);

    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", link.url);
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });
});
