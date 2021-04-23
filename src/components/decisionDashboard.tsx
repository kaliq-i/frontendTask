
import { useState, useEffect } from 'react'
import {IAttributes, IChoicesWithAttributes,IEdge}  from '../helpers/interfaces'
import ReactFlow, {Background, MiniMap, Controls, ReactFlowProps} from 'react-flow-renderer';
import {decisionContext} from '../helpers/allContexts'
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
                   const sumOfWeightedAttributes = [...this.attributes].reduce((acc,val)=> acc + (val.value! * val.weighting),0)
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
    const createReactFlowElements = () :ReactFlowProps["elements"]  => {
        const weightingNodesArr = createWeightingNodesArr()
        const resultNodeArr = createResultNodeArr()
        const choicesNodeArr = createChoicesNodeArr()
        const choicesResultLinksArr = createChoicesResultLinksArr(choicesNodeArr,resultNodeArr)
        const weightingChoicesLinksArr = createWeightingChoicesLinksArr(choicesNodeArr, weightingNodesArr)
        const allReactFlowElements:any = weightingNodesArr.concat(choicesNodeArr, resultNodeArr) //edges not recognised as elements, why?
        const elementsAndEdges = allReactFlowElements.concat(choicesResultLinksArr, weightingChoicesLinksArr)
        console.log(elementsAndEdges)
        return elementsAndEdges
    }
    const createWeightingNodesArr = () => {

        const arrOfWeightingNodes = choicesWithAttributes[0].attributes!.map(({attributeName, weighting}:IAttributes, index:number) => {
            return {
                id:`weighting${index+1}`,
                type:'input',
                data: {label: 
                <decisionContext.Provider value={valueForContextAPI} key={attributeName}>
                    <WeightingNode
                        attributeName={attributeName}
                        weighting={weighting}
                    />
                </decisionContext.Provider>
                            },
                position:{x:index*200, y:200}
            }
        })
    
       return arrOfWeightingNodes 

    }
    const createChoicesNodeArr = () => {
        const arrOfChoiceNodes = choicesWithAttributes.map((choice,index) => {
            return {
                id:`choice${index+1}`,
                type:'default',
                data: {label:
                    <decisionContext.Provider value={valueForContextAPI} key={choice.choiceName}>
                        <ChoicesNode
                            choiceName={choice.choiceName}
                            attributes={choice.attributes}
                            score={choice.score}
                        />
                     </decisionContext.Provider>

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

    const createChoicesResultLinksArr = (choicesArr:ReactFlowProps["elements"], resultsArr:ReactFlowProps["elements"]) :IEdge[] => {
        
        const choicesResultLinks = choicesArr.map((choice) => {
            return {
                id:`${choice.id}-result`, 
                type:"smoothstep", 
                source:`${choice.id}`, 
                target:"result", 
                animated:true}

        })

        return choicesResultLinks
    }

    const createWeightingChoicesLinksArr = (choicesArr:ReactFlowProps["elements"], WeightingArr:ReactFlowProps["elements"]) :IEdge[] => {
        
        const allLinksAllWeighting = WeightingArr.map((singleWeighting) => {
            const linksFor1Weighting = []
            
            for (let i=1; i<choicesArr.length+1; i++) {
                
                const singleLink = {
                    id:`${singleWeighting.id}-choice${i}`,
                    type:"smoothstep",
                    source:`${singleWeighting.id}`,
                    target:`choice${i}`,
                    animated:true    
                }
                linksFor1Weighting.push(singleLink)
            }
            return linksFor1Weighting
            
        })
        return allLinksAllWeighting.flat()
    }
    

    const cloneAndRestoreGetters = () => {
        const copyOfChoicesWithAttributes:IChoicesWithAttributes[] =  cloneDeep(choicesWithAttributes)//solve Mutation
        for (let choice of copyOfChoicesWithAttributes) {
            Object.defineProperty(choice,'score',   // add getter
                {
                    get: function() {
                        const sumOfWeightedAttributes = [...this.attributes].reduce((acc,val)=> acc + (val.value! * val.weighting),0)
                     return sumOfWeightedAttributes
                   }
                    }
            )} 
        return copyOfChoicesWithAttributes    
    }
    
    const updateAttributeInAChoice = (newValue:number,index:number, IncomingChoiceName:string) => {
        const copyOfChoicesWithAttributes:IChoicesWithAttributes[] =  cloneAndRestoreGetters()
        const indexOfChoice = copyOfChoicesWithAttributes.findIndex((choice) => choice.choiceName === IncomingChoiceName)
        copyOfChoicesWithAttributes[indexOfChoice].attributes![index].value = newValue
        setChoicesWithAttributes(copyOfChoicesWithAttributes)
    }

    const updateWeightingInAllChoices = (incomingAttrName:string, newWeightingValue:number) => {
        const copyOfChoicesWithAttributes:IChoicesWithAttributes[] =  cloneAndRestoreGetters() //solve Mutation
        const index:number = copyOfChoicesWithAttributes[0].attributes!.findIndex((attr) => attr.attributeName === incomingAttrName)
        for (let choice of copyOfChoicesWithAttributes) {
            choice.attributes![index].weighting = newWeightingValue
        }
        setChoicesWithAttributes(copyOfChoicesWithAttributes)
    }

    

    const valueForContextAPI = {
        updateAttribute: updateAttributeInAChoice,
        updateWeighting: updateWeightingInAllChoices
    }



    

   


    return (
        <>
        {choicesWithAttributes.length > 0 &&
            <ReactFlow 
                elements={createReactFlowElements()}
                onLoad={(reactFlowInstance)=> reactFlowInstance.fitView()}
                style={{width:"100%", height:"90vh"}}
                nodesDraggable={false}
            >
                
            <MiniMap/>
            <Controls/>
            <Background/>
            </ReactFlow>}
        </>
    )
}

export default DecisionDashboard