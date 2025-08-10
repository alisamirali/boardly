"use client";

import { KanbanBoardHeader } from "@/features/tasks/components";
import { Task, TaskStatuses } from "@/features/tasks/types";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";

type Props = {
  data: Task[];
};

const boards: TaskStatuses[] = [
  TaskStatuses.BACKLOG,
  TaskStatuses.TODO,
  TaskStatuses.IN_PROGRESS,
  TaskStatuses.IN_REVIEW,
  TaskStatuses.DONE,
];

type TaskState = {
  [key in TaskStatuses]: Task[];
};

export function DataKanban({ data }: Props) {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialTasks: TaskState = {
      [TaskStatuses.BACKLOG]: [],
      [TaskStatuses.TODO]: [],
      [TaskStatuses.IN_PROGRESS]: [],
      [TaskStatuses.IN_REVIEW]: [],
      [TaskStatuses.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatuses].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto hide-scrollbar">
        {boards.map((board) => {
          return (
            <div
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              key={board}
            >
              <KanbanBoardHeader
                board={board}
                taskCount={tasks[board].length}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
