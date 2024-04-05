import { createContext, useCallback, useEffect, useRef, useState } from "react"
import StepFormsContainer from "./Components/StepFormsContainer"
import { multiModalType } from "@/types/FormTypes"
import StepFormMenuButton from "./Components/StepFormMenuButton"

export const CurrentFormRef = createContext<React.MutableRefObject<HTMLFormElement | undefined> | null>(null)

const MultiStepForm = ({ Forms, continueState, goToForm, disableControls, setGoToForm }: 
                       { Forms: multiModalType, continueState: [boolean, (x: boolean) => void], goToForm?: number,
                         setGoToForm: (x: number | undefined) => void, disableControls: boolean }) => {
    const [ canContinue, setContinue ] = continueState
    const [ currentForm, setCurrentForm ] = useState(1)
    const [ previous, setPrevious ] = useState(1)
    const [ goToFormTemp, setGTFTemp ] = useState(false)
    const currentFormRef = useRef<HTMLFormElement>()

    const footerButtosHandler = useCallback((e: React.MouseEvent<HTMLParagraphElement | HTMLButtonElement, MouseEvent>, value: number) => {
        e.currentTarget.blur()

        if(currentForm === previous)
            if(value < 0 && currentForm + value >= 1)
                setCurrentForm(prev => prev + value)
            else if(value > 0 && !canContinue)
                currentFormRef.current?.requestSubmit()
            
    }, [canContinue, currentForm, previous])

    function setTempGTF(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.currentTarget.blur()
        setGTFTemp(true)
    }

    useEffect(() => {
        if(canContinue && previous === currentForm && currentForm + 1 <= Forms.length){
            setContinue(false)
            setCurrentForm(prev => prev + 1)
        }
    }, [Forms.length, canContinue, currentForm, previous, setContinue])

    return(
        <main className='h-full w-full min-w-375 flex flex-col lg:flex-row lg:p-4 lg:bg-white lg:max-w-5xl lg:max-h-[660px]
                         lg:rounded-2xl font-ubuntu sm-lg:overflow-hidden shadow-2xl'>
            <section className='w-full h-40 max-h-40 p-4 lg:p-8 lg:h-full lg:max-w-[30%] lg:max-h-full lg:rounded-inherit
                                [background-position-y:max(504px,calc(136vw+57%))] lg:[background-position-y:initial]
                                bg-multiStep-bg-mobile lg:bg-multiStep-bg-desktop bg-cover font-medium'>
                <div className='m-auto w-dynamic-w-mobile h-[42%] lg:h-auto lg:w-full lg:py-4'>
                    <nav className='h-full'>
                        <ul className='sm-lg:flex sm-lg:items-center sm-lg:flex-row sm-lg:h-full sm-lg:justify-center'>
                            { 
                                Forms.map(({ formLabel }, index) => 
                                    <StepFormMenuButton key={formLabel} number={index+1} curretNumber={goToForm || currentForm} title={formLabel.toUpperCase()} />
                                )
                            }
                        </ul>
                    </nav>
                </div>
                
            </section>
            <section className='flex flex-col justify-between *bg-green-500 grow lg:pl-4 lg:overflow-hidden'>
                <section className='grow p-4 relative'>
                    <div className='h-full sm-lg:w-dynamic-w-mobile relative m-auto sm-lg:max-w-lg'>
                        <div className='w-full sm-lg:h-[calc(100%+5.5rem)] lg:h-full mx-auto absolute sm-lg:mt-[-5.5rem]'>
                            <CurrentFormRef.Provider value={currentFormRef}>
                                <StepFormsContainer forms={Forms} currentNumber={currentForm} previousHook={[previous, setPrevious]} 
                                        setGoToForm={setGoToForm} goToForm={goToForm} gtfTemp={goToFormTemp} setGtfTemp={setGTFTemp}/>
                            </CurrentFormRef.Provider>
                        </div>
                    </div>
                </section>
                {
                !disableControls &&
                <footer className='bg-white h-20 p-4'>
                    <div className='flex flex-row justify-between h-full w-full lg:w-dynamic-w-mobile 
                                    lg:mx-auto lg:float-none lg:max-w-lg select-none'>
                        <div className='flex items-center h-full'>
                            {
                                currentForm !== 1 && !goToForm
                                &&
                                <p tabIndex={0} 
                                    className='cursor-pointer outline-none text-marine-blue hover:text-dark-blue
                                               focus:scale-105 focus:text-marine-blue hover:underline focus:underline'
                                    onClick={e => footerButtosHandler(e, -1) }>
                                    Go back
                                </p>
                            }
                        </div>
                        <button className={`w-32 rounded-lg text-white h-full font-ubuntu outline-none focus:scale-105 
                                           disabled:scale-100 disabled:bg-gray-300 disabled:hover:bg-gray-300
                                           ${ currentForm === Forms.length ? 
                                              'bg-purplish-blue hover:opacity-60 focus:opacity-60 active:opacity-100' : 
                                              'bg-marine-blue hover:bg-dark-blue focus:bg-dark-blue' }`}
                            disabled={canContinue === true || currentForm !== previous}
                                onClick={e => goToForm ? setTempGTF(e) : footerButtosHandler(e, 1) }>
                            { goToForm ? 'Confirm change' : currentForm === Forms.length ? 'Confirm' : 'Next Step' }
                        </button>
                    </div>
                </footer>
                }
            </section>
        </main>
    )
}

export default MultiStepForm