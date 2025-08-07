"use client";

import { useGetProjects } from "@/features/projects/api";
import { useCreateProjectModal } from "@/features/projects/hooks";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export function Projects() {
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  const { open } = useCreateProjectModal();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={open}
          title="Create Project"
        />
      </div>

      <div className="mt-3 flex flex-col items-start gap-1">
        {data?.documents.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
          const isActive = pathname === href;

          return (
            <Link href={href} key={project.$id} className="w-full">
              <div
                className={cn(
                  "flex items-center gap-2 px-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500 py-1.5",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <span className="text-lg">{project.emoji}</span>
                <span className="truncate text-sm font-medium">
                  {project.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
