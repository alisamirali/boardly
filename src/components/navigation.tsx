"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkspaceId } from "@/features/workspaces/hooks";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

export const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export function Navigation() {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col ">
      {routes.map((route) => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive =
          pathname === fullHref ||
          pathname === fullHref.replace(/\/$/, "") ||
          pathname === fullHref + "/";
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link href={fullHref} key={route.href}>
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
