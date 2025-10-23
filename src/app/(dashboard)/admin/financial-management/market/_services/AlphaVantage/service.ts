import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import {
    searchSymbols,
    fetchMarketStatus,
    fetchHistoricalOptions,
    fetchNewsSentiment,
} from '../AlphaVantage/queries';
import * as AV from '../../_types/types';
import { HistoricalOption } from '@/lib/alphaVantage-defaults/defaultHistoricalOptions';

// ===== SYMBOL SEARCH =====
export const useSearchSymbols = (params: AV.SearchParams) => {
    return useQuery({
        queryKey: ['search', params],
        queryFn: () => searchSymbols(params),
        enabled: !!params.keywords,
        staleTime: 15 * 60 * 1000, // 15 minutes
        retry: 1,
    });
};

// ===== MARKET STATUS =====
export const useMarketStatus = () => {
    return useQuery({
        queryKey: ['marketStatus'],
        queryFn: fetchMarketStatus,
        staleTime: 30 * 1000, // 30 seconds
        retry: 3,
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
    });
};

export const useHistoricalOptions = (params: AV.HistoricalOptionsParams): UseQueryResult<HistoricalOption[], Error> => {
    return useQuery({
        queryKey: ['historicalOptions', params],
        queryFn: () => fetchHistoricalOptions(params),
        enabled: !!params.symbol,
        staleTime: 60 * 60 * 1000,
        retry: 2,
    });
};

// ===== NEWS SENTIMENT =====
export const useNewsSentiment = (params: AV.NewsSentimentParams) => {
    return useQuery({
        queryKey: ['newsSentiment', params],
        queryFn: () => fetchNewsSentiment(params),
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};
