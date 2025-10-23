
import HistoricalOptions from './_components/HistoricalOptions';

type Props = {}


const page = (props: Props) => {
    return (
        <div className="mx-[10%] my-[2%]">
            <HistoricalOptions symbol='MSFT' date='2014-01-07' />
        </div>
    )
}

export default page