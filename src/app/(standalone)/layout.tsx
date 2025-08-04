import { UserButton } from "@/features/auth/components";
import Link from "next/link";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between h-[73px]">
          <Link href="/" className="text-2xl font-bold text-[#2563eb]">
            Boardly.
          </Link>
          <UserButton />
        </nav>

        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
