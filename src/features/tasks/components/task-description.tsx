"use client";

import { DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "@/features/tasks/api";
import { Task } from "@/features/tasks/types";
import { PencilIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  task: Task;
};

export function TaskDescription({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate: updateTask, isPending } = useUpdateTask();

  // Sync local state with task data when it changes
  useEffect(() => {
    setValue(task.description);
  }, [task.description]);

  const handleSave = () => {
    updateTask(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Description</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <>
              <XIcon className="size-4 mr-1" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="size-4 mr-1" />
              Edit
            </>
          )}
        </Button>
      </div>
      <DottedSeparator className="my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task?.description ? (
            task.description
          ) : (
            <p className="text-sm text-muted-foreground">No description set</p>
          )}
        </div>
      )}
    </div>
  );
}
