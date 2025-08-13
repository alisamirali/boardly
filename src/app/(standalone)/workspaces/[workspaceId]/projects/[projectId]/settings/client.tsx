"use client";

import { PageError, PageLoader } from "@/components";
import { useGetProject } from "@/features/projects/api";
import { EditProjectForm } from "@/features/projects/components";
import { useProjectId } from "@/features/projects/hooks";

export function ProjectSettingsPageClient() {
  const projectId = useProjectId();
  const { data: project, isLoading } = useGetProject({ projectId });

  if (isLoading) return <PageLoader />;
  if (!project) return <PageError message="Project not found" />;

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
