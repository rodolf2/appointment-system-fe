import { useState } from "react";
import { useSearchParams } from "react-router";
import DataPrivacy from "../components/DataPrivacy";
import Attachment from "../components/Attachment";
import AppInfo from "../components/AppInfo";
import Claiming from "../components/Claiming";

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

  return (
    <>
      {currentStep === 1 && <DataPrivacy onNext={goToNextStep} />}
      {currentStep === 2 && <AppInfo onNext={goToNextStep} />}
      {currentStep === 3 && <Attachment onNext={goToNextStep} />}
      {currentStep === 4 && <Claiming onNext={goToNextStep} />}
    </>
  );
};

export default AppointmentForm;
