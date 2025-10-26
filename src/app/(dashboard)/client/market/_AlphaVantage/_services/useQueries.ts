"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getQuote, searchSymbols, topGainersAndLosers } from "./queries";
import * as AV_Params from "../_types/params";
import { SearchResponse } from "@/lib/alphaVantage-defaults/defaultSymbolSearch";
import { QuoteResponse } from "@/lib/alphaVantage-defaults/defaultStockQuote";
import { GainersLosersResponse } from "@/lib/alphaVantage-defaults/defaultGainersAndLosers";

export function useGetQuote(params: AV_Params.QuoteParams): UseQueryResult<QuoteResponse, Error> {
    return useQuery({
        queryKey: ['quote', params],
        queryFn: () => getQuote(params),
        enabled: !!params.symbol,
    })
}

export function useSearchSymbols(params: AV_Params.SearchParams): UseQueryResult<SearchResponse, Error> {
    return useQuery({
        queryKey: ['search', params],
        queryFn: () => searchSymbols(params),
        enabled: !!params.keywords,
    })
}

export function useGainersAndLosers(): UseQueryResult<GainersLosersResponse, Error> {
    return useQuery({
        queryKey: ['gainers-losers'],
        queryFn: () => topGainersAndLosers()
    })
}
