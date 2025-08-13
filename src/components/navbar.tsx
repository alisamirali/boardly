import { MobileSidebar } from "@/components";
import { UserButton } from "@/features/auth/components";

export function Navbar() {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Issue & Project Tracking</h1>
        <p className="text-muted-foreground">
          Plan, track, and release world-class software with the #1 agile
          project management tool. 🚀
        </p>
      </div>

      <MobileSidebar />

      <UserButton />
    </nav>
  );
}
