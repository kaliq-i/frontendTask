// add optionality for reusability 
export interface IAttributes {
    attributeName: string,
    scaleMin?:number,
    scaleMax?:number,
    value?:number,
    weighting:number
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
    attributes: IAttributes[],
    score:number
}
