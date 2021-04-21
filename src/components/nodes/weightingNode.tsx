
import React from 'react'
import {IAttributes} from '../../helpers/interfaces'

const WeightingNode = ({attributeName, weighting}:IAttributes) => {

    const updateWeighting = (newWeightingValue:string) => {
       
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

//add an onChange listener

