import { ThemeToggle } from '@/app/(dashboard)/_components/theme-toggle'
import React from 'react'
import D_Avatar from '@/components/D_Components/D_Avatar'
import { Session } from 'next-auth'

type UserQuickAccessProps = {
    session: Session
}


const UserQuickAccess = ({
    session
}: UserQuickAccessProps) => {

    return (
        <div className="flex items-center justify-between">
            <ThemeToggle />
            <D_Avatar session={session} />
        </div>
    )
}

export default UserQuickAccess