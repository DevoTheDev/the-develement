import axios from 'axios';
import * as AV_Params from "../_types/params";
import { defaultStockQuote, QuoteResponse } from '@/lib/alphaVantage-defaults/defaultStockQuote';
import { defaultSymbolSearch, SearchResponse } from '@/lib/alphaVantage-defaults/defaultSymbolSearch';
import { defaultGainersAndLosers } from '@/lib/alphaVantage-defaults/defaultGainersAndLosers';

const API_KEY = 'PL8HXL9DJH4ZSCQU'
const good_response = { "Information": 'Successful call to Alpha Vantage API.' }
const base_url = `https://www.alphavantage.co/query?`

const DataTypeError = (datatype: 'json' | 'csv') => {
    if (datatype && !['json', 'csv'].includes(datatype)) {
        throw new Error('Invalid datatype. Supported values: json, csv.');
    } else return;
}


export const getQuote = async ({
    symbol,
    datatype = 'json',
}: AV_Params.QuoteParams): Promise<QuoteResponse> => {

    if (!symbol) {
        throw new Error('Symbol is a required parameter.');
    }
    DataTypeError(datatype)

    const params = new URLSearchParams({
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY
    });

    const url = `${base_url}${params.toString()}`;
    const response: { data: QuoteResponse } = await axios.get(url);
    if (response.data?.Information) {
        return { ...defaultStockQuote };
    }

    return { ...response.data, ...good_response };
}

export const searchSymbols = async ({
    keywords,
    datatype = 'json'
}: AV_Params.SearchParams): Promise<SearchResponse> => {
    if (!keywords) {
        throw new Error('Keywords is a required parameter.');
    }
    DataTypeError(datatype)

    const params = new URLSearchParams({
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: API_KEY
    });

    const url = `${base_url}${params.toString()}`;
    const response: { data: SearchResponse } = await axios.get(url);
    if (response.data?.Information) {
        return { ...defaultSymbolSearch };
    }

    return { ...response.data, ...good_response };
}

export const topGainersAndLosers = async () => {
    const params = new URLSearchParams({
        function: 'TOP_GAINERS_LOSERS',
        apikey: API_KEY
    });

    const url = `${base_url}${params.toString()}`;
    const response = await axios.get(url);
    if (response.data?.Information) {
        return { ...defaultGainersAndLosers };
    }

    return { ...response.data, ...good_response };
}