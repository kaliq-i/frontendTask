import {IChoicesWithAttributes} from '../../helpers/interfaces'
import {attributeContext} from '../../helpers/allContexts'

const ChoicesNode = ({choiceName,attributes, score}:IChoicesWithAttributes) => {
    const updateAttributeValue = (newValue:number, index:number) => {

    }
    
    return (
        <div>
            <div>{choiceName}</div>
            <hr/>
            {attributes?.map(({attributeName,scaleMax, scaleMin, value}, index) => {
                const hundredth = (scaleMax!+ scaleMin!)/2
                return <div>
                    <p>{attributeName}</p>
                    <input type="range" min={scaleMin} max={scaleMax} step={hundredth} value={value} onChange={(event)=>updateAttributeValue(parseFloat(event.target.value), index)}/>
                     </div>
            })}
            <hr/>
            <div> Current Score = {score}</div>
        </div>
    )
}

export default ChoicesNode