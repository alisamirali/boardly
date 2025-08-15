import type { Metadata } from "next";
import { SignUpCard } from "@/features/auth/components";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Boardly account to start managing projects, tasks, and team collaboration. Join thousands of teams using Boardly for project management.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Your Boardly Account",
    description: "Start your project management journey with Boardly. Create workspaces, manage tasks, and collaborate with your team.",
    type: "website",
  },
};

export default async function SignUpPage() {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignUpCard />;
}
