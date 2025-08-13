import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { InviteCodePageClient } from "./client";

export default async function JoinWorkspacePage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <InviteCodePageClient />;
}
