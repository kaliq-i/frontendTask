import {IChoicesWithAttributes} from '../../helpers/interfaces'


const ResultNode = ({arrOfResults}:{arrOfResults:IChoicesWithAttributes[]}) => {
    return (
        <div>
            <div>{arrOfResults.length>1?"There is a Tie":"Winner"}</div>
            <hr/>
            {arrOfResults.map(({choiceName}) => {
                return <div key={choiceName}> {choiceName}! </div>
            } )}
            <p>Score = {arrOfResults[0]?.score.toFixed(2)}</p>
        </div>
    )
}

export default ResultNode