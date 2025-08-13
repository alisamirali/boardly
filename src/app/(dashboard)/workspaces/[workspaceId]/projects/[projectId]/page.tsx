import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ProjectIdPageClient } from "./client";

export default async function ProjectPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <ProjectIdPageClient />;
}
