import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LinkList } from "@/components/LinkList";
import type { LinkItem } from "@/types";

const links: LinkItem[] = [
  { id: "a", label: "블로그", url: "https://example.com/a" },
  { id: "b", label: "유튜브", url: "https://example.com/b" },
];

describe("LinkList", () => {
  test("주어진 순서대로 링크를 모두 렌더한다", () => {
    render(<LinkList links={links} />);

    const anchors = screen.getAllByRole("link");
    expect(anchors).toHaveLength(2);
    expect(anchors[0]).toHaveTextContent("블로그");
    expect(anchors[1]).toHaveTextContent("유튜브");
  });

  test("링크가 없으면 빈 상태 안내를 보여준다", () => {
    render(<LinkList links={[]} />);

    expect(screen.getByText("아직 등록된 링크가 없습니다.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
