"use client";
import React, { ReactNode } from 'react';
import D_Button, { D_ButtonProps } from '@/components/D_Components/D_Button';
import { Separator } from '@radix-ui/react-separator';

type Props = {
    children: ReactNode;
    title: string;
    button1?: D_ButtonProps;
    button2?: D_ButtonProps;
    className?: string;
};

const Card = (props: Props) => {
    const { children, button1, button2, className, title } = props;

    return (
        <div className={className}>
            <div>{title}</div>
            <Separator className='border-1' />
            {children}
            <div className='flex w-full justify-end gap-6' >
                <D_Button
                    {...button1}
                />
                <D_Button
                    {...button2}
                />
            </div>
        </div>
    )
}

export default Card;