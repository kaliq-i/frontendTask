
import { useState, useEffect } from 'react'
import {IAttributes, IChoicesWithAttributes} from '../helpers/interfaces'
import ReactFlow, {Background, MiniMap, Controls} from 'react-flow-renderer';

//nodes
import WeightingNode from './nodes/weightingNode'

const DecisionDashboard = ({choices,attributes}:{choices:string[], attributes:IAttributes[]}) => {
    const [choicesWithAttributes, setChoicesWithAttributes] = useState<IChoicesWithAttributes[]>()

    const appendAttributesToChoices = (choices:string[], attributes:IAttributes[]) => {
        // do not mutate. check if map mutates. 
        let arrWithBoth = choices.map((singleChoice) => {
           
            return {
               choiceName:singleChoice,
               attributes:attributes,
               get score() :number {
                   const copyOfAttributes =  [...this.attributes]
                   const sumOfWeightedAttributes = copyOfAttributes.reduce((acc,val)=> acc + (val.value! * val.weighting),0)
                return sumOfWeightedAttributes;
              }
           }
        })

        return arrWithBoth
    }

    useEffect(()=> {
        let arrWithBoth = appendAttributesToChoices(choices,attributes)
        setChoicesWithAttributes(arrWithBoth)
    }, [choices, attributes])
    
    const arrOfWeightingElements = attributes.map(({attributeName, weighting}:IAttributes) => {
        return {
            id:`${attributeName}-weighting`,
            type:'input',
            data: {label:<WeightingNode
                        attributeName={attributeName}
                        weighting={weighting}
                    />},
            position:{x:100, y:200}
        }
    })

    const elements = [
        ...arrOfWeightingElements
    ]

    return (
        <>
         <ReactFlow 
     elements={elements}
     onLoad={(reactFlowInstance)=> reactFlowInstance.fitView()}
     style={{width:"100%", height:"90vh"}}
     >
  <MiniMap/>
  <Controls/>
  <Background/>
  </ReactFlow>
        </>
    )
}

export default DecisionDashboard