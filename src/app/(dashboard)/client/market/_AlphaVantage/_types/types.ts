
export type AV_Params = QueryParams & (
    Intradaily |
    Daily |
    Weekly |
    Monthly |
    Quote |
    SymbolSearch |
    MarketStatus |
    HistoricalOptions |
    NewsSentiment |
    GainersAndLosers |
    InsiderTransactions |
    ListingStatus |
    AnalyticsFixedWindow
)

type QueryParams = {
    symbol?: string;
    datatype?: 'json' | 'csv';
}

type Intradaily = {
    function: 'TIME_SERIES_INTRADAY'
    interval: '1min' | '5min' | '15min' | '30min' | '60min';
    outputsize?: 'compact' | 'full';
    adjusted?: boolean;
    extended_hours?: boolean;
    month?: string; // Format: YYYY-MM, e.g., "2009-01"
}

type Daily = {
    function: 'TIME_SERIES_DAILY'
    outputsize?: 'compact' | 'full';
}

type Weekly = {
    function: 'TIME_SERIES_WEEKLY'
}

type Monthly = {
    function: 'TIME_SERIES_MONTHLY'
}

type Quote = {
    function: 'GLOBAL_QUOTE'
}

type SymbolSearch = {
    function: 'SYMBOL_SEARCH'
    keywords: string;
}

type MarketStatus = {
    function: 'MARKET_STATUS'
    date?: string // Format: YYYY-MM-DD
}

type HistoricalOptions = {
    function: 'HISTORICAL_OPTIONS'
    date?: string; // Format: YYYY-MM-DD
}

type NewsSentiment = {
    function: 'NEWS_SENTIMENT'
    topics?: string;
    timeFrom?: string; // Format: YYYYMMDDTHHMM
    timeTo?: string; // Format: YYYYMMDDTHHMM
    sort?: 'LATEST' | 'EARLIEST' | 'RELEVANCE';
    limit?: number;
    tickers?: string;
}

type GainersAndLosers = {
    function: 'TOP_GAINERS_LOSERS'
}

type InsiderTransactions = {
    function: 'INSIDER_TRANSACTIONS'
}

type ListingStatus = {
    function: 'LISTING_STATUS'
    state?: 'active' | 'delisted';
}

type AnalyticsFixedWindow = {
    function: 'ANALYTICS_FIXED_WINDOW'
    symbols: string;
    range: string;
    interval: string;
    calculations: string;
}
