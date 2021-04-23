
import {IAttributes} from '../../helpers/interfaces'
import {useContext} from 'react'
import {decisionContext} from '../../helpers/allContexts'

const WeightingNode = ({attributeName, weighting}:IAttributes  ) => {
   
    const decisionContextInstance = useContext(decisionContext)

    const updateWeighting = (newWeightingValue:string) => { 
        decisionContextInstance.updateWeighting(attributeName, parseFloat(newWeightingValue))
    }

    return (
        <div>
            <div className="font-bold text-lg">{attributeName}</div>
            <hr/>
            <p className="mt-2">Weighting: <span className="font-bold">{weighting}</span></p>
            <input type="range" min={0.00} max={1.00} value={weighting} step={0.01} onChange={(event)=>updateWeighting(event.target.value)}  />
             
        </div>
    )
}

export default WeightingNode


