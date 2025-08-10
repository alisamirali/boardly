"use client";

import { DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuldUpdateTasks, useGetTasks } from "@/features/tasks/api";
import {
  columns,
  DataFilters,
  DataKanban,
  DataTable,
} from "@/features/tasks/components";
import { useCreateTaskModal, useTaskFilters } from "@/features/tasks/hooks";
import { TaskStatuses } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export function TaskViewSwitcher() {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const { mutate: updateTasks } = useBuldUpdateTasks();

  const { data: tasks, isLoading } = useGetTasks({
    workspaceId,
    status,
    projectId,
    assigneeId,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatuses; position: number }[]) => {
      updateTasks({ json: { tasks } });
    },
    [updateTasks]
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>

            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>

            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>

          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4" />
            New Task
          </Button>
        </div>

        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />

        {isLoading ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Calendar Data
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
