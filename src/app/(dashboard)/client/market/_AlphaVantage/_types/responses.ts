export type AV_BadResponse = {
    "Information": string
}

export type GoodQuoteResponse = {
    "Global Quote": {
        "01. symbol": string;
        "02. open": string;
        "03. high": string;
        "04. low": string;
        "05. price": string;
        "06. volume": string;
        "07. latest trading day": string; // Format: YYYY-MM-DD
        "08. previous close": string;
        "09. change": string;
        "10. change percent": string;     // e.g., "-7.2887%"
    };
}

export interface SymbolSearchResponse {
    "bestMatches": {
        "1. symbol": string;
        "2. name": string;
        "3. type": string;
        "4. region": string;
        "5. marketOpen": string;     // e.g., "08:00"
        "6. marketClose": string;    // e.g., "20:00"
        "7. timezone": string;       // e.g., "UTC+02"
        "8. currency": string;       // e.g., "EUR"
        "9. matchScore": string;     // Represented as string e.g., "0.6429"
    }[];
}

export type GainersLosers = {
    ticker: string,
    price: number | string,
    change_amount: number | string,
    change_percentage: number | string,
    volume: number | string
}

export interface TopGainersAndLosers {
    "metadata": string,
    "last_updated": string,
    "top_gainers": GainersLosers[],
    "top_losers": GainersLosers[],
    "most_actively_traded": GainersLosers[],
}