
import {IAttributes} from '../../helpers/interfaces'
import {useContext} from 'react'
import {weightingContext} from '../../helpers/allContexts'

const WeightingNode = ({attributeName, weighting}:IAttributes  ) => {
    const weightingContextInstance = useContext(weightingContext)

    const updateWeighting = (newWeightingValue:string) => { 
        weightingContextInstance.updateWeighting(attributeName, parseFloat(newWeightingValue))
    }

    return (
        <div>
            <div>{attributeName}</div>
            <hr/>
            <input type="range" min={0.00} max={1.00} value={weighting} step={0.01} onChange={(event)=>updateWeighting(event.target.value)}  />
             <p>current value = {weighting}</p>
        </div>
    )
}

export default WeightingNode


