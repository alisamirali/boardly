"use client";

import { PageError, PageLoader } from "@/components";
import { useGetWorkspaceInfo } from "@/features/workspaces/api";
import { JoinWorkspaceForm } from "@/features/workspaces/components";
import { useWorkspaceId } from "@/features/workspaces/hooks";

export function InviteCodePageClient() {
  const workspaceId = useWorkspaceId();

  const { data: workspace, isLoading } = useGetWorkspaceInfo({ workspaceId });

  if (isLoading) return <PageLoader />;
  if (!workspace) return <PageError message="Workspace info not found" />;
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  );
}
