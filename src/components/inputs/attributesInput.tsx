import {useState} from "react"
import {IAttributes, IInputAttributes} from '../../helpers/interfaces'

const AttributesInput = ({attributes, addAttribute, removeAttribute, updateDisplay}:IInputAttributes) => {
    const [error, setError] = useState<string|null>()    

    const handleSubmitAttribute = (e:React.FormEvent) => {
        e.preventDefault()

        const target = e.target as HTMLFormElement;
        const [nameInput, scaleMinInput, scaleMaxInput, weightingInput] = target
        const name = nameInput as HTMLInputElement
        const scaleMin = scaleMinInput as HTMLInputElement
        const scaleMax = scaleMaxInput as HTMLInputElement
        const weighting = weightingInput as HTMLInputElement
        
        // The scale has a min and max value
        const maxIsLargerThanMin = (parseFloat(scaleMax.value) > parseFloat(scaleMin.value))
        if (!maxIsLargerThanMin) {
            setError("The minimum value of your scale has to be lower than your max")
            return;
        }

        // we dont want to have 2 attributes with same name
        const isUniqueAttribute = (attributes.some(e => e.attributeName === name.value) === true)
        if (isUniqueAttribute) {
            setError("This Attribute Name already exists, please use a unique name")
            return;
        }


        // I am assigning a default value for this attribute here,
        // user will be able to change the value later on with onChange 
        const midPoint = (parseFloat(scaleMax.value) + parseFloat(scaleMin.value))/2            
        const newAttribute = {
            attributeName: name.value,
            scaleMin:scaleMin.value,
            scaleMax:scaleMax.value,
            value:midPoint,
            weighting:weighting.value
        }

        addAttribute(newAttribute)
        setError(null)
    }

    const handleRemoveAttribute = (index:number) => {
        removeAttribute(index)
    }

    const toNextPage = () => {
        if (attributes.length === 0) {
            setError("please create at least 1 Attribute")
            return;
        }
        setError(null)
        updateDisplay("decisionDashboard")
    }

    const toPreviousPage = () => {
        setError(null)
        updateDisplay("inputChoices")
    }
    
    return (
        <>
            
        <div>
            <h1> Please create some Attributes</h1>
            <form onSubmit={(event) => handleSubmitAttribute(event)}>
                <input type="text" placeholder="name" className="border" required={true}/> <br/>
                <input type="number" placeholder="min" className="border" min={0} required={true}/> <br/>
                <input type="number" placeholder="max" className="border" required={true}/> <br/>
                <input type="number" placeholder="weighting" min={0.00} max={1.00} step={0.01} required={true} className="border w-20"/> <br/>
                <input type="submit"/>
            </form>
        </div>

        <div>
            {attributes.map(({attributeName,scaleMin, scaleMax,weighting}:IAttributes, index:number) => {
                return (
                <div key={index} className="w-auto mb-4 h-auto m-5 flex items-center px-5 justify-center flex-col border border-opacity-100 text-base font-medium rounded-md bg-white shadow-md  md:text-lg">
                    <p>Name of Attribute = {attributeName}</p>
                    <p>Scale Minimum Value = {scaleMin}</p>
                    <p>Scale Maximum Value = {scaleMax}</p>
                    <p>Weighting = {weighting}</p>
                    <button onClick={() => handleRemoveAttribute(index)} className="border">delete</button>
                </div>
                )
            })}
        </div>
        
         {error && <div>{error}</div>}
         <button className="border" onClick={() => toPreviousPage()}>Back</button>
         <button className="border" onClick={() => toNextPage()}>Next</button>

    </>

    )
}

export default AttributesInput