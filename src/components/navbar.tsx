"use client";

import { MobileSidebar } from "@/components";
import { UserButton } from "@/features/auth/components";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "Organize and track all your tasks in one place. ✅",
  },
  projects: {
    title: "My Projects",
    description: "Plan and monitor projects from start to finish. 📂",
  },
};

const defaultMap = {
  title: "Issue & Project Tracking",
  description: "Plan, track, and release software with ease. 🚀",
};

export function Navbar() {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <MobileSidebar />

      <UserButton />
    </nav>
  );
}
