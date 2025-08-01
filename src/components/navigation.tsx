"use client";

import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col ">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link href={route.href} key={route.href}>
            <div
              className={cn(
                "group flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon
                className={cn(
                  "size-5 text-neutral-500 group-hover:text-primary transition",
                  isActive && "text-primary"
                )}
              />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
}
