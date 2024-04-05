
const StepFormMenuButton = ({ number, title, curretNumber }: { number: number, title: string, curretNumber: number }) => {
    return(
        <li className='text-light-blue font-medium lg:mb-8 [&>*]:text-white'>
            <div className={`inline-flex items-center lg:py-1 cursor-default`}>
                <div className={`w-9 h-9 rounded-full border-2 border-light-blue flex justify-center items-center mr-4
                                ${number === curretNumber ? 'bg-light-blue text-black' : ''}`}>
                    <p className='text-base font-bold'>{ number }</p>
                </div>
                <div className='hidden lg:block'>
                    <p className='text-[0.8rem] leading-4 font-normal text-light-blue'>
                        <span>STEP { number }</span>
                    </p>
                    <p className='text-sm font-bold tracking-widest'>{ title }</p>
                </div>
            </div>
        </li>
    )
}

export default StepFormMenuButton