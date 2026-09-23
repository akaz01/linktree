import type { LinkItem } from "@/types";

type Props = {
  link: LinkItem;
};

export function LinkCard({ link }: Props) {
  // px-12: 좌우 여백을 대칭으로 크게 잡아 우측 화살표가 라벨을 가리지 않게 한다.
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center rounded-2xl border border-line bg-surface px-12 py-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="truncate text-center font-medium">{link.label}</span>

      {/* 장식용 화살표. 흐름에서 빼야 라벨이 카드 정중앙에 온다. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="absolute right-5 h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
