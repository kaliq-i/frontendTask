import React, {useState} from "react"
import {IInputChoices} from '../../helpers/interfaces'

const ChoicesInput = ({choices, addChoice, removeChoice, updateDisplay}:IInputChoices) => {

    const [error, setError] = useState<string| null>()    

    const handleSubmitChoice = (e:React.FormEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement;
    const input = target[0] as HTMLInputElement

    const isUniqueChoice = (choices.some(e => e === input.value) === true)
    if (isUniqueChoice) {
        setError("This choice Name already exists, please use a unique name")
        return;
    }

    addChoice(input.value)
    setError(null)
    }

    const handleRemoveChoice = (index:number) => {
        removeChoice(index)
    }   

    const toNextPage = () => {
        if (choices.length <= 1) {
            setError("please create at least 2 choices")
            return;
        }
        setError(null)
        updateDisplay("inputAttributes")
    }

    return (
        <>
            
            <div>
                <h1> Please create some choices</h1>
                <form onSubmit={(event) => handleSubmitChoice(event)}>
                    <input type="text" className="border" required={true}/>
                    <input type="submit"/>
                </form>
            </div>

            <div>
                {choices.map((element:string, index:number) => {
                    return (
                    <div key={index} className="w-40 mb-4 h-16 m-5 flex items-center px-5 justify-center flex-col border border-opacity-100 text-base font-medium rounded-md bg-white shadow-md  md:text-lg">
                        <p>{element}</p>
                        <button onClick={() => handleRemoveChoice(index)} className="border">delete</button>
                    </div>
                    )
                })}
            </div>
            
             {error && <div>{error}</div>}
            <button className="border" onClick={() => toNextPage()}>Next</button>
        </>
    )
}

export default ChoicesInput