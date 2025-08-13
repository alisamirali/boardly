import { ProjectSettingsPageClient } from "@/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function ProjectSettingsPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectSettingsPageClient />;
}
