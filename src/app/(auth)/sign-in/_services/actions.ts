'use server';

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Important: don't redirect here
    });

    if (!res?.ok) {
        throw new Error("Invalid email or password");
    }

    // Now get role and redirect
    const session = await (await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`)).json();
    const role = session?.user?.role;

    if (role === "ADMIN") {
        redirect("/admin");
    } else if (role === "USER") {
        redirect("/client");
    } else {
        redirect("/");
    }
}