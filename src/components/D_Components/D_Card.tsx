import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ClassName } from './D_types'

type D_CardProps = Partial<ClassName> & {
    header?: ReactNode
    body?: ReactNode
    footer?: ReactNode
}

const D_Card = ({
    header,
    body,
    footer,
    className,
}: D_CardProps) => {
    return (
        <div className={cn(className, 'flex flex-col justify-center items-center')} >
            {header}
            {body}
            {footer}
        </div>
    )
}

export default D_Card