
import { useState, useEffect } from 'react'
import {IAttributes, IChoicesWithAttributes} from '../helpers/interfaces'
import ReactFlow, {Background, MiniMap, Controls, ReactFlowProps} from 'react-flow-renderer';
import {attributeContext} from '../helpers/allContexts'
import cloneDeep from 'lodash.clonedeep'

//nodes
import WeightingNode from './nodes/weightingNode'
import ResultNode from './nodes/resultNode';
import ChoicesNode from './nodes/choicesNode'

const DecisionDashboard = ({choices,attributes}:{choices:string[], attributes:IAttributes[]}) => {
    const [choicesWithAttributes, setChoicesWithAttributes] = useState<IChoicesWithAttributes[]>([])
    
    const appendAttributesToChoices = (choices:string[], attributes:IAttributes[]) => {
        
        let arrWithBoth = choices.map((singleChoice) => {
           
            return {
               choiceName:singleChoice,
               attributes:cloneDeep(attributes), // to avoid mutation 
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
    

    // the first time this runs - the state variable choicesWithAttributes will undefined 
    const createReactFlowElements = () :ReactFlowProps["elements"] => {
        const weightingNodesArr = createWeightingNodesArr()
        const resultNodeArr = createResultNodeArr()
        const choicesNodeArr = createChoicesNodeArr()
        const allReactFlowElements = weightingNodesArr.concat(choicesNodeArr, resultNodeArr)
        return allReactFlowElements
    }
    const createWeightingNodesArr = () => {

        const arrOfWeightingNodes = attributes.map(({attributeName, weighting}:IAttributes, index:number) => {
            return {
                id:`${attributeName}-weighting`,
                type:'input',
                data: {label:<WeightingNode
                    attributeName={attributeName}
                    weighting={weighting}
                    />
                            },
                position:{x:index*200, y:200}
            }
        })

       return arrOfWeightingNodes 

    }
    const createChoicesNodeArr = () => {
        const arrOfChoiceNodes = choicesWithAttributes.map((choice,index) => {
            return {
                id:`${choice.choiceName}-choice`,
                type:'default',
                data: {label:
                    <attributeContext.Provider value={valueForContextAPI}>
                        <ChoicesNode
                            choiceName={choice.choiceName}
                            attributes={choice.attributes}
                            score={choice.score}
                        />
                     </attributeContext.Provider>

                            },
                position:{x:index*200, y:300}
            }
        })


       return arrOfChoiceNodes 

       }
    const createResultNodeArr = () => {
        const copyOfChoicesWithAttributes = choicesWithAttributes.slice() //avoid mutation
        copyOfChoicesWithAttributes.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0))
        const ChoiceWithLargestScore = copyOfChoicesWithAttributes[copyOfChoicesWithAttributes.length-1]
        // if there is tie, I want to display names of all choices with largest scores
        const largestScores = copyOfChoicesWithAttributes.filter((choice) => choice.score === ChoiceWithLargestScore.score)
        const namesAndScores = largestScores.map((choice) => {
            return { 
                choiceName:choice.choiceName,
                score:choice.score        
            }
        })

        return [ {
            id:`result`,
                type:'output',
                data: {label:<ResultNode
                    arrOfResults={namesAndScores}
                    />
                            },
                position:{x:100, y:500}
        }]
        
            
    }
    

    const updateAttributeInAChoice = (newValue:number,index:number, IncomingChoiceName:string) => {
        const copyOfChoicesWithAttributes:IChoicesWithAttributes[] =  cloneDeep(choicesWithAttributes)//solve Mutation
        for (let choice of copyOfChoicesWithAttributes) {
            Object.defineProperty(choice,'score',   // add getter
                {
                    get: function() {
                        const copyOfAttributes =  [...this.attributes]
                        const sumOfWeightedAttributes = copyOfAttributes.reduce((acc,val)=> acc + (val.value! * val.weighting),0)
                     return sumOfWeightedAttributes
                   }
                    }
            )} 
         const indexOfChoice = copyOfChoicesWithAttributes.findIndex((choice) => choice.choiceName === IncomingChoiceName)
        copyOfChoicesWithAttributes[indexOfChoice].attributes![index].value = newValue
        setChoicesWithAttributes(copyOfChoicesWithAttributes)
    }
    
    const valueForContextAPI = {
        updateAttribute: updateAttributeInAChoice
    }


    const elementsForReactFlow = createReactFlowElements()

    

   


    return (
        <>
            <ReactFlow 
                elements={elementsForReactFlow}
                onLoad={(reactFlowInstance)=> reactFlowInstance.fitView()}
                style={{width:"100%", height:"90vh"}}
                nodesDraggable={false}
            >
                
            <MiniMap/>
            <Controls/>
            <Background/>
            </ReactFlow>
        </>
    )
}

export default DecisionDashboard