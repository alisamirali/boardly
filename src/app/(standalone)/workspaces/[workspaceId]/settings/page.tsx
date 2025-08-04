import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { EditWorkspaceForm } from "@/features/workspaces/components";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
  };
};

export default async function SettingsPage({ params }: Props) {
  const user = await getCurrent();

  if (!user) redirect("/sign-ing");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
