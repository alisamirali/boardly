import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { TaskViewSwitcher } from "@/features/tasks/components";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { projectId: string };
};

export default async function ProjectPage({ params }: Props) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  if (!initialValues) throw new Error("Project Not Found!");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <p className="bg-neutral-200 size-8 rounded-full p-2 flex items-center justify-center text-lg">
            {initialValues.emoji}
          </p>
          <p className="text-lg font-bold">{initialValues.name}</p>
        </div>

        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>

      <TaskViewSwitcher />
    </div>
  );
}
