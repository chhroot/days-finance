import { yearWithDiscond } from "@/app/multi-step-form/page"
import { multiStepFormDataType } from "@/types/FormTypes"
import Image from "next/image"
import { FormEvent } from "react"
import thanksIcon from '../../../../public/icon-thank-you.svg'


const FinishingUp = ({ data, setGoToForm, controlState }: { data: multiStepFormDataType, setGoToForm: (form: number) => void,
                       controlState: [boolean, (x: boolean) => void]}) => {
    const { planDuration, plan } = data.selectedPlan
    const total = plan.price + data.addsOn.reduce((prev, { price }) => prev + price, 0)

    function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        controlState[1](true)
    }

    return(
        !controlState[0] ?
        <div className='flex flex-col'>
            <div className='mb-4 lg:mb-8'>
                <h2 className='font-semibold text-marine-blue text-[2rem] leading-8 mb-3 sm-lg:text-2xl'>
                    Finishing up
                </h2>
                <p className='text-cool-gray sm-lg:text-base'>
                    Double-check everything looks OK before confirming.
                </p>
            </div>
            <div>
                <div className='bg-alabaster p-4 rounded-lg'>
                    <div className={`flex flex-row text-base font-normal text-cool-gray text-left justify-between items-center
                                    ${data.addsOn.length > 0 ? 'mb-3' : ''}`}>
                        <div>
                            <p className='font-semibold text-marine-blue text-sm lg:text-[1.05rem] lg:mb-1 capitalize'>{ plan.name } ({ planDuration })</p>  
                            <p className='text-sm lg:text-base font-normal decoration-[1.5px] underline cursor-pointer w-fit
                                         hover:text-purplish-blue focus:text-purplish-blue hover:font-medium focus:font-medium outline-none'
                                         onClick={e => {e.currentTarget.blur();setGoToForm(2)}}
                                         tabIndex={0}>
                                            Change
                            </p>  
                        </div>
                        <p className='text-sm lg:text-base font-semibold text-marine-blue'>
                            ${ planDuration === 'yearly' ? plan.price*yearWithDiscond : plan.price }/{ planDuration === 'yearly' ? 'yr' : 'mo' }
                        </p>  
                    </div>
                    {
                    data.addsOn.length > 0 &&
                    <div className='border-solid border-t-[1px] text-base font-normal text-cool-gray '>
                        {
                            data.addsOn.map(({ name, price }) => 
                                <div className='flex flex-row justify-between text-cool-gray my-3 lg:my-4 last-of-type:mb-2' 
                                     key={name+' summary'}>
                                    <p className='text-sm lg:text-base font-normal'>
                                        { name }
                                    </p>
                                    <p className='text-sm font-medium text-marine-blue'>
                                        +${ planDuration === 'yearly' ? price*yearWithDiscond : price }/{ planDuration === 'yearly' ? 'yr' : 'mo' }
                                    </p>
                                </div>
                            )
                        }
                        <p className='text-sm lg:text-base font-normal decoration-[1.5px] underline cursor-pointer w-fit
                                         hover:text-purplish-blue focus:text-purplish-blue hover:font-medium focus:font-medium outline-none'
                                         onClick={e => {e.currentTarget.blur();setGoToForm(3)}}
                                         tabIndex={0}>
                                            Change
                        </p>  
                    </div>
                    }
                </div>

                <div className='mx-4 flex flex-row justify-between text-cool-gray my-6 lg:my-7 mb-1'>
                    <p className='text-sm lg:text-base font-normal'>
                        Total { planDuration === 'yearly' ? '(per year)' : '(per month)' }
                    </p>
                    <p className='text-base lg:text-xl font-semibold text-purple'>
                        ${ planDuration === 'yearly' ? total*yearWithDiscond : total }/{ planDuration === 'yearly' ? 'yr' : 'mo' }    
                    </p>
                </div>
                <form onSubmit={onSubmit}></form>
            </div>
        </div>
        :
        <div className='flex flex-col items-center justify-center h-[22rem] lg:h-[28rem] text-center text-cool-gray'>
            <div className='flex flex-col items-center m-3'>
                <Image alt="thanks-icon" src={thanksIcon} width={55} height={55} className='m-4 lg:m-6 mt-0 h-auto lg:w-16' />
                <h2 className='text-marine-blue text-2xl font-semibold lg:text-3xl'>
                    Thank you!
                </h2>
            </div>
            <p className='text-base lg:max-w-md lg:font-medium'>
                Thanks for confirming your subscription! We hope you have fun 
                using our platform. If you ever need support, please feel free 
                to email us at support@loremgaming.com.
            </p>
        </div>
    )
}

export default FinishingUp