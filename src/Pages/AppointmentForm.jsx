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
  const [claimingOption, setClaimingOption] = useState(null); // Track claiming option

  const goToNextStep = (selectedOption = null) => {
    if (selectedOption) {
      // If claimingOption is "self", skip Attachment step (step 4) and go to step 5
      if (selectedOption === "self" && currentStep === 3) {
        setCurrentStep(5); // Skip Attachment and directly move to step 5 (AppSchedule)
        setSearchParams({ step: 5 });
        return;
      }
    }

    // If no special case (i.e., not "self"), just move to the next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setSearchParams({ step: nextStep });
  };

  const goToPreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 1) {
      setCurrentStep(previousStep);
      setSearchParams({ step: previousStep });
    }
  };

  return (
    <>
      {currentStep === 1 && <DataPrivacy onNext={goToNextStep} />}
      {currentStep === 2 && (
        <AppInfo onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 3 && (
        <Claiming
          onNext={(selectedOption) => {
            setClaimingOption(selectedOption); // Set the selected option
            goToNextStep(selectedOption); // Proceed with the selected option
          }}
          onBack={goToPreviousStep}
        />
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
