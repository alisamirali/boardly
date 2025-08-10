import { DottedSeparator } from "@/components";
import { MemberAvatar } from "@/features/members/components";
import { TaskActions } from "@/features/tasks/components/task-actions";
import { TaskDate } from "@/features/tasks/components/task-date";
import { Task } from "@/features/tasks/types";
import { MoreHorizontalIcon } from "lucide-react";

type Props = {
  task: Task;
};

export function KanbanCard({ task }: Props) {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="size-[18px] shrink-0 text-neutral-700 hover:opacity-75 transition cursor-pointer" />
        </TaskActions>
      </div>

      <DottedSeparator />

      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>

      <div className="flex items-center gap-x-1.5">
        <span className="text-xs font-medium">{task.project.emoji}</span>
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
}
