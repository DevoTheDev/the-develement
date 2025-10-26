import { auth } from "@/lib/auth";
import { Role } from "$/generated/prisma";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "../_components/Header";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
    const session = await auth();
    if (!session) redirect("/sign-in");
    if (session.user?.role === Role.USER) redirect("/client");
    return (
        <div className="">
            <Header {...session} />
            {children}
        </div>
    );
};

export default Layout;