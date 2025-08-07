import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

type Props = {
  params: { projectId: string };
};

export default async function ProjectSettingsPage({ params }: Props) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProject({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
