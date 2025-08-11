"use client";

import { DottedSeparator, PageError, PageLoader } from "@/components";
import { useGetTask } from "@/features/tasks/api";
import {
  TaskBreadcrumbs,
  TaskDescription,
  TaskOverView,
} from "@/features/tasks/components";
import { useTaskId } from "@/features/tasks/hooks";

export function TaskClient() {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) return <PageLoader />;
  if (!data) return <PageError message="Task not found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverView task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
}
