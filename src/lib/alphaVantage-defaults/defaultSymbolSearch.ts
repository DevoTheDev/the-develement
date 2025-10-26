import { AV_BadResponse, SymbolSearchResponse } from "@/app/(dashboard)/client/market/_AlphaVantage/_types/responses";
/*

Search Symbols
Route: /search

Method: GET

Query Parameters:

keywords (required): The search keywords (e.g., microsoft).

datatype (optional): The response format (e.g., json, csv).

*/

export type SearchResponse = AV_BadResponse & SymbolSearchResponse

export const defaultSymbolSearch: SearchResponse = {
    "Information": `Default Symbol Search queried with keyword 'microsoft'. `,
    "bestMatches": [
        {
            "1. symbol": "MSF0.FRK",
            "2. name": "MICROSOFT CORP. CDR",
            "3. type": "Equity",
            "4. region": "Frankfurt",
            "5. marketOpen": "08:00",
            "6. marketClose": "20:00",
            "7. timezone": "UTC+02",
            "8. currency": "EUR",
            "9. matchScore": "0.6429"
        },
        {
            "1. symbol": "MSFT",
            "2. name": "Microsoft Corporation",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "0.6154"
        },
        {
            "1. symbol": "0QYP.LON",
            "2. name": "Microsoft Corporation",
            "3. type": "Equity",
            "4. region": "United Kingdom",
            "5. marketOpen": "08:00",
            "6. marketClose": "16:30",
            "7. timezone": "UTC+01",
            "8. currency": "USD",
            "9. matchScore": "0.6000"
        },
        {
            "1. symbol": "MSF.DEX",
            "2. name": "Microsoft Corporation",
            "3. type": "Equity",
            "4. region": "XETRA",
            "5. marketOpen": "08:00",
            "6. marketClose": "20:00",
            "7. timezone": "UTC+02",
            "8. currency": "EUR",
            "9. matchScore": "0.6000"
        },
        {
            "1. symbol": "MSF.FRK",
            "2. name": "Microsoft Corporation",
            "3. type": "Equity",
            "4. region": "Frankfurt",
            "5. marketOpen": "08:00",
            "6. marketClose": "20:00",
            "7. timezone": "UTC+02",
            "8. currency": "EUR",
            "9. matchScore": "0.6000"
        },
        {
            "1. symbol": "MSFT34.SAO",
            "2. name": "Microsoft Corporation",
            "3. type": "Equity",
            "4. region": "Brazil/Sao Paolo",
            "5. marketOpen": "10:00",
            "6. marketClose": "17:30",
            "7. timezone": "UTC-03",
            "8. currency": "BRL",
            "9. matchScore": "0.6000"
        },
        {
            "1. symbol": "MSFT.TRT",
            "2. name": "Microsoft CDR (CAD Hedged)",
            "3. type": "Equity",
            "4. region": "Toronto",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-05",
            "8. currency": "CAD",
            "9. matchScore": "0.5143"
        }
    ]
}