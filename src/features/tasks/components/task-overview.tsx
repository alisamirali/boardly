import { DottedSeparator } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberAvatar } from "@/features/members/components";
import { TaskDate } from "@/features/tasks/components";
import { useEditTaskModal } from "@/features/tasks/hooks";
import { Task } from "@/features/tasks/types";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { PencilIcon } from "lucide-react";

type Props = {
  task: Task;
};

export function TaskOverView({ task }: Props) {
  const { open } = useEditTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button variant="secondary" size="sm" onClick={() => open(task.$id)}>
            <PencilIcon className="size-4 mr-1" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <div className="flex items-start gap-x-2">
            <div className="min-w-[100px]">
              <p className="text-sm text-muted-foreground">Assignee</p>
            </div>
            <div className="flex items-center gap-x-2">
              <MemberAvatar name={task.assignee.name} className="size-6" />
              <p className="text-sm font-medium">{task.assignee.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-x-2">
            <div className="min-w-[100px]">
              <p className="text-sm text-muted-foreground">Due Date</p>
            </div>
            <div className="flex items-center gap-x-2">
              <TaskDate value={task.dueDate} className="text-sm font-medium" />
            </div>
          </div>

          <div className="flex items-start gap-x-2">
            <div className="min-w-[100px]">
              <p className="text-sm text-muted-foreground">Status</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Badge variant={task.status}>
                {snakeCaseToTitleCase(task.status)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
