import { LinkList } from "@/components/LinkList";
import { Profile } from "@/components/Profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[27rem] flex-col px-6 pb-24 pt-7 sm:px-9 sm:pt-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="rise mt-8 sm:mt-10">
        <Profile profile={profile} />
      </div>

      <section aria-label="링크 목록" className="mt-12 sm:mt-14">
        <LinkList links={links} />
      </section>
    </main>
  );
}
