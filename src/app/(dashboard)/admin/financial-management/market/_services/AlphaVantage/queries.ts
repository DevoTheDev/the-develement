"use server"
import axios from 'axios';
import * as AV from '../../_types/types';
import { HistoricalOption } from '@/lib/alphaVantage-defaults/defaultHistoricalOptions';

const API_KEY = 'PL8HXL9DJH4ZSCQU';

/**
 * Searches for symbols based on keywords using Alpha Vantage API.
 * @param params - Parameters for the symbol search request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing.
 */
export async function searchSymbols({
    keywords,
    datatype = 'json'
}: AV.SearchParams): Promise<any> {
    if (!keywords) {
        throw new Error('Keywords is a required parameter.');
    }
    if (datatype && !['json', 'csv'].includes(datatype)) {
        throw new Error('Invalid datatype. Supported values: json, csv.');
    }

    const params = new URLSearchParams({
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: API_KEY
    });

    if (datatype) {
        params.append('datatype', datatype);
    }

    const url = `https://www.alphavantage.co/query?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
}

/**
 * Fetches current market status using Alpha Vantage API.
 * @returns The API response data (JSON).
 * @throws Error if the request fails.
 */
export async function fetchMarketStatus(): Promise<any> {
    const params = new URLSearchParams({
        function: 'MARKET_STATUS',
        apikey: API_KEY
    });

    const url = `https://www.alphavantage.co/query?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
}

/**
 * Fetches historical options data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the historical options request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
export async function fetchHistoricalOptions({
    symbol,
    date,
    datatype = 'json'
}: AV.HistoricalOptionsParams): Promise<any> {
    if (!symbol) {
        throw new Error('Symbol is a required parameter.');
    }
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Date must be in YYYY-MM-DD format (e.g., 2023-01-01).');
    }
    if (datatype && !['json', 'csv'].includes(datatype)) {
        throw new Error('Invalid datatype. Supported values: json, csv.');
    }

    const params = new URLSearchParams({
        function: 'HISTORICAL_OPTIONS',
        symbol,
        apikey: API_KEY
    });

    if (date) {
        params.append('date', date);
    }
    if (datatype) {
        params.append('datatype', datatype);
    }

    const url = `https://www.alphavantage.co/query?${params.toString()}`;
    const response = await axios.get(url);
    // ✅ Transform to correct structure
    if (datatype === 'json' && response.data?.data) {
        return response.data as HistoricalOption[];
    }

    throw new Error('Invalid API response format');
}

/**
 * Fetches news sentiment data for specified tickers or topics using Alpha Vantage API.
 * @param params - Parameters for the news sentiment request.
 * @returns The API response data (JSON).
 * @throws Error if parameters are invalid.
 */
export async function fetchNewsSentiment({
    tickers,
    topics,
    timeFrom,
    timeTo,
    sort = 'LATEST',
    limit = 50
}: AV.NewsSentimentParams): Promise<any> {
    if (timeFrom && !/^\d{8}T\d{4}$/.test(timeFrom)) {
        throw new Error('timeFrom must be in YYYYMMDDTHHMM format (e.g., 20230101T0000).');
    }
    if (timeTo && !/^\d{8}T\d{4}$/.test(timeTo)) {
        throw new Error('timeTo must be in YYYYMMDDTHHMM format (e.g., 20230101T0000).');
    }
    if (!['LATEST', 'EARLIEST', 'RELEVANCE'].includes(sort)) {
        throw new Error('Invalid sort. Supported values: LATEST, EARLIEST, RELEVANCE.');
    }
    if (limit < 1 || limit > 1000) {
        throw new Error('Limit must be between 1 and 1000.');
    }

    const params = new URLSearchParams({
        function: 'NEWS_SENTIMENT',
        apikey: API_KEY
    });

    if (tickers) {
        params.append('tickers', tickers);
    }
    if (topics) {
        params.append('topics', topics);
    }
    if (timeFrom) {
        params.append('time_from', timeFrom);
    }
    if (timeTo) {
        params.append('time_to', timeTo);
    }
    params.append('sort', sort);
    params.append('limit', limit.toString());

    const url = `https://www.alphavantage.co/query?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
}
