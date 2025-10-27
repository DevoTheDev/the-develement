import { Role } from '$/generated/prisma';
import { auth } from '@/lib/auth';
import { Loader2Icon } from 'lucide-react'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const page = async (props: Props) => {
    const session = await auth();
    if (session?.user?.role === Role.ADMIN)
        redirect("/admin");
    if (session?.user?.role === Role.USER) redirect("/client");
    return (
        <div>

        </div>
    )
}

export default page