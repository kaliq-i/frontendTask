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
        <div className="min-h-screen flex-wrap flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            
            {error &&  <div role="alert" className="max-w-md w-full mt-5 mb-5">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Error
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>{error}</p>
                    </div>
                </div>}
            
            
            <div className="max-w-sm" >
                <p className="mt-6 text-center text-2xl font-extrabold text-blue-900"> Please create some choices that you want to compare</p>
                <form onSubmit={(event) => handleSubmitChoice(event)}
                className="flex flex-wrap flex-col mt-4 "
                >
                    <input type="text" 
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                    placeholder="Choice Name"
                    required={true}/>

                    <input type="submit"
                    className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />
                </form>
            </div>

            
            <div className="flex flex-row flex-wrap w-full mt-10">

                {choices.map((element:string, index:number) => {
                    return (
                    <div key={index} className="w-auto mb-4 h-16 m-5 flex relative items-center px-5 justify-center flex-col border border-opacity-100 text-base font-medium rounded-md bg-white shadow-md  md:text-lg">
                        <p>{element}</p>
                        <button onClick={() => handleRemoveChoice(index)} className="absolute -top-2 -right-2">
                            <i className="fas fa-times-circle text-red-500"></i>
                        </button>
                    </div>
                    )
                })}
            </div>
            
             
            <button className="w-auto mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " 
            onClick={() => toNextPage()}>Next Page </button>
        </div>
    )
}

export default ChoicesInput