import { multiModalType } from "@/types/FormTypes"
import { useContext, useEffect, useMemo, useRef } from "react"
import { CurrentFormRef } from "../MultiStepForm"

const FromWrapper = ({ form, me, currentForm, goToForm, posOffset }: { form: JSX.Element, me: number, currentForm: number, 
                                                                       goToForm?: number,  posOffset: number }) => {
    const formRef = useRef<HTMLDivElement>(null)
    const ref = useContext(CurrentFormRef)

    useEffect(() => {
        if(formRef.current)
            if(me !== currentForm && me !== goToForm)
                formRef.current.querySelectorAll('form *').forEach(e => e.setAttribute('tabindex', '-1'))
            else{
                formRef.current.querySelectorAll('form *').forEach(e => {
                    if(e.classList.contains('tabable'))
                        e.setAttribute('tabindex', '0')
                    else if(e.classList.contains('no-tabable')) 
                        e.setAttribute('tabindex', '-1')
                    else
                        e.removeAttribute('tabindex')
                })
                const formRefValue = formRef.current.querySelector('form')
                
                if(formRefValue && ref)
                    ref.current = formRefValue
            }
    }, [formRef, me, currentForm, ref, goToForm])

    return(
        <article className='bg-white w-full lg:mt-0 lg:max-w-full border-solid sm-lg:border-[1.5rem] lg:border-t-[2rem] border-white
                            sm-lg:shadow-lg left-0 sm-lg:rounded-xl max-h-full h-auto absolute right-0 overflow-y-auto overflow-x-hidden'
                 style={{left: posOffset+'%' }}
                 ref={formRef}>
            <div className={`lg:max-w-lg lg:m-auto
                             ${me !== currentForm && me !== goToForm ? 'opacity-60 pointer-events-none' : ''}`}>
                { form }
            </div>
        </article>
    )
}

function mapForms(forms: multiModalType, previous: number, currentNumber: number, goToForm: number | undefined){
    const mappedForms = 
        forms.map(({ form }, index) => {
            if(goToForm){
                
                const me = index+1
                const direction = currentNumber - goToForm

                if(direction >= 1){
                    if(me >= currentNumber-direction && me <= currentNumber){
                        const offset = currentNumber - me
                        return <FromWrapper key={'form-component-'+me}
                            form={form} me={me} posOffset={-120*offset} 
                            currentForm={currentNumber} goToForm={goToForm}/>
                    }
                }else{
                    if(me >= currentNumber && me <= currentNumber+(direction*-1)){
                        const offset = Math.abs(currentNumber - me)
                        return <FromWrapper key={'form-component-'+me}
                            form={form} me={me} posOffset={120*offset} 
                            currentForm={currentNumber} goToForm={goToForm}/>
                    }
                }

            }else{
                const leftPrev = previous-1
                const rightPrev = previous+1
                const me = index+1

                if(currentNumber === me && previous === me)
                    return <FromWrapper key={'form-component-'+me}
                                            form={form} me={me} posOffset={0} 
                                            currentForm={currentNumber}/>
                else
                    if(me === leftPrev  || me === previous || me === rightPrev){
                        const offset = me === leftPrev ? -120 : me === rightPrev ? 120 : 0
                        return <FromWrapper key={'form-component-'+me}
                                            form={form} me={me} posOffset={offset} 
                                            currentForm={currentNumber}/>
                    }
            }
        })
    
    return mappedForms
}

const StepFormsContainer = ({ forms, currentNumber, previousHook, goToForm, setGoToForm, gtfTemp, setGtfTemp }: 
                            { forms: multiModalType, currentNumber: number, previousHook: [ number, (x: number) => void], 
                              goToForm: number | undefined, setGoToForm: (x: number | undefined) => void, gtfTemp: boolean, setGtfTemp: (x: boolean) => void}) => {
    const [ previous, setPrevious ] = previousHook
    const formsRendered = useMemo(() => mapForms(forms, previous, currentNumber, goToForm), 
                                        [forms, previous, currentNumber, goToForm])

    const formDiffNumber = goToForm ? currentNumber - goToForm : 1

    function disableGoToForm(){
        setGoToForm(undefined);
        setGtfTemp(false)
    }

    return(
        <div className={`h-full w-full absolute transition-all left-0 
                         ${currentNumber === previous && goToForm === undefined ? 'duration-0' : 'duration-500 ' }`}
             style={ currentNumber!==previous || (goToForm !== undefined && !gtfTemp) ? (currentNumber > previous ? { left: -120*formDiffNumber+'%' } : { left: 120*formDiffNumber+'%' }) : {left: 0} }
             onTransitionEnd={() => gtfTemp ? disableGoToForm() : currentNumber !== previous && setPrevious(currentNumber)}>
        {  
            formsRendered
        }
        </div>
    )
}

export default StepFormsContainer