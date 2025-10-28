// src/auth/next-auth.ts
import db from "@/lib/db";
import {
    comparePassword,
    toNumberSafe,
    toStringSafe,
} from "@/lib/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";

/* -------------------------------------------------------------------------- */
/*  Helper – safe console.log that only runs in dev / staging                 */
/* -------------------------------------------------------------------------- */
const log = (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
        console.log("[next-auth]", ...args);
    }
};

/* -------------------------------------------------------------------------- */
/*  NextAuth configuration                                                    */
/* -------------------------------------------------------------------------- */
export const { handlers, signIn, signOut, auth } = NextAuth({
    // ---------------------------------------------------------------------- //
    //  Core options
    // ---------------------------------------------------------------------- //
    trustHost: true,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

    // ---------------------------------------------------------------------- //
    //  Providers
    // ---------------------------------------------------------------------- //
    providers: [
        Credentials({
            credentials: { email: {}, password: {} },

            async authorize(credentials) {
                try {
                    log("authorize() – start", { credentials });

                    // ---- 1. Validate input ---------------------------------------
                    const parsed = signInSchema.safeParse(credentials);
                    if (!parsed.success) {
                        log("authorize() – validation failed", parsed.error.format());
                        throw new Error("Invalid email or password");
                    }
                    const { email, password } = parsed.data;
                    log("authorize() – validated", { email });

                    // ---- 2. Find user --------------------------------------------
                    const user = await db.user.findUnique({
                        where: { email },
                        select: { id: true, email: true, name: true, password: true, role: true },
                    });

                    if (!user) {
                        log("authorize() – user not found", { email });
                        throw new Error("Invalid email or password");
                    }
                    log("authorize() – user found", { id: user.id, email: user.email });

                    // ---- 3. Verify password --------------------------------------
                    const passwordOk = await comparePassword(password, user.password);
                    if (!passwordOk) {
                        log("authorize() – password mismatch", { email });
                        throw new Error("Invalid email or password");
                    }
                    log("authorize() – password verified");

                    // ---- 4. Return minimal payload --------------------------------
                    const payload = {
                        id: toStringSafe(user.id),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                    log("authorize() – success", payload);
                    return payload;
                } catch (err) {
                    // ------------------------------------------------------------------
                    //  All errors end up here – we **never** let an exception bubble out
                    // ------------------------------------------------------------------
                    const message =
                        err instanceof Error ? err.message : "Authentication failed";
                    log("authorize() – ERROR", message, err);
                    // Return null → NextAuth will respond with 401/redirect to sign-in
                    return null;
                }
            },
        }),
    ],

    // ---------------------------------------------------------------------- //
    //  Callbacks
    // ---------------------------------------------------------------------- //
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = toNumberSafe(user.id);
                token.name = user.name;
                token.role = user.role;
                log("jwt callback – added custom claims", { token });
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token.id != null) {
                session.user.id = toStringSafe(token.id);
                session.user.name = token.name;
                session.user.role = token.role;
                log("session callback – enriched session", { session });
            }
            return session;
        },
    },

    // ---------------------------------------------------------------------- //
    //  Global error handling (optional but nice to have)
    // ---------------------------------------------------------------------- //
    // @ts-ignore – NextAuth types don’t expose this yet, but it works
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async onError(error: any) {
        log("NextAuth global error", error);
    },
});