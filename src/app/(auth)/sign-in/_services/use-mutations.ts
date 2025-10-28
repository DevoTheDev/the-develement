"use client";

import { signIn, signOut } from "@/app/(auth)/sign-in/_services/mutations";
import { SignInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*  Helper – tiny logger for the browser (dev only)                           */
/* -------------------------------------------------------------------------- */
const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[useAuthMutations]", ...args);
  }
};

/* -------------------------------------------------------------------------- */
/*  Sign-in hook                                                              */
/* -------------------------------------------------------------------------- */
type SignInResult = { success: true } | { success: false; error: string };

export const useSignIn = (): UseMutationResult<
  SignInResult,
  Error,
  SignInSchema
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      log("useSignIn – mutation start", data);
      const result = await signIn(data);
      log("useSignIn – mutation result", result);
      return result;
    },

    onSuccess: (data) => {
      if (data.success) {
        log("useSignIn – success → redirect");
        router.push("/dashboard"); // <-- adjust to your post-login page
        router.refresh();
      }
    },

    onError: (error) => {
      log("useSignIn – React-Query error", error);
    },
  });
};

/* -------------------------------------------------------------------------- */
/*  Sign-out hook                                                             */
/* -------------------------------------------------------------------------- */
type SignOutResult = { success: true } | { success: false; error: string };

export const useSignOut = (): UseMutationResult<
  SignOutResult,
  Error,
  void
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      log("useSignOut – mutation start");
      const result = await signOut();
      log("useSignOut – mutation result", result);
      return result;
    },

    onSuccess: (data) => {
      if (data.success) {
        log("useSignOut – success → redirect to /sign-in");
        router.push("/sign-in");
        router.refresh();
      }
    },

    onError: (error) => {
      log("useSignOut – React-Query error", error);
    },
  });
};