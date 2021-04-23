// add optionality for reusability 
export type IAttributes = {
    attributeName: string,
    scaleMin?:number,
    scaleMax?:number,
    value?:number,
    weighting:number,
    [propName:string]:any // Make this less strict
}


export interface IInputChoices {
    choices: string[],
    addChoice: Function,
    removeChoice:Function,
    updateDisplay:Function
}

export interface IInputAttributes {
    attributes: IAttributes[],
    addAttribute: Function,
    removeAttribute:Function,
    updateDisplay:Function
}

export interface IChoicesWithAttributes {
    choiceName:string,
    attributes?: IAttributes[],
    score:number
}

export interface IUpdateDecision {
    updateWeighting:Function,
    updateAttribute:Function 
}

export interface IEdge {
    id:string,
    type:string,
    source:string,
    target:string,
    animated?:boolean
}

