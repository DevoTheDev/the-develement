// app/(auth)/actions.ts
"use server";

import { signInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth"; // your auth.ts with NextAuth()

export async function signInAction(data: unknown) {
  const parsed = signInSchema.safeParse(data);
  if (!parsed.success) {
    // Return errors to client (you can throw or return)
    throw new Error("Invalid form data");
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Important: prevent default redirect
    });

    // Only redirect after successful sign-in
    redirect("/admin"); // Change to your protected route
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error; // Re-throw unexpected errors
  }
}

export async function signOutAction() {
  await signOut({ redirect: false });
  redirect("/sign-in");
}