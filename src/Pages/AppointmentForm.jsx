import { useState } from "react";
import { useSearchParams } from "react-router";
import DataPrivacy from "../components/appointmentForm/DataPrivacy";
import Attachment from "../components/appointmentForm/Attachment";
import AppInfo from "../components/appointmentForm/AppInfo";
import AppSchedule from "../components/appointmentForm/AppSchedule";
import Claiming from "../components/Claiming";
import ReturnHome from "../components/appointmentForm/ReturnHome";
import Feedback from "@/components/appointmentForm/Feedback";

const AppointmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(() => {
    // Get the step from the URL query parameter or default to 1
    const stepFromParams = searchParams.get("step");
    return stepFromParams ? parseInt(stepFromParams, 10) : 1;
  });

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setSearchParams({ step: nextStep }); // Update the URL query parameter
  };

  const goToPreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 1) {
      setCurrentStep(previousStep);
      setSearchParams({ step: previousStep }); // Update the URL query parameter
    }
  };

  return (
    <>
      {currentStep === 1 && <DataPrivacy onNext={goToNextStep} />}
      {currentStep === 2 && (
        <AppInfo onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 3 && (
        <Claiming onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 4 && (
        <Attachment onNext={goToNextStep} onBack={goToPreviousStep} />
      )}

      {currentStep === 5 && (
        <AppSchedule onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 6 && <Feedback onNext={goToNextStep} />}
      {currentStep === 7 && (
        <ReturnHome onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
    </>
  );
};

export default AppointmentForm;
