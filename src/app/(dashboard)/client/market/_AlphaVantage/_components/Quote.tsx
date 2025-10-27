'use client'

import React, { useState } from 'react'
import { useGetQuote } from '../_services/useQueries'
import D_Collapsible from '@/components/D_Components/D_Collapsible';
import D_Button from '@/components/D_Components/D_Button';
import * as AV_Params from "../_types/params";


type QuoteProps = AV_Params.QuoteParams

export default function Quote({ symbol }: QuoteProps) {
    const [open, setOpen] = useState(false);
    const { data, isLoading, error } = useGetQuote({ symbol })

    if (isLoading) return <div className="p-4">Loading quote…</div>
    if (error) return <div className="p-4 text-red-500">Error loading quote</div>

    const handleOpen = () => {
        setOpen(!open);
    }

    const quote = data?.['Global Quote'];

    return (
        <div>
            <D_Collapsible
                className='w-1/4 cursor-pointer'
                open={open}
                trigger={(
                    <div
                        className={`
                    flex justify-between items-center hover:bg-black/10 dark:hover:bg-white/5
                    transition-[clip-path,background] duration-300 ease-in-out
                    p-4
                    ${open
                                ? 'bg-white/20 [clip-path:inset(0%_0%_0%_0%_round_0.75rem_0.75rem_0_0)]'
                                : '[clip-path:inset(0%_0%_0%_0%_round_0.75rem)]'}
                  `}
                        onClick={handleOpen}>
                        <h2 className="font-semibold text-xl">{quote?.['01. symbol']}</h2>
                        <div className='flex gap-2'>
                            <div className="text-xl font-bold">${quote?.['05. price']}</div>
                            <D_Button
                                icon="ChevronRight"
                                className={`duration-300 ${open ? "rotate-90 text-green-500" : ""} px-4`}
                            />
                        </div>
                    </div>
                )}
                content={(
                    <>
                        <div
                            className={`
                        grid grid-cols-2 gap-3 text-sm
                        bg-black/10 dark:bg-white/10
                        p-4
                        `}
                        >
                            <Field label="Open" value={quote?.['02. open']} />
                            <Field label="High" value={quote?.['03. high']} />
                            <Field label="Low" value={quote?.['04. low']} />
                            <Field label="Prev Close" value={quote?.['08. previous close']} />
                            <Field label="Volume" value={quote?.['06. volume']} />
                            <Field label="Change" value={quote?.['09. change']} />
                            <Field label="Change %" value={quote?.['10. change percent']} />
                            <Field label="Latest Day" value={quote?.['07. latest trading day']} />
                        </div>
                        <D_Button
                            disableDefault
                            className='text-sm
                            bg-black/10 dark:bg-white/20
                            rounded-b-xl p-4 hover:underline text-center'
                            href={`/client/market/${quote?.['01. symbol']}`}
                            label='Detailed View' />
                    </>
                )}
            />
        </div>
    )
}

/* --- Small internal presentational component --- */
function Field({ label, value }: { label: string; value?: string }) {
    if (!value) return null
    return (
        <div className="flex flex-col">
            <span className="text-zinc-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    )
}
