import {Fragment, useState} from 'react';
import {IAttributes} from './helpers/interfaces'

//Components
import ChoicesInput from './components/inputs/choicesInput'
import AttributesInput from './components/inputs/attributesInput'
import DecisionDashboard from './components/decisionDashboard';


function App() {
const [choices, setChoices] = useState<string[]>([])
const [attributes, setAttributes] = useState<IAttributes[]>([])
const [display, setDisplay] = useState("inputChoices")

// Manipulating choices
const addChoice = (newChoice:string) => {
    setChoices(currentChoices => ([...currentChoices,newChoice]))
}
const removeChoice = (indexOfChoice:number) => {
    let copyOfChoices = [...choices]
    copyOfChoices.splice(indexOfChoice,1)
    setChoices(copyOfChoices)
}

//Manipulating Attributes
const addAttribute = (newAttribute:IAttributes) => {
  setAttributes(currentAttributes => [...currentAttributes, newAttribute])
}
const removeAttribute = (indexOfAttribute:number) => {
  let copyOfAttributes = [...attributes]
  copyOfAttributes.splice(indexOfAttribute,1)
  setAttributes(copyOfAttributes)
}

//changing Display 
const updateDisplay = (nextDisplay:string) => {
  setDisplay(currentDisplay => nextDisplay )
}


let activeDisplay: JSX.Element | null = null 

if (display === "inputChoices") {
  activeDisplay = <ChoicesInput 
  choices={choices}
  addChoice={addChoice}
  removeChoice={removeChoice}
  updateDisplay={updateDisplay}/>
}

if (display === "inputAttributes") {
  activeDisplay = <AttributesInput
  attributes={attributes}
  addAttribute={addAttribute}
  removeAttribute={removeAttribute}
  updateDisplay={updateDisplay}/>
}

if (display === 'decisionDashboard') {
  activeDisplay = 
  <DecisionDashboard
  attributes={attributes}
  choices={choices}
  />
}

  return (
   <Fragment>
      {activeDisplay}
   </Fragment>
  );
}

export default App;
