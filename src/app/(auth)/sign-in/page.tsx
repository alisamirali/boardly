import type { Metadata } from "next";
import { SignInCard } from "@/features/auth/components";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Boardly account to access your workspaces, projects, and tasks. Secure authentication for team collaboration.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign In to Boardly",
    description: "Access your project management workspace with secure authentication.",
    type: "website",
  },
};

export default async function SignInPage() {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
}
