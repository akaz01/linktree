import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

const setTheme = vi.fn();
let resolvedTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme, setTheme }),
}));

beforeEach(() => {
  setTheme.mockClear();
  resolvedTheme = "light";
});

describe("ThemeToggle", () => {
  test("밝은 화면에서는 어두운 화면으로 전환한다", async () => {
    render(<ThemeToggle />);

    await userEvent.click(
      screen.getByRole("button", { name: "어두운 화면으로 전환" }),
    );

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  test("어두운 화면에서는 밝은 화면으로 전환한다", async () => {
    resolvedTheme = "dark";
    render(<ThemeToggle />);

    await userEvent.click(
      screen.getByRole("button", { name: "밝은 화면으로 전환" }),
    );

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  test("버튼에 항상 접근 가능한 이름이 있다", () => {
    render(<ThemeToggle />);

    // 마운트 뒤에는 테마에 맞는 라벨로 바뀌지만, 이름 자체는 비지 않는다.
    expect(screen.getByRole("button")).toHaveAccessibleName();
  });
});
