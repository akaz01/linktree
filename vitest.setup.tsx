import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

/** next/image 전용 prop. 평범한 img로 넘기면 React가 DOM 속성으로 오해한다. */
type NextImageOnlyProps = {
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
};

// next/image는 Next 런타임 밖에서 최적화 파이프라인을 찾다가 실패한다.
// 테스트에서는 평범한 img로 바꿔 렌더 결과만 검증한다.
vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    fill: _fill,
    quality: _quality,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    unoptimized: _unoptimized,
    alt,
    ...rest
  }: ImgHTMLAttributes<HTMLImageElement> & NextImageOnlyProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...rest} />
  ),
}));

afterEach(() => {
  cleanup();
});
