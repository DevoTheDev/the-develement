"use client";
import React, { ReactNode } from 'react';
import DevButton from '@/components/ui/DevButton';
import { iconMap } from '@/components/ui/DevButton';

type Props = {
    children: ReactNode;
    button1?: {
        icon?: keyof typeof iconMap;
        iconSize?: number;
        onClick: (props: any) => any;
        tooltip?: string;
    };
    button2?: {
        icon?: keyof typeof iconMap;
        iconSize?: number;
        onClick: (props: any) => any;
        tooltip?: string;
    };
    className?: string;
};

const Card = (props: Props) => {
    const { children, button1, button2, className } = props;

    return (
        <div className={className}>
            {children}
            <div className='flex w-full justify-end gap-6' >
                <DevButton
                    type="icon"
                    subtype={button1?.icon}
                    onClick={button1?.onClick}
                    className='p-2 bg-background rounded-lg border-none  flex justify-center items-center shadow-sm'
                    tooltip={button1?.tooltip}
                    iconSize={button1?.iconSize || 4}
                />
                <DevButton
                    type="icon"
                    subtype={button2?.icon}
                    onClick={button2?.onClick}
                    className='p-2 bg-background rounded-lg border-none flex justify-center items-center shadow-sm'
                    tooltip={button2?.tooltip}
                    iconSize={button2?.iconSize || 4}
                />
            </div>
        </div>
    )
}

export default Card;