"use client";

import { Analytics, PageError, PageLoader } from "@/components";
import { Button } from "@/components/ui/button";
import { useGetProject, useGetProjectAnalytics } from "@/features/projects/api";
import { useProjectId } from "@/features/projects/hooks";
import { TaskViewSwitcher } from "@/features/tasks/components";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export function ProjectIdPageClient() {
  const projectId = useProjectId();
  const { data: project, isLoading } = useGetProject({ projectId });
  const { data: projectAnalytics, isLoading: isProjectAnalyticsLoading } =
    useGetProjectAnalytics({ projectId });

  if (isLoading || isProjectAnalyticsLoading) return <PageLoader />;
  if (!project) return <PageError message="Project not found" />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <p className="bg-neutral-200 size-8 rounded-full p-2 flex items-center justify-center text-lg">
            {project.emoji}
          </p>
          <p className="text-lg font-bold">{project.name}</p>
        </div>

        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>

      {projectAnalytics && <Analytics data={projectAnalytics} />}

      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
}
