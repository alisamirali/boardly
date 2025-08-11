"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemberAvatar } from "@/features/members/components";
import { Project } from "@/features/projects/types";
import { TaskStatuses } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { cn, snakeCaseToTitleCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type Props = {
  title: string;
  assignee: any;
  project: Project;
  status: TaskStatuses;
  id: string;
};

const statusColorMap: Record<TaskStatuses, string> = {
  [TaskStatuses.BACKLOG]: "border-l-primary",
  [TaskStatuses.TODO]: "border-l-red-500",
  [TaskStatuses.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatuses.IN_REVIEW]: "border-l-blue-500",
  [TaskStatuses.DONE]: "border-l-emerald-500",
};

export function EventCard({ title, assignee, project, status, id }: Props) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p title={snakeCaseToTitleCase(status)}>{title}</p>
        <div className="flex items-center gap-x-1">
          <div title={assignee?.name}>
            <MemberAvatar name={assignee?.name} />
          </div>
          <div className="size-1 rounded-full bg-neutral-300" />
          <p>{project.name}</p>
        </div>
      </div>
    </div>
  );
}
