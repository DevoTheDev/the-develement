"use client";
import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';
import { defaultHistoricalOptions, HistoricalOption } from '@/lib/alphaVantage-defaults/defaultHistoricalOptions';
import { cn } from '@/lib/utils';
import { HistoricalOptionsParams } from '../_types/types';
import { useHistoricalOptions } from '../_services/AlphaVantage/service';

const HistoricalOptions = ({
    symbol,
    date,
}: HistoricalOptionsParams) => {

    const ITEMS_PER_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const data = defaultHistoricalOptions.data;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const handlePageUpdate = (action: 'next' | 'prev' | number) => {
        let newPage = currentPage;

        if (action === 'next') {
            newPage = Math.min(currentPage + 1, totalPages);
        } else if (action === 'prev') {
            newPage = Math.max(currentPage - 1, 1);
        } else if (typeof action === 'number') {
            newPage = Math.max(1, Math.min(action, totalPages));
        }

        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Mobile-friendly header with page info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-foreground">Historical Options</h1>
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} • {totalItems} total contracts
                </div>
            </div>

            {/* Mobile-first cards layout, desktop table */}
            <div className="block md:hidden">
                {/* Mobile Cards */}
                <div className="space-y-4">
                    {currentData.map((item) => (
                        <div
                            key={item.contractID}
                            className="bg-background border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Contract
                                    </span>
                                    <span className="font-mono text-sm truncate">
                                        {item.contractID}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Type
                                    </span>
                                    <span
                                        className={cn(
                                            "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                                            item.type === 'call'
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                        )}
                                    >
                                        {item.type.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Strike
                                    </span>
                                    <span className="font-mono">${item.strike}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Expiration
                                    </span>
                                    <span className="font-mono">{item.expiration}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-border">
                                <div>
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Mark
                                    </span>
                                    <span className="font-mono text-base font-semibold">${item.mark}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Volume
                                    </span>
                                    <span className="font-mono">{item.volume}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-3">
                                <div>
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        Open Interest
                                    </span>
                                    <span className="font-mono">{item.open_interest}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                                        IV
                                    </span>
                                    <span className="font-mono">{(Number(item.implied_volatility) * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Table - hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-background border border-border rounded-lg">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Contract
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Symbol
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Expiration
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Strike
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Last
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Mark
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Bid
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Ask
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Volume
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Open Interest
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Implied Volatility
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {currentData.map((item) => (
                            <tr
                                key={item.contractID}
                                className="hover:bg-black/10 cursor-pointer transition-colors "
                            >
                                <td className="px-4 py-4 text-sm font-mono truncate max-w-[200px]">
                                    {item.contractID}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium">{item.symbol}</td>
                                <td className="px-4 py-4 text-sm font-mono">{item.expiration}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">${item.strike}</td>
                                <td className="px-4 py-4">
                                    <span
                                        className={cn(
                                            "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                                            item.type === 'call'
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                        )}
                                    >
                                        {item.type.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-sm font-mono text-right">${item.last}</td>
                                <td className="px-4 py-4 text-sm font-semibold font-mono text-right">${item.mark}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">${item.bid}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">${item.ask}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">{item.volume}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">{item.open_interest}</td>
                                <td className="px-4 py-4 text-sm font-mono text-right">
                                    {(Number(item.implied_volatility) * 100).toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination - always visible */}
            <div className="pt-6 border-t border-border">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    updatePage={handlePageUpdate}
                    className="justify-center"
                    scrollToTopOnPaginate={false}
                />
            </div>
        </div>
    );
};

export default HistoricalOptions;