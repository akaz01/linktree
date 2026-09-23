import { LinkList } from "@/components/LinkList";
import { Profile } from "@/components/Profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-16 pt-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="mt-4">
        <Profile profile={profile} />
      </div>

      <section aria-label="링크 목록" className="mt-10">
        <LinkList links={links} />
      </section>
    </main>
  );
}
