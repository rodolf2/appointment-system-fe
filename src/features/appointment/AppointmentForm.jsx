import { useState } from "react";
import { useSearchParams } from "react-router";
import DataPrivacy from "../../components/appointmentForm/DataPrivacy";
import Attachment from "../../components/appointmentForm/Attachment";
import AppInfo from "../../components/appointmentForm/AppInfo";
import AppSchedule from "../../components/appointmentForm/AppSchedule";
import Claiming from "../../components/appointmentForm/Claiming";
import ReturnHome from "../../components/appointmentForm/ReturnHome";
import Feedback from "@/components/appointmentForm/Feedback";
import SelectDocuments from "@/components/appointmentForm/SelectDocuments";
import CustomProgressBar from "./CustomProgressBar";

const AppointmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(() => {
    const stepFromParams = searchParams.get("step");
    return stepFromParams ? parseInt(stepFromParams, 10) : 1;
  });

  const goToNextStep = (selectedOption = null) => {
    const nextStep =
      selectedOption === "self" && currentStep === 3 ? 5 : currentStep + 1;
    setCurrentStep(nextStep);
    setSearchParams({ step: nextStep });
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSearchParams({ step: currentStep - 1 });
    }
  };

  return (
    <>
      <CustomProgressBar currentStep={currentStep} />
      {currentStep === 1 && <DataPrivacy onNext={goToNextStep} />}
      {currentStep === 2 && (
        <AppInfo onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 3 && (
        <SelectDocuments
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={3}
        />
      )}
      {currentStep === 4 && (
        <Claiming onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 5 && (
        <Attachment onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 6 && (
        <AppSchedule onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 7 && <Feedback onNext={goToNextStep} />}
      {currentStep === 8 && (
        <ReturnHome onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
    </>
  );
};

export default AppointmentForm;
