import type { Metadata } from "next";
import { getCurrent } from "@/features/auth/queries";
import { CreateWorkspaceForm } from "@/features/workspaces/components";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Workspace",
  description: "Create a new workspace in Boardly to organize your projects and team collaboration. Set up your first workspace and start managing tasks efficiently.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Your Workspace",
    description: "Set up your first workspace and start collaborating with your team on projects and tasks.",
    type: "website",
  },
};

export default async function CreateWorkSpacePage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}
