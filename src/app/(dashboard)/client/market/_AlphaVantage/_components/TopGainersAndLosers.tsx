"use client";
import React, { useState } from 'react'
import { useGainersAndLosers } from '../_services/useQueries';
import { formatCurrency, formatPercentage, formatVolume } from '../../_lib/formattingMethods';
import { GainersLosers } from '../_types/responses';
import StockHighlight from '../../_components/StockHighlight';
import D_Collapsible from '@/components/D_Components/D_Collapsible';
import D_Button from '@/components/D_Components/D_Button';

type TopGainersAndLosersProps = {}
type TGAL_TableProps = {
    title: "Top Gainers" | "Top Losers" | "Most Active Trades",
    group?: GainersLosers[],
}

const TopGainersAndLosers = ({

}: TopGainersAndLosersProps) => {
    const { data } = useGainersAndLosers();

    const TGAL_Table: React.FC<TGAL_TableProps> = ({
        group,
        title
    }: TGAL_TableProps) => {
        const [open, setOpen] = useState(false);
        if (!group) return;

        const handleOpen = () => {
            setOpen(!open);
        }

        return (
            <D_Collapsible
                open={open}
                head={(
                    <div className='flex gap-2 cursor-pointer' onClick={handleOpen}>
                        <div className="text-xl">{title}</div>
                        <D_Button
                            icon="ChevronRight"
                            className={`duration-300 ${open ? "rotate-90 text-green-500" : ""} px-4`}
                        />
                    </div>
                )}
                body={(
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-neutral-500">
                            <thead className="text-xs text-neutral-500 uppercase bg-background">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Ticker</th>
                                    <th scope="col" className="px-4 py-3">Price</th>
                                    <th scope="col" className="px-4 py-3">Change</th>
                                    <th scope="col" className="px-4 py-3">Change %</th>
                                    <th scope="col" className="px-4 py-3">Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {group?.map((stock) => {
                                    const isNegative = stock.change_amount.toString().includes('-');
                                    return (<tr key={stock.ticker} className="border-b hover:bg-black/10 dark:hover:bg-white/10">
                                        <td className="px-4 py-2">
                                            <StockHighlight.Link className='hover:underline' symbol={stock.ticker} />
                                        </td>
                                        <td className="px-4 py-2">{formatCurrency(stock.price)}</td>
                                        <td className={`px-4 py-2 ${isNegative ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(stock.change_amount)}</td>
                                        <td className={`px-4 py-2 ${isNegative ? 'text-red-600' : 'text-green-600'}`}>{formatPercentage(stock.change_percentage)}</td>
                                        <td className="px-4 py-2">{formatVolume(stock.volume)}</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            />
        )
    }
    return (
        <div className="bg-background rounded-lg w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Top Gainers and Losers</h2>
            <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Metadata:</span> {data?.metadata}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Last Updated:</span>{' '}
                    {new Date(data?.last_updated || "").toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <TGAL_Table title='Top Gainers' group={data?.top_gainers} />
                <TGAL_Table title='Top Losers' group={data?.top_losers} />
                <TGAL_Table title='Most Active Trades' group={data?.most_actively_traded} />
            </div>
        </div>
    )
}

export default TopGainersAndLosers