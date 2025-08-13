"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api";
import { useGetProjects } from "@/features/projects/api";
import { useProjectId } from "@/features/projects/hooks";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./create-task-form";

type Props = {
  onCancel: () => void;
};

export function CreateTaskFormWrapper({ onCancel }: Props) {
  const workspaceId = useWorkspaceId();
  const urlProjectId = useProjectId();
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

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[715px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="animate-spin size-5 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      onCancel={onCancel}
      defaultProjectId={urlProjectId}
    />
  );
}
