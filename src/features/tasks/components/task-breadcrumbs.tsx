"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/features/projects/types";
import { useDeleteTask } from "@/features/tasks/api";
import { Task } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { useConfirm } from "@/hooks";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
  task: Task;
};

export function TaskBreadcrumbs({ project, task }: Props) {
  const router = useRouter();
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone",
    "destructive"
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };

  const workspaceId = useWorkspaceId();
  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />

      <Link
        href={`/workspaces/${workspaceId}/projects/${project.$id}`}
        className="flex items-center gap-x-1"
      >
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          <span className="mr-1">{project.emoji}</span>
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={handleDeleteTask}
        disabled={isPending}
      >
        <TrashIcon className="size-4 lg:mr-1" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
}
