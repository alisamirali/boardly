"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";
import { createAdminClient } from "./appwrite";

export async function signUpWithGithub() {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
      throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT not configured");
    }
    if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT) {
      throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT not configured");
    }
    if (!process.env.NEXT_APPWRITE_KEY) {
      throw new Error("NEXT_APPWRITE_KEY not configured");
    }

    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    if (!origin) {
      throw new Error("Origin header not found");
    }

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Github,
      `${origin}/oauth`,
      `${origin}/sign-up`
    );

    redirect(redirectUrl);
  } catch (error) {
    throw new Error(
      `Failed to initiate GitHub OAuth: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function signUpWithGoogle() {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
      throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT not configured");
    }
    if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT) {
      throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT not configured");
    }
    if (!process.env.NEXT_APPWRITE_KEY) {
      throw new Error("NEXT_APPWRITE_KEY not configured");
    }

    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    if (!origin) {
      throw new Error("Origin header not found");
    }

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${origin}/oauth`,
      `${origin}/sign-up`
    );

    redirect(redirectUrl);
  } catch (error) {
    throw new Error(
      `Failed to initiate Google OAuth: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
