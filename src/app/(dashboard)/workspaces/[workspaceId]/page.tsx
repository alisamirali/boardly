import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function WorkspacePage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Workspace</h1>
    </div>
  );
}
