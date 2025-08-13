"use client";

import { PageError, PageLoader } from "@/components";
import { useGetWorkspace } from "@/features/workspaces/api";
import { EditWorkspaceForm } from "@/features/workspaces/components";
import { useWorkspaceId } from "@/features/workspaces/hooks";

export function SettingsPageClient() {
  const workspaceId = useWorkspaceId();

  const { data: workspace, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) return <PageLoader />;
  if (!workspace) return <PageError message="Workspace not found" />;

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={workspace} />
    </div>
  );
}
