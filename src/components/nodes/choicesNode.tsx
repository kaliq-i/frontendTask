import {IChoicesWithAttributes} from '../../helpers/interfaces'
import {attributeContext} from '../../helpers/allContexts'
import {useContext} from 'react'

const ChoicesNode = ({choiceName,attributes, score}:IChoicesWithAttributes) => {
    const attributeContextInstance = useContext(attributeContext) 
    
    const updateAttributeValue = (newValue:number, index:number) => {
         attributeContextInstance.updateAttribute(newValue,index,choiceName)
    }
    
    return (
        <div>
            <div>{choiceName}</div>
            <hr/>
            {attributes?.map(({attributeName,scaleMax, scaleMin, value}, index) => {
                const hundredth = (scaleMax!+ scaleMin!)/100
                return <div key={index}>
                    <p>{attributeName}</p>
                    <input type="range" min={scaleMin} max={scaleMax} step={hundredth} value={value} onChange={(event)=> updateAttributeValue(parseFloat(event.target.value), index)}/>
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