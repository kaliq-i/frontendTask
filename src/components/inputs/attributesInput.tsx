import { useState } from "react"
import { IAttributes, IInputAttributes } from '../../helpers/interfaces'

const AttributesInput = ({ attributes, addAttribute, removeAttribute, updateDisplay }: IInputAttributes) => {
    const [error, setError] = useState<string | null>()

    const handleSubmitAttribute = (e: React.FormEvent) => {
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
        const midPoint = (parseFloat(scaleMax.value) + parseFloat(scaleMin.value)) / 2
        const newAttribute = {
            attributeName: name.value,
            scaleMin: scaleMin.value,
            scaleMax: scaleMax.value,
            value: midPoint,
            weighting: weighting.value
        }

        addAttribute(newAttribute)
        setError(null)
    }

    const handleRemoveAttribute = (index: number) => {
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
        <div className="min-h-screen flex-wrap flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            {error &&
                <div role="alert" className="max-w-md w-full mt-5 mb-5">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Error
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>{error}</p>
                    </div>
                </div>}

            <div className="max-w-sm" >
                <p className="mt-6 text-center text-2xl font-extrabold text-blue-900"> Please create some attributes for the choices that you want to compare</p>
                <form onSubmit={(event) => handleSubmitAttribute(event)}
                    className="flex flex-wrap flex-col mt-4 ">

                    <input type="text"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Attribute Name"
                        required={true} />

                    <input type="number"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Min value for the scale for this attribute "
                        min={0}
                        required={true} />

                    <input type="number"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Max value for the scale for this attribute "
                        required={true} />

                    <input type="number"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Weighting of this Attribute (0-1)"
                        min={0.00}
                        max={1.00}
                        step={0.01}
                        required={true}
                    />

                    <input type="submit"
                        className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />

                </form>
            </div>

            <div className="flex flex-row flex-wrap w-full mt-10 justify-center">
                {attributes.map(({ attributeName, scaleMin, scaleMax, weighting }: IAttributes, index: number) => {
                    return (
                        <div key={attributeName} className="w-auto mb-4 h-auto m-5 flex relative items-center p-5 justify-center flex-col border border-opacity-100 text-base font-medium rounded-md bg-white shadow-md  md:text-lg">
                            <p>Name of Attribute = {attributeName}</p>
                            <p>Scale Minimum Value = {scaleMin}</p>
                            <p>Scale Maximum Value = {scaleMax}</p>
                            <p>Weighting = {weighting}</p>
                            <button onClick={() => handleRemoveAttribute(index)} className="absolute -top-2 -right-2">
                                <i className="fas fa-times-circle text-red-500"></i>
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-between w-60">
                <button className="w-auto mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                    onClick={() => toPreviousPage()}>Previous Page
                </button>

                <button className="w-auto mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                    onClick={() => toNextPage()}>Next Page
                </button>
            </div>
        </div>

    )
}

export default AttributesInput