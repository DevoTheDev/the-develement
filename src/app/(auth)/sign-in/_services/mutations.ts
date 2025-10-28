// src/app/(auth)/sign-in/_services/mutations.ts
"use server";

import {
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import {
  signIn as nextAuthSignIn,
  signOut as authSignOut,
} from "@/lib/auth";

/* -------------------------------------------------------------------------- */
/*  Tiny logger – only prints in dev / staging                               */
/* -------------------------------------------------------------------------- */
const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[auth-mutations]", ...args);
  }
};

/* -------------------------------------------------------------------------- */
/*  Helper – runs an async fn and returns a typed result (success | error)    */
/* -------------------------------------------------------------------------- */
type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

const executeAction = async <T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> => {
  try {
    const data = await fn();
    log("executeAction – success");
    return { success: true, data };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    log("executeAction – ERROR", message, err);
    return { success: false, error: message };
  }
};

/* -------------------------------------------------------------------------- */
/*  Sign-in action                                                            */
/* -------------------------------------------------------------------------- */
export const signIn = async (data: SignInSchema): Promise<ActionResult> => {
  log("signIn – start", data);

  return executeAction(async () => {
    // 1. Validate with Zod (throws if invalid)
    const validated = signInSchema.parse(data);
    log("signIn – validated", validated);

    // 2. Call NextAuth – we *don't* use redirect here
    const result = await nextAuthSignIn("credentials", {
      ...validated,
      redirect: false,
    });

    // NextAuth returns `{ ok: true }` on success, otherwise `{ error: string }`
    if (!result?.ok) {
      const errMsg = result?.error ?? "Authentication failed";
      log("signIn – NextAuth rejected", errMsg);
      throw new Error(errMsg);
    }

    log("signIn – NextAuth accepted");
  });
};

/* -------------------------------------------------------------------------- */
/*  Sign-out action                                                           */
/* -------------------------------------------------------------------------- */
export const signOut = async (): Promise<ActionResult> => {
  log("signOut – start");

  return executeAction(async () => {
    await authSignOut({ redirect: false });
    log("signOut – completed");
  });
};