import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { SettingsPageClient } from "./client";

export default async function SettingsPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <SettingsPageClient />;
}
