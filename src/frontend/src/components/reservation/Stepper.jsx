import React from 'react';
export function Stepper ({currentStep, numberOfSteps, steps}) {
    const activeColor = (index) => currentStep >= index ? 'bg-blue-500' : 'bg-gray-300'
    const activeSection = (index) => currentStep === index ? 'font-bold text-lg' : 'font-normal text-base'
    const isFinalStep = (index) => index === numberOfSteps

    return (
        <div className="flex items-center m-10">
            {Array.from({length: numberOfSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    {isFinalStep(index) ? null : <div className={`w-full h-1 transition delay-100 duration-100 ease-linear ${activeColor(index)} `}>
                        <div className={`font-sans ${activeSection(index)} `}>{steps[index].name}</div>
                    </div>}
                </React.Fragment>
            ))}
        </div>
    )
}