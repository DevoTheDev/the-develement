
import { ReactNode } from "react";
import Header from "../_components/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "$/generated/prisma";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
    const session = await auth();
    if (!session) redirect("/sign-in");
    if (session.user?.role === Role.ADMIN) redirect("/admin/foods-management/categories");

    return (
        <div className="">
            <Header {...session} />
            {children}
        </div>
    );
};

export default Layout;