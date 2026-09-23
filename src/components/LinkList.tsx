import { LinkCard } from "@/components/LinkCard";
import type { LinkItem } from "@/types";

type Props = {
  links: readonly LinkItem[];
};

/** 카드가 한 장씩 차례로 올라오도록 주는 간격. */
const STAGGER_MS = 70;

export function LinkList({ links }: Props) {
  if (links.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-line px-6 py-10 text-center text-sm text-muted">
        아직 등록된 링크가 없습니다.
      </p>
    );
  }

  // 카드들이 서로의 라벨 너비를 알아야 아이콘 위치를 맞출 수 있다.
  const labels = links.map((link) => link.label);

  return (
    <ul className="flex flex-col gap-5 sm:gap-6">
      {links.map((link, index) => (
        <li
          key={link.id}
          className="rise"
          style={{ animationDelay: `${160 + index * STAGGER_MS}ms` }}
        >
          <LinkCard link={link} alignLabels={labels} />
        </li>
      ))}
    </ul>
  );
}
