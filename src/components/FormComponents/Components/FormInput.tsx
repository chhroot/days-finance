import { addOnType, countryDataType, phoneType } from '@/types/FormTypes'
import Image from 'next/image'
import countryJson from '@/app/multi-step-form/countryPhone.json'
import { ChangeEvent, useEffect, useState } from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import checkmarkIcon from '../../../../public/icon-checkmark.svg'
import { yearWithDiscond } from '@/app/multi-step-form/page'

const FormInput = ({ value, name, type, invalidInputMessage, onChange, label, placeholder, required}: 
                   { value: string | phoneType, name: string, type: string, label: string, invalidInputMessage?: string,
                    onChange: (e: ChangeEvent<HTMLInputElement> | countryDataType) => void, placeholder?: string, required?: boolean}) => {
 
    function renderInputByType(value: string | phoneType, type: string, required: boolean){

        if(typeof value !== 'string' && 'number' in value )
            return <FormPhoneInput onChange={onChange} value={value} name={name} 
                                   placeholder={placeholder} required={required}
                                   valid={invalidInputMessage === undefined ? [true, true] : 
                                          invalidInputMessage.toLocaleLowerCase().includes('code') ? [false, true] : [true, false]} />
        else
            switch(type){
                case 'email': return <FormEmailInput onChange={onChange} value={value} name={name}
                                                     placeholder={placeholder} required={required} 
                                                     valid={invalidInputMessage === undefined} />
                default: return <FormTextInput onChange={onChange} value={value} name={name}
                                               placeholder={placeholder} required={required} 
                                               valid={invalidInputMessage === undefined}/>
            }
    }

    return(
        <div className='flex flex-col my-4 lg:my-6 text-dark-blue'>
            <label className='lg:mb-2 sm-lg:text-sm text-marine-blue flex justify-between'>
                <span className='capitalize font-medium'>{ label }</span>
                <span className='font-semibold text-strawberry-red'>
                    { invalidInputMessage }
                </span>
            </label>
            {
                renderInputByType(value, type, required || false)
            }
        </div>
    )
}

const FormTextInput = ({ value, name, onChange, placeholder, required, valid }: { value: string, name: string, 
                        onChange: (e: ChangeEvent<HTMLInputElement>) => void, valid: boolean, placeholder?: string, required?: boolean }) => {
    return(
        <input className={`border-2 border-light-gray rounded-lg text-lg font-medium h-[50px] px-4 bg-white outline-none
                          text-[1.1rem] sm-lg:h-11 sm-lg:text-base text-dark-blue 
                          ${valid ? 'hover:border-purplish-blue focus:border-purplish-blue' : 'border-strawberry-red'}`} 
               type='text' 
               name={name} 
               value={value}
               onChange={onChange}
               required={required}
               placeholder={placeholder} />
    )
}

const FormEmailInput = ({ value, name, onChange, placeholder, required, valid }: { value: string, name: string, 
                        onChange: (e: ChangeEvent<HTMLInputElement>) => void, valid: boolean, placeholder?: string, required?: boolean }) => {
    return(
        <input className={`border-2 border-light-gray rounded-lg text-lg font-medium h-[50px] px-4 bg-white outline-none
                          text-[1.1rem] sm-lg:h-11 sm-lg:text-base text-dark-blue
                          ${valid ? 'hover:border-purplish-blue focus:border-purplish-blue' : 'border-strawberry-red'}`} 
               type='email' 
               name={name} 
               value={value}
               onChange={onChange}
               required={required}
               placeholder={placeholder} />
    )
}

function formatPhoneSpacing(number: string){
    return Array.from(number).map((letter, index) => {
        if(number.length === 12)
            return index === 3 || index === 6 || index === 9 ? ' '+letter : letter
        else
            return index === 3 || index === 6 ? ' '+letter : letter
    }
    ).join('')
}

const FormPhoneInput = ({ value, name, onChange, placeholder, required, valid }: { value: phoneType, name: string, 
                          onChange: (e: ChangeEvent<HTMLInputElement> | countryDataType) => void, valid: boolean[], placeholder?: string, required?: boolean }) => {
    const [ selectedCountry, setCountry ] = useState<countryDataType>()
    const [ autoSearch, setAutoSearch ] = useState(value.countryData.name)
    const [ modalEnabled, setModalState] = useState(false)

    useEffect(() => {
        if (selectedCountry && selectedCountry.name !== value.countryData.name) {
            const countryData: countryDataType = {
                name: selectedCountry.name,
                shortName: selectedCountry.shortName,
                phoneCode: selectedCountry.phoneCode
            }
            onChange(countryData)
        }

    }, [onChange, selectedCountry, selectedCountry?.name, value.countryData.name])

    return(
        <div className='flex h-[50px] sm-lg:h-11 text-dark-blue'>
            <div tabIndex={0} className={`tabable outline-none w-auto h-full rounded-l-lg border-2 border-light-gray z-10 cursor-pointer hover:border-2 
                                         ${valid[0] ? 'hover:border-purplish-blue focus:border-purplish-blue' : 'border-strawberry-red'}`}
                            onClick={() => setModalState(true)}
                            onKeyDown={e => e.key === 'Enter' && setModalState(true)}>
                <div className={`flex items-center transition-opacity duration-1000 w-24
                                justify-center h-full relative`}>
                    <p className='text-base mr-1 font-medium text-dark-blue'>{ selectedCountry?.phoneCode }</p>
                    {
                           selectedCountry?.flag 
                           || 
                           <span className={`text-xs text-gray-400 font-medium text-center`}>Select Country Code</span>
                    }
                    <input className='no-tabable pointer-events-none w-full max-w-full absolute z-[-1] rounded-l-lg max-h-[99.5%] text-[0]'
                            onChange={e => setAutoSearch(e.target.value)}
                            tabIndex={-1}
                            name='country' type='text' />
                </div>
            </div>
            <input className={`border-2 w-full border-light-gray border-l-0 rounded-r-lg text-lg font-medium h-full px-4 bg-white outline-none
                              text-[1.1rem] sm-lg:text-base text-dark-blue hover:border-l-2 focus:border-l-2 hover:ml-[-2px] focus:ml-[-2px] hover:z-10 focus:z-10
                              ${valid[1] ? 'hover:border-purplish-blue focus:border-purplish-blue' : 'border-l-2 border-strawberry-red'}`} 
                   type='text' 
                   name={name} 
                   value={formatPhoneSpacing(value.number)}
                   onChange={onChange}
                   placeholder={placeholder}
                   required={required} />
            <CountryList enable={modalEnabled} setEnable={setModalState} changeHandler={setCountry} autoSearch={autoSearch}/>
        </div>
    )
}

const CountryList = ({ enable, setEnable, changeHandler, autoSearch }: { enable?: boolean, setEnable: (x: boolean) => void,
                                                             changeHandler: (x: countryDataType) => void, autoSearch: string }) => {
    const [ countries, setCountries ] = useState<(countryDataType | undefined)[]>()
    const [ filteredCountries, setFilteredCountries ] = useState<(countryDataType | undefined)[]>()
    const countriesJson: { [key: string]: string } = countryJson
    const [filter, setFilter] = useState('')

    useEffect(() => {
        (async()=> {
            const result = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('API Response: ' + result.status)
            const json: { [key:string]: any }[] = await result.json()
            const sorted = json.sort((c1, c2) => c1.name.common.toLowerCase().localeCompare(c2.name.common.toLowerCase()))

            setCountries( json.map(country => {
               if(!countriesJson[country.cca2])
                    return undefined
               return { 
                    name: country.name.common.toLowerCase(),
                    shortName: country.cca2, 
                    phoneCode: countriesJson[country.cca2],
                    flag: <Image alt={country.cca2 + ' Flag'} 
                        src={country.flags.png} 
                        width={30} 
                        height={20} 
                        className='w-[30px] h-[20px] inline-block' 
                        unoptimized />
                }
            }) )
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(autoSearch && countries){
            const match = countries.find(country => country?.name.toLowerCase() === autoSearch.toLocaleLowerCase())
            if(match)
                changeHandler(match)
        }
    }, [autoSearch, changeHandler, countries])

    useEffect(()=>{
        const fltCountries = countries?.filter(country => {
            if(!country)
                return false
            if(country?.name.startsWith(filter.toLocaleLowerCase()))
                return true
            if(country.phoneCode.startsWith(filter))
                return true
            if(country.shortName.startsWith(filter.toLocaleUpperCase()))
                return true
        })

        setFilteredCountries(fltCountries)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, countries])

    function handleChange(data: countryDataType | undefined){
        if(data){
            changeHandler(data)
            setEnable(false)
        }
    }

    return(
    <div className={`transition-opacity duration-200 fixed bg-[rgba(0,0,0,0.25)] w-full h-full left-0 top-0 z-20 flex items-center justify-center
                    ${ enable ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    id='countries-modal'
                    onClick={(e: any) => e.target.id === 'countries-modal' && setEnable(false)}>
        <section id='country-list-container' 
                 className='flex flex-col w-[clamp(calc(375px-2rem),33%,400px)] h-4/5 bg-white p-6 rounded-lg
                            lg:px-8'>
            <article className='flex flex-col'>
                <div className='flex justify-between mb-2 font-medium items-end text-marine-blue mt-3'>
                    <h1 className='text-2xl'>
                        Country Code
                    </h1>
                    <p className='text-[0.85rem] h-fit text-[#a1a1a1]'>
                        Filter By
                    </p>
                </div>
                <input name='country'
                       onFocus={e => e.target.select()}
                       className='border-2 w-full border-light-gray rounded-lg text-base font-medium h-12 px-4 bg-white outline-none
                                  sm-lg:h-11 text-center text-dark-blue hover:border-purplish-blue focus:border-purplish-blue' 
                       placeholder='Name, short name or country code'
                       onChange={e => setFilter(e.target.value)} />
            </article>
            <article className='grow bg-gray-50 overflow-hidden mt-8'>
                <ul className='overflow-y-auto h-full border-2'>
                    {
                        countries 
                        && 
                        filteredCountries?.map(country => 
                            <li className='flex flex-row justify-between py-2 px-4 max-h-11 font-medium text-dark-blue
                                           select-none odd:bg-magnolia hover:bg-blue-300 cursor-pointer'
                                key={`${country?.shortName} ${country?.phoneCode}`}
                                onClick={() => handleChange(country)}>
                                <p className={`text-base capitalize
                                              ${country!.name.length > 19 ? 'text-base leading-4 mt-[-2px]' : ''}`}>
                                    { country?.name }
                                </p>
                                <div className='h-full w-[48%] mt-[2px] flex items-center justify-end relative'>
                                    <p className={`text-base flex flex-col justify-end mr-[4px]
                                                   ${ country!.phoneCode.split(' ').length > 1 ?
                                                    'absolute [&>span]:h-4 top-[-8px] right-[33px]' :''} 
                                                   ${ country!.phoneCode.length > 5 ? 'text-sm' : ''}
                                                    `}>
                                        {
                                            country?.phoneCode.split(' ').map(code => 
                                                <span key={country.shortName +' '+ code} className='text-right'>{code}</span>
                                            )
                                        }
                                    </p>
                                    { country?.flag }
                                </div>
                            </li>
                        )
                    }
                </ul>
            </article>
        </section>
    </div>
    )
}

export const FormPlanPeriodCheckbox = ({ duration, handleChange, errorMessage }: { duration: string, handleChange: (duration: string) => void, errorMessage: string | undefined}) => {

    function checkToggle(e: React.MouseEvent<HTMLInputElement>){
        e.stopPropagation()
        if(duration){
            handleChange('toggle')
        }
    }

    return(
        <>
        <div className={`flex py-3 justify-center min-w-full text-cool-gray [&>span]:text-base [&>span]:mx-3 [&>span]:px-3 [&>span]:cursor-pointer
                        leading-8 [&>span]:font-medium bg-alabaster rounded-lg select-none h-auto
                        ${ errorMessage ? 'border-2 border-solid border-strawberry-red' : ''}`}>
            <span className={`${duration === 'monthly' ? 'text-dark-blue': 'hover:text-dark-blue'}`}
                onClick={() => duration !== 'monthly' && handleChange('monthly')}>
                Monthly
            </span>

            <label className='relative inline-flex items-center cursor-pointer' tabIndex={0}>
                <input type='checkbox' value='' className='sr-only peer relative' tabIndex={-1} onClick={checkToggle} readOnly />
                <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer 
                               after:content-[''] after:absolute after:top-[4.5px] after:left-[6px]
                               after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all dark:border-gray-600
                                ${ !duration ? ' after:translate-x-1/2 bg-gray-400 cursor-not-allowed ' : 
                                    duration === 'yearly' ? 'after:translate-x-full bg-marine-blue' : 'bg-marine-blue' 
                                }`}>
                </div>
            </label>

            <span className={`${duration === 'yearly' ? 'text-dark-blue': 'hover:text-dark-blue'}`}
                onClick={() => duration !== 'yearly' && handleChange('yearly')}>
                Yearly
            </span>
        </div>
        { errorMessage && <p className='text-right text-base lg:text-lg font-medium text-strawberry-red mt-1 mr-1'>{ errorMessage }</p> }
        </>
    )
}

export const FormPlanCheckbox = ({ name, urlImage, price, duration, selected, setPlan }: { name: string, urlImage: string | StaticImport,
                                  duration: string, price: number, selected: boolean, setPlan: (planName: string, price: number) => void  }) => {
    return(
    <label className='h-20 grow mb-3 last:mb-0 relative lg:mr-4 lg:w-[33%] lg:h-44'>
        <input type='checkbox' className='absolute top-0 w-full h-full opacity-0 peer cursor-pointer'
               onClick={() => setPlan(name, price)} checked={selected} readOnly />
        <div className='bg-white h-full p-4 border-2 border-light-gray rounded-lg flex flex-row lg:flex-col lg:items-start lg:justify-between lg:pt-5
                        peer-hover:border-purplish-blue peer-hover:border-2 peer-hover:border-solid peer-checked:bg-alabaster peer-checked:border-purplish-blue'>
            <Image src={urlImage} alt={name+'-icon'} className='h-full w-auto lg:h-auto' height={42} width={42} priority/>
            <p className='flex flex-col sm-lg:ml-4 text-base font-normal text-cool-gray'>
                <span className='font-semibold text-marine-blue text-[1.05rem] leading-5'>{ name }</span>  
                <span>${ duration === 'yr' ? price*yearWithDiscond : price } / { duration }</span>  
            </p>
        </div>
    </label>
    )

}

export const FormAddOnCheckbox = ({ name, description, price, duration, selected, includeAddOn }: { name: string, description: string,
                                  duration: string, price: number, selected: boolean, includeAddOn: (addOn: addOnType) => void  }) => {
    return(
    <label className='block min-h-16 mb-3 last:mb-0 relative lg:h-20'>
        <input type='checkbox' className='absolute top-0 w-full h-full opacity-0 peer cursor-pointer'
               onClick={() => includeAddOn({ name, price })} checked={selected} readOnly />
        <div className='bg-white h-full p-4 py-3 lg:p-5  border-2 border-light-gray rounded-lg flex flex-row justify-between items-center
                        peer-hover:border-purplish-blue peer-hover:border-2 peer-hover:border-solid peer-checked:[&>div>:first-child]:border-0
                        peer-checked:bg-alabaster peer-checked:border-purplish-blue peer-checked:[&>div>:first-child]:bg-purplish-blue'>
            <div className='flex flex-row items-center'>
                <div className='h-6 w-6 border-solid border-2 border-light-gray flex-shrink-0 rounded-md p-1'>
                    <div className='h-full relative'>
                        { selected && <Image src={checkmarkIcon} alt='checkmark-icon' fill /> }
                    </div>
                </div>
                <div className='flex flex-col ml-4 lg:ml-5 text-base font-normal text-cool-gray text-left items-start'>
                    <p className='font-semibold text-marine-blue text-base lg:text-base'>{ name }</p>  
                    <p className='text-xs lg:text-sm font-normal'>{ description }</p>  
                </div>
            </div>
            <p className='text-sm font-medium text-purplish-blue'>${ duration === 'yr' ? price*yearWithDiscond : price }/{ duration }</p>  
        </div>
    </label>
    )

}


export default FormInput