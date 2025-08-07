import {
  DottedSeparator,
  Navigation,
  Projects,
  WorkspaceSwitcher,
} from "@/components";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/" className="text-2xl font-bold text-[#2563eb]">
        Boardly.
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
}
