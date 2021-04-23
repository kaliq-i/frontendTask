import {IChoicesWithAttributes} from '../../helpers/interfaces'
import {decisionContext} from '../../helpers/allContexts'
import {useContext} from 'react'

const ChoicesNode = ({choiceName,attributes, score}:IChoicesWithAttributes) => {
    
    const decisionContextInstance = useContext(decisionContext) 
    
    const updateAttributeValue = (newValue:number, index:number) => {
        decisionContextInstance.updateAttribute(newValue,index,choiceName)
    }
    
    return (
        <div>
            <div className="font-bold text-lg">{choiceName}</div>
            <hr/>
            {attributes?.map(({attributeName,scaleMax, scaleMin, value}, index) => {
                return <div key={attributeName} className="mt-2">
                    <p>{attributeName}: <span className="font-bold">{value}</span></p>
                    <input type="range" min={scaleMin} max={scaleMax} step={1} value={value} onChange={(event)=> updateAttributeValue(parseFloat(event.target.value), index)}/>
                    
                    <hr/>
                     </div>
            })}
            <hr/>
            <div className="mt-2 font-bold text-md">Score</div>
            <div className="font-bold text-lg text-indigo-600">{score.toFixed(2)}</div>
        </div>
    )
}

export default ChoicesNode