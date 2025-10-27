import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "../_components/Header";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
    const session = await auth();
    if (!session) redirect("/sign-in");
    return (
        <div className="">
            <Header {...session} />
            {children}
        </div>
    );
};

export default Layout;