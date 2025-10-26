import React from 'react'
import Quote from './_AlphaVantage/_components/Quote'
import SymbolSearch from './_AlphaVantage/_components/SymbolSearch'
import TopGainersAndLosers from './_AlphaVantage/_components/TopGainersAndLosers'

const page = () => {
    return (
        <div className='flex flex-col p-8 gap-8'>
            <Quote symbol='NVDA' />
            <hr></hr>
            <SymbolSearch />
            <hr></hr>
            <TopGainersAndLosers />
        </div>

    )
}

export default page