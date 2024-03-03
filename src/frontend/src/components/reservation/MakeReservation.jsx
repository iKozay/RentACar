import React from "react";
import { Stepper } from "./Stepper.jsx";
import { StepperController } from "./StepperController.jsx";
import { CustomerInformationForm } from "./CustomerInformationForm.jsx";
import { CarSelection } from "./CarSelection.jsx";
import { Payment } from "./Payment.jsx";
import { Confirmation } from "./Confirmation.jsx";

export default function MakeReservation() {
    // stateless data
    const numOfSteps = 4;
    const rsvSteps = [
        {name: 'Customer Information', component: <CustomerInformationForm/>},
        {name: 'Car Selection', component: <CarSelection/>},
        {name: 'Deposit', component: <Payment/>},
        {name: 'Confirmation', component: <Confirmation/>}
    ];

    // stateful data
    const [currentStep, setStep] = React.useState(0);
    const nextStep = () => {
        if(currentStep < numOfSteps-1) {
            setStep(currentStep + 1);
        }
    }
    const prevStep = () => {
        if(currentStep > 0) {
            setStep(currentStep - 1);
        }
    }

    return (
        <div>
            <Stepper currentStep={currentStep} numberOfSteps={numOfSteps} steps={rsvSteps}/>
            {rsvSteps[currentStep].component}
            <StepperController prevStep={prevStep} nextStep={nextStep} firstStep={currentStep===0} lastStep={currentStep === numOfSteps-1}/>
        </div>
    );
};
