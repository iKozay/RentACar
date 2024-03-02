import React from "react";

export default function StepperController({ prevStep, nextStep, firstStep, lastStep }) {
    // change name of button to submit if last step
    const prevButtonText = firstStep ? 'Cancel' : 'Back';
    const nextButtonText = lastStep ? 'Submit' : 'Next';
    return  (
        <div className="flex justify-between  m-10">
            <button className="bg-blue-500 text-white p-2 rounded-lg w-20" onClick={prevStep}>{prevButtonText}</button>
            <button className="bg-blue-500 text-white p-2 rounded-lg w-20" onClick={nextStep}>{nextButtonText}</button>
        </div>
    );
}