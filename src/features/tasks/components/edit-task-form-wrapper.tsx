"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api";
import { useGetProjects } from "@/features/projects/api";
import { useGetTask } from "@/features/tasks/api";
import { EditTaskForm } from "@/features/tasks/components";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { Loader } from "lucide-react";

type Props = {
  onCancel: () => void;
  id: string;
};

export function EditTaskFormWrapper({ onCancel, id }: Props) {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading: isLoadingTasks } = useGetTask({
    taskId: id,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    emoji: project.emoji,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTasks;

  if (isLoading) {
    return (
      <Card className="w-full h-[715px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="animate-spin size-5 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) return null;

  return (
    <EditTaskForm
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
}
