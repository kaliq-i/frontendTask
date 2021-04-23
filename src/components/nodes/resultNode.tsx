import {IChoicesWithAttributes} from '../../helpers/interfaces'


const ResultNode = ({arrOfResults}:{arrOfResults:IChoicesWithAttributes[]}) => {
    return (
        <div>
            <div className="font-bold text-lg">{arrOfResults.length>1?"There is a Tie":"Winner"}</div>
            <hr/>
            {arrOfResults.map(({choiceName}) => {
                return <div key={choiceName} className="font-bold text-xl mt-2 text-indigo-600"> {choiceName}! </div>
            } )}
        </div>
    )
}

export default ResultNode