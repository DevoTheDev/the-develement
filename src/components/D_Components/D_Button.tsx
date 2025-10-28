"use client";
import React, { ReactNode } from 'react'
import * as Lucide from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useMediaQuery from '@/app/(dashboard)/_components/_hooks/useMediaQuery';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClassName } from './D_types';

export type D_ButtonProps = Partial<ClassName> & {
  icon?: keyof typeof Lucide
  iconSize?: number
  label?: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  tooltip?: string
  onMobile?: 'hideIcon' | 'hideLabel'
  disableDefault?: boolean
  isLoading?: boolean
  download?: boolean,
  children?: ReactNode;
}

const D_Button = ({
  icon,
  label,
  href = '',
  onClick,
  tooltip,
  iconSize,
  onMobile,
  className,
  disableDefault,
  isLoading,
  download,
  children,
}: D_ButtonProps) => {


  const handleClick = (props: any) => {
    onClick && onClick(props)
  }

  const isMobile = useMediaQuery("(max-width: 495px)")
  const hideLabel = (onMobile == 'hideLabel') && isMobile
  const hideIcon = (onMobile == 'hideIcon') && isMobile
  const Icon = icon && Lucide[icon] as React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href={href} download={download ? true : false}>
          <div
            className={className ? cn(className, (!disableDefault ? 'transition-transform duration-250 hover:scale-85 hover:opacity-85' : '')) : ''}
            onClick={handleClick}
          >
            {isLoading ? (
              <>
                <Lucide.Loader2 className='animate-spin' />
              </>
            ) : (
              <>
                {Icon && !hideIcon && (
                  <Icon className={`h-${iconSize} w-${iconSize} opacity-85`} />
                )}
                {label && !hideLabel && (<span className='w-full'>{label}</span>)}
                {children && (<>{children}</>)}
              </>)
            }
          </div>
        </Link>
      </TooltipTrigger>
      {tooltip && (<TooltipContent className={`text-[0.7rem]`}>{tooltip}</TooltipContent>)}
    </Tooltip>
  )
}

export default D_Button