import { MobileSidebar } from "@/components";
import { UserButton } from "@/features/auth/components";

export function Navbar() {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor all your tasks and projects in one place
        </p>
      </div>

      <MobileSidebar />

      <UserButton />
    </nav>
  );
}
