import { FormAddOnCheckbox } from "@/components/FormComponents/Components/FormInput"
import { addOnType, addsOnCheckboxValuesType, addsOnType, multiStepFormDataType } from "@/types/FormTypes"
import { FormEvent, useMemo } from "react"

//Simulate that this data is getted from a Backed, getting the current plans available and the current price
const fetchedAddsOnData: addsOnCheckboxValuesType[] = [
    {
        name: 'Online service',
        description: 'Access to multiplayer games',
        price: 1,
    },
    {
        name: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: 2,
    },
    {
        name: 'Customizable Profile',
        description: 'Custom theme on your profile',
        price: 2,
    },
]

const AddsOnForm = ({ data, duration, saveData, setContinue }: { data: addsOnType, duration: string, saveData: React.Dispatch<React.SetStateAction<multiStepFormDataType>>,
                                   setContinue: (x: boolean) => void }) => {
    const addsOn = data

    const addsOnCheckboxes = useMemo(() => fetchedAddsOnData.map(({ name, description, price}) =>{
        const durationTxt = duration === 'yearly' ? 'yr' : 'mo'
        const selected = addsOn.some(addOn => addOn.name === name)

        function includeAddOn(addOn: addOnType){
            //If the addOn already exists in the list, it gets removed 
            const temp = addsOn.filter(aO => aO.name !== addOn.name)
    
            //If the new Addon wasn't in the list, then is a new one, so we add it inside
            if(temp.length === addsOn.length)
                temp.push(addOn)
    
            saveData(prev => ({
                ...prev, 
                addsOn: temp
            }))
        } 

        return <FormAddOnCheckbox key={name} name={name} selected={selected} includeAddOn={includeAddOn}
                                 description={description} price={price} duration={durationTxt}/>
    }), [addsOn, duration, saveData])

    function checkValidValues(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        setContinue(true)
    } 

    return(
        <div className='flex flex-col'>
            <div className='mb-4 lg:mb-8'>
                <h2 className='font-semibold text-marine-blue text-[2rem] leading-8 mb-3 sm-lg:text-2xl'>
                    Pick add-ons
                </h2>
                <p className='text-cool-gray sm-lg:text-base'>
                    Add-ons help enhance your gaming experience.
                </p>
            </div>
            <form onSubmit={checkValidValues} noValidate>
                <fieldset className='my-2'>
                    {
                        addsOnCheckboxes
                    }
                </fieldset>
            </form>
        </div>
    )
}

export default AddsOnForm