import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { LinkCard } from "@/components/LinkCard";
import type { LinkItem } from "@/types";

const link: LinkItem = {
  id: "github",
  label: "GitHub",
  url: "https://github.com/example",
};

const copyLink: LinkItem = {
  id: "email",
  label: "이메일",
  copyText: "someone@example.com",
};

/**
 * jsdom에는 클립보드가 없다. userEvent.setup()이 자체 스텁을 깔기 때문에
 * 그보다 나중에 덮어써야 우리 mock이 실제로 호출된다.
 */
function stubClipboard(writeText: () => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
}

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

  test("너비를 맞추려고 넣은 다른 라벨은 링크 이름에 섞이지 않는다", () => {
    render(
      <LinkCard link={link} alignLabels={["GitHub", "인스타그램", "이메일"]} />,
    );

    // 이름이 라벨과 정확히 같아야 한다. 유령 라벨이 읽히면 이름이 길어진다.
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
  });
});

describe("LinkCard - 복사 카드", () => {
  test("주소로 이동하지 않으므로 링크가 아니라 버튼으로 그린다", () => {
    render(<LinkCard link={copyLink} />);

    expect(screen.getByRole("button", { name: "이메일" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("누르면 주소를 클립보드에 복사하고 알림을 띄운다", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    render(<LinkCard link={copyLink} />);

    await user.click(screen.getByRole("button", { name: "이메일" }));

    expect(writeText).toHaveBeenCalledWith("someone@example.com");
    expect(
      await screen.findByText("이메일 주소를 복사했습니다"),
    ).toBeInTheDocument();
  });

  test("복사가 거부되면 주소를 직접 보여 준다", async () => {
    const user = userEvent.setup();
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<LinkCard link={copyLink} />);

    await user.click(screen.getByRole("button", { name: "이메일" }));

    // 눌러도 아무 일이 없는 버튼이 되지 않도록, 실패해도 주소는 보여 준다.
    expect(await screen.findByText("someone@example.com")).toBeInTheDocument();
  });

  test("알림은 스크린리더가 흐름을 끊지 않고 읽도록 표시한다", () => {
    render(<LinkCard link={copyLink} />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });
});
