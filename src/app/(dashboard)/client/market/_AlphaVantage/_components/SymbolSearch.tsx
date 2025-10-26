"use client";

import React, { useState } from "react";
import { useSearchSymbols } from "../_services/useQueries";

export type SymbolSearch = {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
};

export default function SymbolSearch() {
    const [search, setSearch] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [searchReady, setSearchReady] = useState('');

    const { data, isLoading } = useSearchSymbols({
        keywords: searchReady
    });

    console.log("FER", data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSubmitted(false); // reset view if user changes input
    };

    const submitSearch = () => {
        if (!search.trim()) return;
        setSearchReady(search)
        setSubmitted(true);
    };

    return (
        <div className="space-y-4">
            {/* Input + button */}
            <div className="flex gap-2">
                <input
                    className="border p-2 rounded w-1/4"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search symbol…"
                />
                <button
                    className="border px-4 rounded"
                    onClick={submitSearch}
                >
                    Search
                </button>
            </div>

            {/* Results */}
            {submitted && (
                <div>
                    {isLoading && <div>Searching…</div>}

                    {!isLoading && data?.bestMatches?.length === 0 && (
                        <div>No results.</div>
                    )}

                    {!isLoading &&
                        data?.bestMatches?.map((m: SymbolSearch) => (
                            <div key={m["1. symbol"]} className="p-2 border-b">
                                <div className="font-medium">{m["1. symbol"]}</div>
                                <div className="text-sm text-gray-500">{m["2. name"]}</div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
