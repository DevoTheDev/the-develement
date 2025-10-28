import React, { ReactNode } from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Role } from '$/generated/prisma'

type LayoutProps = {
    children: ReactNode
}

const layout = async ({
    children,
}: LayoutProps) => {

    const session = await auth();

    if (session?.user.role == Role.ADMIN) {
        redirect("/admin")
    } else if (session?.user.role == Role.USER) {
        redirect("/client")
    }

    return (
        <div>{children}</div>
    )
}

export default layout