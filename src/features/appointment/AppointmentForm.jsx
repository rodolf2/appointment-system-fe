import { useState } from "react";
import { useSearchParams } from "react-router";
import DataPrivacy from "../../components/appointmentForm/DataPrivacy";
import Attachment from "../../components/appointmentForm/Attachment";
import AppInfo from "../../components/appointmentForm/AppInfo";
import AppSchedule from "../../components/appointmentForm/AppSchedule";
import ReturnHome from "../../components/appointmentForm/ReturnHome";
import Feedback from "@/components/appointmentForm/Feedback";
import SelectDocuments from "@/components/appointmentForm/SelectDocuments";

const AppointmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(() => {
    const stepFromParams = searchParams.get("step");
    return stepFromParams ? parseInt(stepFromParams, 10) : 1;
  });

  const goToNextStep = (step) => {
    setCurrentStep(step); // Set the step directly
    setSearchParams({ step }); // Update the URL with the new step
  };

  const goToPreviousStep = (step) => {
    setCurrentStep(step); // Set the step directly
    setSearchParams({ step }); // Update the URL with the new step
  };

  return (
    <>
      {currentStep === 1 && <DataPrivacy onNext={() => goToNextStep(2)} />}
      {currentStep === 2 && (
        <AppInfo
          onNext={() => goToNextStep(3)}
          onBack={() => goToPreviousStep(1)}
          currentStep={1}
        />
      )}
      {currentStep === 3 && (
        <SelectDocuments
          onNext={goToNextStep}
          onBack={() => goToPreviousStep(2)}
          currentStep={2}
        />
      )}
      {currentStep === 4 && (
        <Attachment
          onNext={() => goToNextStep(5)}
          onBack={() => goToPreviousStep(3)}
          currentStep={3}
        />
      )}
      {currentStep === 5 && (
        <AppSchedule
          onNext={() => goToNextStep(6)}
          onBack={() => goToPreviousStep(3)}
          currentStep={4}
        />
      )}
      {currentStep === 6 && (
        <Feedback
          onNext={() => goToNextStep(7)}
          onBack={() => goToPreviousStep(5)}
        />
      )}
      {currentStep === 7 && (
        <ReturnHome
          onNext={() => goToNextStep(8)}
          onBack={() => goToPreviousStep(6)}
        />
      )}
    </>
  );
};

export default AppointmentForm;
