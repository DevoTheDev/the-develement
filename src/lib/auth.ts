// src/auth/next-auth.ts
import db from "@/lib/db";
import { comparePassword, toNumberSafe, toStringSafe } from "@/lib/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: { email: {}, password: {} },

            async authorize(credentials) {
                // ---- 1. Validate input -------------------------------------------------
                const { email, password } = signInSchema.parse(credentials);

                // ---- 2. Find user ------------------------------------------------------
                const user = await db.user.findUnique({ where: { email } });
                if (!user) throw new Error("Invalid email or password");

                // ---- 3. Verify password ------------------------------------------------
                const ok = await comparePassword(password, user.password);
                if (!ok) throw new Error("Invalid email or password");

                // ---- 4. Return minimal user payload ------------------------------------
                return {
                    id: toStringSafe(user.id),   // string for session
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        // ---- Add custom claims to JWT -------------------------------------------
        jwt({ token, user }) {
            if (user) {
                token.id = toNumberSafe(user.id);   // keep as number inside JWT
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },

        // ---- Expose the same claims in the client session -----------------------
        session({ session, token }) {
            if (session.user) {
                session.user.id = toStringSafe(token.id);
                session.user.name = token.name;
                session.user.role = token.role;
            }
            return session;
        },
    },
});