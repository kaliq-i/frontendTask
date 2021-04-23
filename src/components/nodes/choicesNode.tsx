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
            <div>{choiceName}</div>
            <hr/>
            {attributes?.map(({attributeName,scaleMax, scaleMin, value}, index) => {
                return <div key={attributeName}>
                    <p>{attributeName}</p>
                    <input type="range" min={scaleMin} max={scaleMax} step={5} value={value} onChange={(event)=> updateAttributeValue(parseFloat(event.target.value), index)}/>
                    <p>Current Value = {value}</p> 
                    <hr/>
                     </div>
            })}
            <hr/>
            <div> Current Score = {score.toFixed(2)}</div>
        </div>
    )
}

export default ChoicesNode