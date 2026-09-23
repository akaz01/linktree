import { LinkCard } from "@/components/LinkCard";
import type { LinkItem } from "@/types";

type Props = {
  links: readonly LinkItem[];
};

export function LinkList({ links }: Props) {
  if (links.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-sm text-muted">
        아직 등록된 링크가 없습니다.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}
