import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { TaskClient } from "./client";

export default async function TaskPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <TaskClient />;
}
